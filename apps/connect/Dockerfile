FROM node:latest
RUN npm i serve -g

WORKDIR /usr/src
COPY dist dist

EXPOSE 1337
ENTRYPOINT ["serve", "--single", "dist", "--no-clipboard", "--listen", "1337"]