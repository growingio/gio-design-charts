import React, { Fragment } from 'react';

class ErrorBoundary extends React.Component<any> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(nextProps: any, state: any) {
    if (state.children !== nextProps.children) {
      return {
        children: nextProps.children,
        hasError: false,
        error: undefined,
      };
    }
    return null;
  }

  state: {
    hasError: boolean;
    error?: Error;
  } = {
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
    if (this.state.hasError) {
      return this.renderError(this.state.error!);
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
