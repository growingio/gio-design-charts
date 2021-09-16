import React from 'react';
import { render, screen } from '@testing-library/react';
import Bar from '../Bar';
import ScrollBar from '../ScrollBar';
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
import { ChartProps } from '../../interfaces';

describe('Bar Chart', () => {
  const legendTestid = 'legend-layout';
  const scrollyTestId = 'scroll-y-layout';
  test('render Chart', async () => {
    render(<Bar {...(BarDefault.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart', async () => {
    render(<ScrollBar {...(ScrollBarDefault.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with multi column', async () => {
    render(<Bar {...(BarMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with multi column', async () => {
    render(<ScrollBar {...(ScrollBarMulti.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<Bar {...(BarWithGroup.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with group', async () => {
    render(<ScrollBar {...(ScrollBarWithGroup.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with group contrast', async () => {
    render(<Bar {...(GroupContrast.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with group contrast', async () => {
    render(<ScrollBar {...(ScrollGroupContrast.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<Bar {...(StackingDiagramBar.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with stack', async () => {
    render(<ScrollBar {...(StackingDiagramBar.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with percent', async () => {
    render(<Bar {...(PercentBar.args as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with percent', async () => {
    render(<ScrollBar {...(ScrollPercentBar.args as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart without bar config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    const { bar, ...nobarConfig } = config;

    render(<Bar {...(props as ChartProps)} config={nobarConfig} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Chart without config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    render(<Bar {...(props as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Chart without legends', async () => {
    const { legends, ...props } = PercentBar.args as ChartProps;

    render(<Bar {...(props as ChartProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Scroll Chart without bar config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    const { bar, ...nobarConfig } = config;

    render(<ScrollBar {...(props as ChartProps)} config={nobarConfig} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Scroll Chart without config', async () => {
    const { config, ...props } = PercentBar.args as ChartProps;

    render(<ScrollBar {...(props as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Scroll Chart without legends', async () => {
    const { legends, ...props } = PercentBar.args as ChartProps;

    render(<ScrollBar {...(props as ChartProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });
});
