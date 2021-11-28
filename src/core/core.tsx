import React, { useCallback, useRef, useState } from 'react';
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
  sizeRegister?: any;
  title?: string;
}

// In core, we only force on render chart and provide basic chart options
const core = (HighComponent: React.FC<LayoutProps>) => {
  return (props: ChartCanvasProps) => {
    const { config, callChart, data, legendList, handleLegend, defaultOptions, width, title } = props;
    const root = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const [register, acceptor] = useTunnel();

    const { getTrigger, setTrigger, interceptors } = useInterceptors();
    const [tooltipKey, setTooltipKey] = useState(1);

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
      tooltipKey,
      setTooltipKey,
      title,
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
