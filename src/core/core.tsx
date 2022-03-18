import React, { useCallback, useMemo, useRef, useState } from 'react';
import { InfoCardBox } from '../info-card';
import { Actions, ChartConfig, ChartOptions, Legend } from '../interfaces';
import useInterceptors from '../hooks/useInterceptors';
import useTunnel from '../hooks/useTunnel';

import { LooseObject } from '@antv/component';
import './styles/base.less';
import useChart from '../hooks/useChart';
import { LegendObject } from '../hooks/useLegends';

export interface LayoutProps {
  options: ChartOptions;
  config?: ChartConfig;
  children: JSX.Element | JSX.Element[];
  width?: number;
  onClickLegend?: (label: string) => void;
}

export interface ChartCanvasProps {
  // type: ChartType;
  // callChart?: (options: ChartOptions, config: ChartConfig) => { chart?: Chart; views?: View[] };
  legendList: (string | Legend)[];
  // handleLegend?: <T extends ChartConfig>(charts: (Chart | View)[], legends: Legends, config: T) => void;
  config: ChartConfig;
  defaultOptions?: ChartOptions;
  data: LooseObject | LooseObject[];
  width?: number;
  isDrag?: boolean;
  sizeRegister?: any;
  title?: string;
  fullHeight?: boolean;
  chart: Actions;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighComponent: React.FC<LayoutProps>) => {
  return (props: ChartCanvasProps) => {
    const { config, data, legendList, chart, defaultOptions, width, title } = props;
    const root = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [register, acceptor] = useTunnel();

    const { getTrigger, setTrigger, interceptors } = useInterceptors();
    interceptors.bindTooltip(tooltipRef);
    const [tooltipKey, setTooltipKey] = useState(1);

    const legendObject = useMemo(() => new LegendObject(config, legendList), [config, legendList]);
    const [, refresh] = useState(0);

    const { chartOptions } = useChart({
      rootRef: root,
      tooltipRef,
      chart,
      tooltipItemRegister: register,
      config,
      data,
      legendObject,
      interceptors,
      defaultOptions,
      tooltipKey,
      setTooltipKey,
      title,
    });
    const onClickLegend = useCallback(
      (label: string) => {
        const newLegends = legendObject.update(label);
        chart?.legend(newLegends);

        refresh(new Date().getTime());
      },
      [config, chart, legendObject]
    );
    console.log(legendObject);

    return (
      <HighComponent options={chartOptions} width={width} config={config} onClickLegend={onClickLegend}>
        <div className="layout-content">
          <div className="gio-d-charts_tooltip-content" key={tooltipKey} style={{ width, position: 'relative' }}>
            <div ref={tooltipRef} className="g2-tooltip">
              <InfoCardBox
                legends={chartOptions.legends}
                acceptor={acceptor}
                options={{ ...chartOptions }}
                getTrigger={getTrigger}
                setTrigger={setTrigger}
                config={config}
              />
            </div>
          </div>
          <div ref={root} />
        </div>
      </HighComponent>
    );
  };
};
export default core;
