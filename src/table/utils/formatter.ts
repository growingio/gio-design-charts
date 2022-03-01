
import { toNumber } from "lodash";
import { PRECISION } from '@antv/s2'

/**  简单处理小数精度误差，保持和Spreadsheet统一逻辑
 技术细节：@see https://juejin.im/post/5ce373d651882532e409ea96
*/
export const parseNumberWithPrecision = (value: number | string) => {
  return Number.parseFloat((toNumber(value) || 0).toPrecision(PRECISION));
};