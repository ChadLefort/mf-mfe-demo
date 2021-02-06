FROM node:latest
RUN npm i serve -g

WORKDIR /usr/src
COPY dist dist

EXPOSE 1339
ENTRYPOINT ["serve", "--single", "dist", "--no-clipboard", "--listen", "1339"]