import { Chart, Event, View } from '@antv/g2';
import { cloneDeep, get, isEmpty, merge } from 'lodash';
import { ChartConfig, ChartOptions, Legend } from '../interfaces';
import { colors, DEFAULT_RADIUS } from '../theme';
import { intervalShape } from '../column/framework';
import { BaseChart, fetchTooltip, fetchViewConfig, generateChart } from '../core/framework';
import { addLinkByElementHigh } from '../utils/tools/elementLink';
import gioTheme, { viewTheme } from '../theme/chart';
import { LooseObject } from '@antv/g-base';
import { InterceptorOptions } from '../hooks/useInterceptors';

export class Funnel extends BaseChart {
  fetchInterval = (chart: Chart | View, options: ChartOptions, config: ChartConfig) => {
    const { legendObject, defaultStyles } = options;
    return intervalShape(
      chart,
      options,
      config,
      {
        styles: {
          dodgePadding: 4,
          minColumnWidth: 40,
        },
      },
      (label: string) => {
        const legend = legendObject?.getLegend(label) || ({} as Legend);
        return {
          stroke: '#fff',
          strokeWidth: 1,
          fill: legend.color,
          radius: DEFAULT_RADIUS,
          ...defaultStyles,
        };
      }
    );
  };

  bindLinkEvent = (linkView: View, addLinkByElement: any, data?: LooseObject) => {
    const sourceData = data?.source || [];
    const elementCount = data?.elementCount ?? 0;
    const texts = data?.texts || [];
    const isGroup = data?.isGroup;
    linkView?.on('afterrender', function (event: Event) {
      if (event && !isGroup && sourceData.length !== 0) {
        const boxWidth = event.view.viewBBox.width;
        addLinkByElement(event.view as any, { texts, showLabel: (boxWidth - 60) / elementCount > 130 });
      }
    });
  };

  updateHoc = () => {
    const addLinkByElement = addLinkByElementHigh();
    return [
      addLinkByElement,
      (data: LooseObject) => {
        const sourceData = data?.source || [];
        const covertData = data?.covert || [];
        const [linkView, backgroundView] = this.views;
        backgroundView?.changeData(covertData);
        backgroundView?.render(true);

        linkView?.changeData(sourceData);
        this.bindLinkEvent(linkView, addLinkByElement, data);

        linkView?.render(true);
        this.instance?.render(true);
      },
    ];
  };

  render = (options: ChartOptions, config: ChartConfig = {}) => {
    this.options = options;
    this.config = config;

    const { id } = options;
    if (!id || isEmpty(options.data)) {
      return {};
    }
    const { interceptors, legendObject } = options;
    this.instance = generateChart(options, config);
    const [addLinkByElement, updateFunnel] = this.updateHoc();
    this.update = updateFunnel as any;
    try {
      const sourceData = (options.data as LooseObject)?.source || [];
      const covertData = (options.data as LooseObject)?.covert || [];
      const isGroup = (options.data as LooseObject)?.isGroup;

      const emptyLegends = isEmpty(legendObject?.mapping);

      // Use viewTheme to set the label of axis is white
      const backgroundView = this.instance.createView({
        theme: merge(cloneDeep(gioTheme), viewTheme),
      });
      let defaultColorForSingle = '';
      if (!isGroup) {
        defaultColorForSingle = emptyLegends ? colors[0] : (legendObject?.queue?.[0]?.color as string);
      }

      const backgroundOptions = {
        ...options,
        data: covertData,
        control: {
          hideLabel: true,
        },
        defaultStyles: {
          opacity: 0.2,
          color: `l(270) 0:#ffffff 1:${defaultColorForSingle}`,
        },
      };
      fetchViewConfig(backgroundView, backgroundOptions, { ...config });
      this.fetchInterval(backgroundView, backgroundOptions, config);
      backgroundView.interaction('element-active');
      backgroundView.render();
      this.views.push(backgroundView);

      const linkView = this.instance.createView();
      const linkOptions = {
        ...options,
        data: sourceData,
        defaultStyles: {
          color: !isGroup || emptyLegends ? defaultColorForSingle : '',
        },
      };
      this.bindLinkEvent(linkView, addLinkByElement, options.data);
      // should add view.render() for linkView, it can trigger afterrender event.
      if (isGroup) {
        linkView.interaction('element-highlight-by-color');
        linkView.interaction('element-link');
      }
      fetchViewConfig(linkView, linkOptions, config);
      this.fetchInterval(linkView, linkOptions, config);
      linkView.render();
      this.views.push(linkView);

      fetchTooltip(this.instance, config);
      this.instance.legend(false);
      this.instance.render();

      const clickVisible = get(config, 'tooltip.clickOptions.visible');
      interceptors?.bindElementEvents?.(this.instance, {
        ...get(config, 'tooltip.clickOptions'),
        visible: clickVisible === undefined ? true : clickVisible,
      } as InterceptorOptions);
    } catch (err) {
      /* istanbul ignore next */
      console.log(err);
    }
  };
}
