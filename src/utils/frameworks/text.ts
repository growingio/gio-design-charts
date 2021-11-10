import { Chart, View } from '@antv/g2';
import { cloneDeep, isObject, merge } from 'lodash';
import { ChartConfig } from '../../interfaces';
import gioTheme from '../../theme/chart';

export const donutText = (title: string, subTitle: string | number, chart: Chart | View, config: ChartConfig) => {
  const theme = config?.chart?.theme;
  let titleText = gioTheme.gio.annotation.text.title;
  let countText = gioTheme.gio.annotation.text.count;
  if (typeof theme === 'string' && theme === 'dark') {
    titleText = merge(cloneDeep(titleText), { style: { fill: '#ffffff' } });
    countText = merge(cloneDeep(countText), { style: { fill: '#ffffff' } });
  } else if (isObject(theme)) {
    titleText = merge(cloneDeep(titleText), theme?.gio?.annotation?.text?.title || {});
    countText = merge(cloneDeep(countText), theme?.gio?.annotation?.text?.count || {});
  }
  if (title) {
    chart?.annotation()?.text({
      ...titleText,
      content: title,
    });
  }
  if (subTitle || subTitle === 0) {
    chart?.annotation()?.text({
      ...countText,
      content: subTitle,
    });
  }
};

export const gaugeText = (title: string, subTitle: string | number, chart: Chart | View, config: ChartConfig) => {
  donutText(title, subTitle, chart, config);
};
