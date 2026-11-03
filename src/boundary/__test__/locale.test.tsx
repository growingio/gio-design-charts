import React from 'react';
import { render, screen } from '@testing-library/react';
import { DesignContext } from '@gio-design/utils';
import { useIntl } from 'react-intl';
import fetchChart from '../fetchChart';
import { ChartProps } from '../../interfaces';

const LocaleProbe = fetchChart<ChartProps>(function LocaleContent() {
  return <span data-testid="locale">{useIntl().locale}</span>;
});

describe('chart locale preference', () => {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage')!;
  afterEach(() => {
    Object.defineProperty(window, 'localStorage', descriptor);
    localStorage.clear();
  });

  test('keeps storage priority over DesignContext', () => {
    localStorage.setItem('locale', 'en-US');
    render(
      <DesignContext.Provider value={{ locale: { code: 'zh-CN' } }}>
        <LocaleProbe data={[{ value: 1 }]} config={{}} />
      </DesignContext.Provider>
    );
    expect(screen.getByTestId('locale').textContent).toBe('en-US');
  });

  test.each(['en-US', undefined])('uses context %s when storage has no preference', (code) => {
    render(
      <DesignContext.Provider value={{ locale: code ? { code } : undefined }}>
        <LocaleProbe data={[{ value: 1 }]} config={{}} />
      </DesignContext.Provider>
    );
    expect(screen.getByTestId('locale').textContent).toBe(code || 'zh-CN');
  });

  test.each(['en-US', undefined])('renders with context %s when an opaque iframe denies storage', (code) => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('Opaque origin', 'SecurityError');
      },
    });
    render(
      <DesignContext.Provider value={{ locale: code ? { code } : undefined }}>
        <LocaleProbe data={[{ value: 1 }]} config={{}} />
      </DesignContext.Provider>
    );
    expect(screen.getByTestId('locale').textContent).toBe(code || 'zh-CN');
  });
});
