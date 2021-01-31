# Micro Frontend with Webpack 5 Module Federation

This is the same pets demo applications that I have in other repos, but this one demonstrates [Webpack 5 Module Federation](https://webpack.js.org/concepts/module-federation/). Everything in the `shared` directory is a federated module with the expection of `types` being a package. The host application that serves these modules is in `apps/cats`. The application also features the concept of injectable redux reducers.

## Getting started

This monorepo is using lerna and yarn workspaces. So make sure you install yarn first:

```
npm i yarn -g
```

Then in the root directory just run the following commands to start the app and json-server:

```
yarn && yarn start
```

## More Info

- https://module-federation.github.io/
- https://webpack.js.org/concepts/module-federation/
- https://redux.js.org/recipes/code-splitting#reducer-injection-approaches

## Todo

- Add Storybook and Jest
- Look into [redux-dynamic-modules](https://github.com/Microsoft/redux-dynamic-modules)
- Look into [single-spa](https://single-spa.js.org/) if even needed
- Keep an eye on [HMR](https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/126)
- Probably something else I'm forgetting...
