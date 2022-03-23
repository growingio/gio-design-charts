import { ChartConfig, ChartType } from '../../../interfaces';
import { getTextFormatter } from '../axis';

describe('getTextFormatter', () => {
  test('call getTextFormatter function', () => {
    const config = {} as ChartConfig;
    const result = getTextFormatter(config);
    expect(result).toBeFalsy();

    config.axis = false;
    const result2 = getTextFormatter(config);
    expect(result2).toBeFalsy();

    config.axis = ['type', {}];
    const result3 = getTextFormatter(config);
    expect(result3).toBeFalsy();

    config.type = ChartType.AREA;
    config.area = { position: 'type*value' };
    const result4 = getTextFormatter(config);
    expect(result4).toBeFalsy();

    config.area = { position: 'type*value' };
    config.axis = [
      'type',
      {
        label: {
          formatter: () => {
            return 'this is format';
          },
        },
      },
    ];
    const result5 = getTextFormatter(config);
    expect(result5()).toBe('this is format');
  });
});
