import { Middleware, MiddlewareAPI, compose } from '@reduxjs/toolkit';

const createInjectedMiddleware = () => {
  const allInjectedMiddleware: ReturnType<Middleware>[] = [];
  let middlewareAPI: MiddlewareAPI;

  const enhancer: Middleware = (api) => {
    middlewareAPI = api;
    return (next) => (action) => compose<ReturnType<Middleware>>(...allInjectedMiddleware)(next)(action);
  };

  const addMiddleware = (...asyncMiddleware: Middleware[]) => {
    allInjectedMiddleware.push(...asyncMiddleware.map((middleware) => middleware(middlewareAPI)));
  };

  return {
    enhancer,
    addMiddleware
  };
};

export const injectedMiddlewareInstance = createInjectedMiddleware();
export const injectedMiddleware = injectedMiddlewareInstance.enhancer;
export const { addMiddleware } = injectedMiddlewareInstance;
