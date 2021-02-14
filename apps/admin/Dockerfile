FROM node:fermium-alpine
RUN npm i serve -g

WORKDIR /usr/src
COPY dist dist

EXPOSE 1336
ENTRYPOINT ["serve", "--single", "dist", "--no-clipboard", "--listen", "1336"]