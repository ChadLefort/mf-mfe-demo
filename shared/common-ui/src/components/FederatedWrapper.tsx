import { Box } from '@material-ui/core';
import React, { Component, ComponentType, ErrorInfo, ReactNode, Suspense } from 'react';

import { ErrorIcon } from './ErrorIcon';
import { LoadingBar } from './LoadingBar';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class FederatedWrapper extends Component<Props, State> {
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

    return <Suspense fallback={<LoadingBar />}>{children}</Suspense>;
  }
}

export function withFederatedModule<T>(WrappedComponent: ComponentType<T>) {
  const ComponentWithWrapper = (props: T) => (
    <FederatedWrapper>
      <WrappedComponent {...props} />
    </FederatedWrapper>
  );

  return ComponentWithWrapper as ComponentType<T>;
}
