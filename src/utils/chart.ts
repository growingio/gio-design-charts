import { isEmpty } from 'lodash';
import { ChartConfig } from '../interfaces';

export const inValidConfig = (config: ChartConfig) => {
  return isEmpty(config) || !config?.chart || !config?.[config?.type] || !config?.[config?.type]?.position;
};
