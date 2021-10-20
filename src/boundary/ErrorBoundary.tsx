import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

export interface ErrorBoundaryProps {
  errorTemplate?: (e: Error) => JSX.Element | JSX.Element[];
  children?: JSX.Element | JSX.Element[];
}

export interface ErrorBoundaryState {
  hasError?: boolean;
  error?: Error | '';
  children?: JSX.Element | JSX.Element[];
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(nextProps: ErrorBoundaryProps, state: ErrorBoundaryState) {
    if (state.children !== nextProps.children) {
      return {
        children: nextProps.children,
        hasError: false,
        error: undefined,
      };
    }
    return null;
  }

  state: ErrorBoundaryState = {
    hasError: false,
  };

  renderError = (e: Error) => {
    const { errorTemplate } = this.props;
    return errorTemplate && typeof errorTemplate === 'function' ? (
      errorTemplate(e)
    ) : (
      <div data-testid="default-error-boundary">
        <FormattedMessage
          id="Chart.ErrorBoundary"
          defaultMessage="Chart组件出现错误，请检查："
          description="Chart - Error Boundary"
        />
        <code>{e.toString()}</code>
      </div>
    );
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.renderError(this.state.error);
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
