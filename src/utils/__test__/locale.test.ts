import { readStoredLocale } from '../locale';
import { formatDateByTs } from '../formatDate';

describe('locale without browser storage', () => {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage')!;
  afterEach(() => {
    // Node 16 的 VM 全局属性需先删除，才能从数据属性恢复为访问器。
    Reflect.deleteProperty(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', descriptor);
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('keeps the stored locale and English date labels', () => {
    localStorage.setItem('locale', 'en-US');
    expect(readStoredLocale()).toBe('en-US');
    expect(formatDateByTs(new Date(2026, 10, 3).getTime())).toBe('11/03 Tue');
  });

  test('uses Chinese date labels when no preference exists', () => {
    expect(readStoredLocale()).toBeNull();
    expect(formatDateByTs(new Date(2026, 10, 3).getTime())).toBe('11/03 周二');
    expect(formatDateByTs('未提供日期')).toBe('未提供日期');
  });

  test.each(['missing', 'getter', 'read'])('contains %s storage failures', (mode) => {
    if (mode === 'missing') Object.defineProperty(window, 'localStorage', { value: undefined, configurable: true });
    if (mode === 'getter')
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('Opaque origin', 'SecurityError');
        },
      });
    if (mode === 'read')
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('Storage denied', 'SecurityError');
      });
    expect(readStoredLocale()).toBeNull();
    expect(formatDateByTs(new Date(2026, 10, 3).getTime())).toBe('11/03 周二');
  });
});
