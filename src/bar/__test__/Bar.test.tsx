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
import { ChartProps } from '../../interface';

describe('Bar Chart', () => {
  const legendTestid = 'legend-director';
  const scrollyTestId = 'scroll-y-director';
  test('render Chart', async () => {
    render(<BarChart {...(BarDefault.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart', async () => {
    render(<ScrollBarChart {...(ScrollBarDefault.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with multi column', async () => {
    render(<BarChart {...(BarMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with multi column', async () => {
    render(<ScrollBarChart {...(ScrollBarMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<BarChart {...(BarWithGroup.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with group', async () => {
    render(<ScrollBarChart {...(ScrollBarWithGroup.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with group contrast', async () => {
    render(<BarChart {...(GroupContrast.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with group contrast', async () => {
    render(<ScrollBarChart {...(ScrollGroupContrast.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<BarChart {...(StackingDiagramBar.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with stack', async () => {
    render(<ScrollBarChart {...(StackingDiagramBar.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with percent', async () => {
    render(<BarChart {...(PercentBar.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with percent', async () => {
    render(<ScrollBarChart {...(ScrollPercentBar.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart without bar config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    const { bar, ...nobarConfig } = config;

    render(<BarChart {...(props as ChartProps)} config={nobarConfig} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Chart without config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    render(<BarChart {...(props as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Chart without legends', async () => {
    const { legends, ...props } = PercentBar.args as ChartProps;

    render(<BarChart {...(props as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Scroll Chart without bar config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    const { bar, ...nobarConfig } = config;

    render(<ScrollBarChart {...(props as ChartProps)} config={nobarConfig} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Scroll Chart without config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    render(<ScrollBarChart {...(props as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Scroll Chart without legends', async () => {
    const { legends, ...props } = PercentBar.args as ChartProps;

    render(<ScrollBarChart {...(props as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });
});
