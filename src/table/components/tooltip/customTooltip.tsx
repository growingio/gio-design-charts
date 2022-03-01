import { BaseTooltip, SpreadSheet } from '@antv/s2';
import ReactDOM from 'react-dom';
import {
  setContainerStyle,
  TooltipShowOptions,
} from '@antv/s2'
import { TooltipComponent } from '.';
import { TooltipRenderProps } from './interfaces';
import './index.less'

// const TooltipComponent = () => (
//   <div className="tooltip-custom-component">custom tooltip</div>
// );
export class CustomTooltip extends BaseTooltip {
  public customizePrefixCls: string;
  constructor(spreadsheet: SpreadSheet, customizePrefixCls?: string) {
    super(spreadsheet);
    this.customizePrefixCls = customizePrefixCls || 'gio-d-table-tooltip';
  }
  public show<T = Element | string>(showOptions: TooltipShowOptions<T>) {
    super.show(showOptions);
    const container = this.getContainer();
    setContainerStyle(container, {
      className: `${this.customizePrefixCls}-container-show`,
    });
  }

  public hide() {
    super.hide();
    const container = this.getContainer();
    setContainerStyle(container, {
      className: `${this.customizePrefixCls}-container-hide`,
    });
  }
  renderContent() {
    // 配置级 s2.options.tooltip.content = ''
    const { content: contentFromOptions } = this.spreadsheet.options.tooltip || {};
    console.log('contentFromOptions', contentFromOptions)
    // 方法级 s2.showTooltip({ content: '' })
    const showOptions = this.options;
    const tooltipProps: TooltipRenderProps = {
      ...showOptions,
    };
    // 优先级: 方法级 > 配置级, 兼容 content 为空字符串的场景
    const content = showOptions.content ?? contentFromOptions;

    ReactDOM.render(
      <TooltipComponent {...tooltipProps} content={content} />,
      this.container,
    );
  }

  destroy() {
    super.destroy();
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
  }
  protected getContainer(): HTMLElement {
    if (!this.container) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      this.container = container;
      return this.container;
    }
    this.container.className = `${this.customizePrefixCls}-container`;
    return this.container;
  }

}
