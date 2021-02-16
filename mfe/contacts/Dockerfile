FROM node:fermium-alpine
RUN npm i serve -g

WORKDIR /usr/src
COPY dist dist/1.0.0

EXPOSE 1339
ENTRYPOINT ["serve", "--single", "dist", "--no-clipboard", "--listen", "1339"]