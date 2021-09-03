import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChart from '../BarChart';
import ScrollBarChart from '../ScrollBarChart';
import {
  BarDefault,
  BarMulti,
  BarWithGroup,
  GroupContrast,
  PercentBar,
  ScrollBarDefault,
  ScrollBarMulti,
  ScrollBarWithGroup,
  ScrollGroupContrast,
  ScrollPercentBar,
  StackingDiagramBar,
} from '../demos/Bar.stories';

describe('Bar Chart', () => {
  test('render Chart', async () => {
    render(<BarChart {...BarDefault.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render scroll chart', async () => {
    render(<ScrollBarChart {...ScrollBarDefault.args} />);
    expect(await screen.findByTestId('scroll-y-director')).toBeTruthy();
  });

  test('render Chart with multi column', async () => {
    render(<BarChart {...BarMulti.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render scroll chart with multi column', async () => {
    render(<ScrollBarChart {...ScrollBarMulti.args} />);
    expect(await screen.findByTestId('scroll-y-director')).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<BarChart {...BarWithGroup.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render scroll chart with group', async () => {
    render(<ScrollBarChart {...ScrollBarWithGroup.args} />);
    expect(await screen.findByTestId('scroll-y-director')).toBeTruthy();
  });

  test('render Chart with group contrast', async () => {
    render(<BarChart {...GroupContrast.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render scroll chart with group contrast', async () => {
    render(<ScrollBarChart {...ScrollGroupContrast.args} />);
    expect(await screen.findByTestId('scroll-y-director')).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<BarChart {...StackingDiagramBar.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render scroll chart with stack', async () => {
    render(<ScrollBarChart {...StackingDiagramBar.args} />);
    expect(await screen.findByTestId('scroll-y-director')).toBeTruthy();
  });

  test('render Chart with percent', async () => {
    render(<BarChart {...PercentBar.args} />);
    expect(await screen.findByTestId('legend-director')).toBeTruthy();
  });

  test('render scroll chart with percent', async () => {
    render(<ScrollBarChart {...ScrollPercentBar.args} />);
    expect(await screen.findByTestId('scroll-y-director')).toBeTruthy();
  });
});
