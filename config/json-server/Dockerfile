FROM node:fermium-alpine
RUN npm i json-server -g

WORKDIR /usr/src
COPY ./fixtures ./fixtures
COPY index.js ./
COPY routes.json ./

ENV NODE_ENV production
EXPOSE 4000
ENTRYPOINT ["json-server", "index.js", "--routes", "routes.json", "--port", "4000", "--delay", "1000", "--host", "0.0.0.0"]
