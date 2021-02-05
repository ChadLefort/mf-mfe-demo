FROM node:latest
RUN npm i json-server -g

WORKDIR /data
COPY ./fixtures ./fixtures
COPY index.js ./
COPY routes.json ./

EXPOSE 4000
ADD run.sh /run.sh
ENTRYPOINT ["bash", "/run.sh"]
CMD []