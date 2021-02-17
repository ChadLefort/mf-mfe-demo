import { Middleware, MiddlewareAPI, compose } from '@reduxjs/toolkit';

export const createInjectedMiddleware = () => {
  let allInjectedMiddleware: ReturnType<Middleware>[] = [];
  let middlewareAPI: MiddlewareAPI;

  const enhancer: Middleware = (api) => {
    middlewareAPI = api;
    return (next) => (action) => compose<ReturnType<Middleware>>(...allInjectedMiddleware)(next)(action);
  };

  const add = (...asyncMiddleware: Middleware[]) => {
    allInjectedMiddleware.push(...asyncMiddleware.map((middleware) => middleware(middlewareAPI)));
  };

  const remove = (middleware: ReturnType<Middleware>) => {
    const index = allInjectedMiddleware.findIndex((d) => d === middleware);

    if (index === -1) {
      return;
    }

    allInjectedMiddleware = allInjectedMiddleware.filter((_, i) => i !== index);
  };

  return {
    enhancer,
    add,
    remove
  };
};

export const injectedMiddlewareInstance = createInjectedMiddleware();
export const injectedMiddleware = injectedMiddlewareInstance.enhancer;
export const middlewareManager = injectedMiddlewareInstance;
