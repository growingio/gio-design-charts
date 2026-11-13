# GrowingIO Design Charts

一套基于 [G2](https://g2.antv.vision/zh) 的 Chart 组件库

![Build](https://img.shields.io/github/checks-status/growingio/gio-design-charts/master)
![Sonar](https://img.shields.io/sonar/coverage/gio-design-charts?server=http%3A%2F%2Fsonarcloud.io)
![Quality Gate](https://img.shields.io/sonar/quality_gate/gio-design-charts?server=https%3A%2F%2Fsonarcloud.io)
![Npm Version](https://img.shields.io/npm/v/@gio-design/charts)
![Release](https://img.shields.io/github/release-date/growingio/gio-design-charts)
![Score](https://img.shields.io/npms-io/final-score/@gio-design/charts)

![License](https://img.shields.io/github/license/growingio/gio-design)

## ✨ Features

- Base on [G2](https://g2.antv.vision/zh)
- React.js
- Storybook
- Typescript

## 📦 Installation

```bash | pure
$ npm install @gio-design/charts
```

## View in Website

```
yarn storybook
```

## Sandboxed previews

Charts can render inside an iframe with `sandbox="allow-scripts"`. When browser storage is unavailable, chart labels use `DesignContext`'s locale and then `zh-CN`; `formatDateByTs` defaults to Chinese. When storage is available, its `locale` preference retains priority. The embedding application owns script execution and network restrictions.

`HotMap` accepts `HotMapData`: an object with a `source` array and optional dimension lists, matching the heatmap Storybook examples. Other chart components retain their existing array inputs.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgrowingio%2Fgio-design.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgrowingio%2Fgio-design?ref=badge_large)

---

Powered by

<p>
  <a href="https://gio-design-charts.vercel.app/?path=/story/charts-dashboard--dashboard" target="_blank"><img src="https://gio-design-charts.vercel.app/favicon-32x32.png" alt="Vercel Inc." height=32 /></a>
</p>
