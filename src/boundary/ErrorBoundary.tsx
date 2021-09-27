import React, { Fragment } from 'react';

export interface ErrorBoundaryProps {
  errorTemplate: (e: Error) => JSX.Element | JSX.Element[];
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
        Component Error, Please check <code>{e.message}</code>
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
