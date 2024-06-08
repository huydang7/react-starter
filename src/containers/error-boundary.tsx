import React from 'react';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div
          className="flex-center"
          style={{
            flexDirection: 'column',
            padding: 64,
          }}
        >
          <h2>Something went wrong.</h2>
          <details
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
            }}
          >
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
