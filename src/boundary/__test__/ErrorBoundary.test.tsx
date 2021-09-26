import React from 'react';
import { render, screen } from '@testing-library/react';
import { Area } from '../../area';
import { ErrorBoundary, ErrorBoundaryCustom } from '../demos/ErrorBoundary.stories';

describe('Error Boundary', () => {
  test('default', () => {
    render(<Area {...ErrorBoundary.args} />);
    const testid = 'default-error-boundary';
    expect(screen.getByTestId(testid)).toBeTruthy();
  });

  test('custom', () => {
    const testid = 'custom-error-boundary';
    render(<Area {...ErrorBoundaryCustom.args} />);
    expect(screen.getByTestId(testid)).toBeTruthy();
  });
});
