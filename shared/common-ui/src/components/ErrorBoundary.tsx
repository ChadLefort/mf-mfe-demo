import { Box } from '@material-ui/core';
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorIcon } from './ErrorIcon';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Box margin={2}>
          <ErrorIcon message="Sorry there was an error" />
        </Box>
      );
    }

    return children;
  }
}
