import { AnyAction, Middleware, applyMiddleware, createStore } from '@reduxjs/toolkit';

import { injectedMiddleware, middlewareManager } from './middleware-manager';

const reducer = (state = {}, action: AnyAction) => {
  if (action.type === 'foo') return { foo: 'bar' };
  return state;
};

describe('middleware manager', () => {
  it('should allow redux to still work', () => {
    const store = createStore(reducer, applyMiddleware(injectedMiddleware));

    expect(store.getState()).toEqual({});

    store.dispatch({ type: 'foo' });

    expect(store.getState()).toEqual({ foo: 'bar' });
  });

  it('should allow you to add a middleware', () => {
    const store = createStore(reducer, applyMiddleware(injectedMiddleware));

    const middlewareMock = jest.fn();
    const middleware: Middleware = () => (next) => (action) => {
      middlewareMock(action);
      return next(action);
    };

    middlewareManager.add(middleware);

    store.dispatch({ type: 'foo' });

    expect(middlewareMock).toBeCalledWith({ type: 'foo' });
  });

  it('should allow you to add multiple middleware at once', () => {
    const store = createStore(reducer, applyMiddleware(injectedMiddleware));

    const firstMiddlewareMock = jest.fn();
    const firstMiddleware: Middleware = () => (next) => (action) => {
      firstMiddlewareMock(action);
      return next(action);
    };

    const secondMiddlewareMock = jest.fn();
    const secondMiddleware: Middleware = () => (next) => (action) => {
      secondMiddlewareMock(action);
      return next(action);
    };

    middlewareManager.add(firstMiddleware, secondMiddleware);

    store.dispatch({ type: 'foo' });

    expect(firstMiddlewareMock).toBeCalledWith({ type: 'foo' });
    expect(secondMiddlewareMock).toBeCalledWith({ type: 'foo' });
  });

  it('should not call middleware that has been removed', () => {
    const store = createStore(reducer, applyMiddleware(injectedMiddleware));

    const firstMiddlewareMock = jest.fn();
    const firstMiddleware: Middleware = () => (next) => (action) => {
      firstMiddlewareMock(action);
      return next(action);
    };

    const secondMiddlewareMock = jest.fn();
    const secondMiddleware: Middleware = () => (next) => (action) => {
      secondMiddlewareMock(action);
      return next(action);
    };

    middlewareManager.add(firstMiddleware, secondMiddleware);
    middlewareManager.remove(secondMiddleware);

    store.dispatch({ type: 'foo' });

    expect(firstMiddlewareMock).toBeCalledWith({ type: 'foo' });
    expect(secondMiddlewareMock).not.toBeCalled();
  });
});
