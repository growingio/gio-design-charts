# [1.0.0-beta.3](https://github.com/growingio/gio-design-charts/compare/v1.0.0-beta...v1.0.0-beta.3) (2021-10-25)


### Bug Fixes

* **animate:** support close animate by using config.chart.closeAnimate ([#90](https://github.com/growingio/gio-design-charts/issues/90)) ([85802e6](https://github.com/growingio/gio-design-charts/commit/85802e6640bc14d8202a354b2b7927421c0d58eb))
* **data:** support re-render chart when data is updated whether value or object is changed ([#96](https://github.com/growingio/gio-design-charts/issues/96)) ([d061c54](https://github.com/growingio/gio-design-charts/commit/d061c54a6213086001eab2f6c9a9e20e6286520a))
* **element-link:** fix issue when change window size quickly for funnel ([#101](https://github.com/growingio/gio-design-charts/issues/101)) ([ee89617](https://github.com/growingio/gio-design-charts/commit/ee89617b2d0ea385de7f6ba79abb78bb7bd6cc6d))
* **font:** update font size and color ([#97](https://github.com/growingio/gio-design-charts/issues/97)) ([13ef41c](https://github.com/growingio/gio-design-charts/commit/13ef41c4656c6b4f1ae53d02817f507d3c50bce8))
* **font:** update font-family to Lato ([#99](https://github.com/growingio/gio-design-charts/issues/99)) ([c8e9223](https://github.com/growingio/gio-design-charts/commit/c8e92233f03754c3ec198b4a179bf368a5409b56))
* **InfoCard:** fix the max-height of info-card to 300px ([#79](https://github.com/growingio/gio-design-charts/issues/79)) ([6197d7e](https://github.com/growingio/gio-design-charts/commit/6197d7e442eaa4e1ee86bee1c960994bf00e631f))
* **InfoCard:** modify infoCard styles and default value issue ([#87](https://github.com/growingio/gio-design-charts/issues/87)) ([275285b](https://github.com/growingio/gio-design-charts/commit/275285babc26c0748c0fe85480be2752ef76ad1a))
* **label:** update the label color ([#102](https://github.com/growingio/gio-design-charts/issues/102)) ([27c80d0](https://github.com/growingio/gio-design-charts/commit/27c80d08f7898c7978136f3eebf2c5e53ac47180))
* **Line & Area:** update scale config in line/Area storybook ([#85](https://github.com/growingio/gio-design-charts/issues/85)) ([a7ff28d](https://github.com/growingio/gio-design-charts/commit/a7ff28d3ba22a6c0382afa3f1ca34380fe0a9b8d))
* **react:** move react repos to peerDependencies ([#88](https://github.com/growingio/gio-design-charts/issues/88)) ([6a6f7c6](https://github.com/growingio/gio-design-charts/commit/6a6f7c63e9cc0c88c4dfda2c3288f980119a1e67)), closes [#87](https://github.com/growingio/gio-design-charts/issues/87)
* **resize:** re-render chart when div size is changed ([#93](https://github.com/growingio/gio-design-charts/issues/93)) ([be113f8](https://github.com/growingio/gio-design-charts/commit/be113f8a52cde4ebfba0f92c7bfc69e64836e001))
* **Sroll-x:** make sure the chart support scroll when browser size is changed ([#92](https://github.com/growingio/gio-design-charts/issues/92)) ([ed64477](https://github.com/growingio/gio-design-charts/commit/ed64477ef2dde1b630fb82955119b5e298f54af6))
* **Tooltip:** change the color of tooltip crosshairs to gray-3 #ebedf5 ([#80](https://github.com/growingio/gio-design-charts/issues/80)) ([9393f78](https://github.com/growingio/gio-design-charts/commit/9393f78887fc219bd15a875d1b71eff7eac039b0)), closes [#ebedf5](https://github.com/growingio/gio-design-charts/issues/ebedf5)


### Features

* **DragBar:** add DragBar chart ([#94](https://github.com/growingio/gio-design-charts/issues/94)) ([9a1b7c2](https://github.com/growingio/gio-design-charts/commit/9a1b7c227115b28da1cc394e1dfc86eda83616bf))
* **DragBar:** support DragBar with title and total ([#95](https://github.com/growingio/gio-design-charts/issues/95)) ([4eb3799](https://github.com/growingio/gio-design-charts/commit/4eb37990ec8850c9d8d4bab23c237085f8ae476e))
* **funnel:** group funnel 添加column ([#103](https://github.com/growingio/gio-design-charts/issues/103)) ([4185b77](https://github.com/growingio/gio-design-charts/commit/4185b7743d6d1df2adbd2ba60ec1ee7195f4609b))
* **Highlight:** support highlight for Area ([#81](https://github.com/growingio/gio-design-charts/issues/81)) ([f1cf213](https://github.com/growingio/gio-design-charts/commit/f1cf213aee1fcebb23f8af3e26f4ca9eb636238b))
* **infocard:** 样式修改 ([#104](https://github.com/growingio/gio-design-charts/issues/104)) ([5866aca](https://github.com/growingio/gio-design-charts/commit/5866acad25335b5d5338caa191bfcac7b446fccf))
* **internalization:** support internalization ([#100](https://github.com/growingio/gio-design-charts/issues/100)) ([8ab2e7e](https://github.com/growingio/gio-design-charts/commit/8ab2e7e487b8e861ba3c7bd9a11299c5dc9c7d8c))
* **texture:** use new texture for Bar and Column ([#82](https://github.com/growingio/gio-design-charts/issues/82)) ([2ef85c9](https://github.com/growingio/gio-design-charts/commit/2ef85c991422a13d9c0580340ae7abf6a528c838))
* **theme:** support update theme by DesignContext for chart ([#98](https://github.com/growingio/gio-design-charts/issues/98)) ([2c95841](https://github.com/growingio/gio-design-charts/commit/2c95841c344c7c5f0977d93ceb82e28d588d68e0))
* **TinyArea:** Add TinyArea chart ([#83](https://github.com/growingio/gio-design-charts/issues/83)) ([8e7d19d](https://github.com/growingio/gio-design-charts/commit/8e7d19d611557f03fee336d1822262f167533e9d))
* **tooltip:** useTunnel to update tooltip trigger items to reduce updates in core ([#84](https://github.com/growingio/gio-design-charts/issues/84)) ([7fe1041](https://github.com/growingio/gio-design-charts/commit/7fe10414e9b805ddb4c3d6919d74c416ae5d405c))
* **useChart:** render chart by using useChart hook ([#91](https://github.com/growingio/gio-design-charts/issues/91)) ([d2022d8](https://github.com/growingio/gio-design-charts/commit/d2022d8608d1f3dfe2da3454241b31743d806543))



