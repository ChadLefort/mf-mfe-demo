FROM node:latest
RUN npm i serve -g

WORKDIR /usr/src
COPY dist dist

EXPOSE 1338
ENTRYPOINT ["serve", "--single", "dist", "--no-clipboard", "--listen", "1338"]