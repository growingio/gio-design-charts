import React from 'react';
import { render, screen } from '@testing-library/react';
import Bar, { BarProps } from '../Bar';
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
import { BarConfig } from '../../interfaces';

describe('Bar Chart', () => {
  const legendTestid = 'legend-layout';
  const scrollyTestId = 'scroll-y-layout';
  test('render Chart', async () => {
    render(<Bar {...(BarDefault.args as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart', async () => {
    render(<ScrollBar {...(ScrollBarDefault.args as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with multi column', async () => {
    render(<Bar {...(BarMulti.args as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with multi column', async () => {
    render(<ScrollBar {...(ScrollBarMulti.args as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with group', async () => {
    render(<Bar {...(BarWithGroup.args as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with group', async () => {
    render(<ScrollBar {...(ScrollBarWithGroup.args as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with group contrast', async () => {
    render(<Bar {...(GroupContrast.args as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with group contrast', async () => {
    render(<ScrollBar {...(ScrollGroupContrast.args as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with stack', async () => {
    render(<Bar {...(StackingDiagramBar.args as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with stack', async () => {
    render(<ScrollBar {...(StackingDiagramBar.args as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart with percent', async () => {
    render(<Bar {...(PercentBar.args as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render scroll chart with percent', async () => {
    render(<ScrollBar {...(ScrollPercentBar.args as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Chart without bar config', async () => {
    const { config, ...props } = PercentBar.args as BarProps;

    const { bar, ...nobarConfig } = config;

    render(<Bar {...(props as BarProps)} config={nobarConfig as BarConfig} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Chart without config', async () => {
    const { config, ...props } = PercentBar.args as BarProps;

    render(<Bar {...(props as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Chart without legends', async () => {
    const { legends, ...props } = PercentBar.args as BarProps;

    render(<Bar {...(props as BarProps)} />);
    expect(await screen.findByTestId(legendTestid)).toBeTruthy();
  });

  test('render Scroll Chart without bar config', async () => {
    const { config, ...props } = PercentBar.args as BarProps;

    const { bar, ...nobarConfig } = config;

    render(<ScrollBar {...(props as BarProps)} config={nobarConfig as BarConfig} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Scroll Chart without config', async () => {
    const { config, ...props } = PercentBar.args as BarProps;

    render(<ScrollBar {...(props as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });

  test('render Scroll Chart without legends', async () => {
    const { legends, ...props } = PercentBar.args as BarProps;

    render(<ScrollBar {...(props as BarProps)} />);
    expect(await screen.findByTestId(scrollyTestId)).toBeTruthy();
  });
});
