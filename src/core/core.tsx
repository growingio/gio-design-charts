import React, { useCallback, useRef } from 'react';
import { InfoCardBox } from '../info-card';
import { ChartConfig, ChartOptions, Legend, Legends } from '../interfaces';
import useInterceptors from '../hooks/useInterceptors';
import useTunnel from '../hooks/useTunnel';

import { Chart, View } from '@antv/g2';
import { LooseObject } from '@antv/component';
import './styles/base.less';
import useChart from '../hooks/useChart';

export interface LayoutProps {
  options: ChartOptions;
  config?: ChartConfig;
  children: JSX.Element | JSX.Element[];
  width?: number;
  onClickLegend?: (label: string) => void;
}

export interface ChartCanvasProps {
  // type: ChartType;
  callChart: (options: ChartOptions, config: ChartConfig) => { chart?: Chart; views?: View[] };
  legendList: (string | Legend)[];
  handleLegend: <T extends ChartConfig>(charts: (Chart | View)[], legends: Legends, config: T) => void;
  config: ChartConfig;
  defaultOptions?: ChartOptions;
  data: LooseObject | LooseObject[];
  width?: number;
  isDrag?: boolean;
  heightRegister?: any;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighComponent: React.FC<LayoutProps>) => {
  return (props: ChartCanvasProps) => {
    const { config, callChart, data, legendList, handleLegend, defaultOptions = {}, width } = props;
    const root = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [register, acceptor] = useTunnel();

    const { getTriggerAction, interceptors } = useInterceptors();

    const { chartOptions, updateLegends } = useChart({
      rootRef: root,
      tooltipRef,
      callChart,
      tooltipItemRegister: register,
      config,
      data,
      legendList,
      interceptors,
      defaultOptions,
    });

    const onClickLegend = useCallback(
      (label: string) => {
        const newLegends = updateLegends(label);
        if (chartOptions?.chart) {
          handleLegend([chartOptions?.chart, ...(chartOptions?.views || [])], newLegends, config);
        }
      },
      [chartOptions, config, handleLegend, updateLegends]
    );
    return (
      <HighComponent options={chartOptions} width={width} config={config} onClickLegend={onClickLegend}>
        <div className="layout-content" ref={root} />
        <div className="gio-d-chart_tooltip-content">
          <div ref={tooltipRef} className="g2-tooltip">
            <InfoCardBox
              legends={chartOptions.legends}
              acceptor={acceptor}
              options={{ ...chartOptions }}
              trigger={getTriggerAction()}
              config={config}
            />
          </div>
        </div>
      </HighComponent>
    );
  };
};
export default core;
