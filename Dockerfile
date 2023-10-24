FROM node:21

WORKDIR /src

COPY /package*.json .

RUN npm install

COPY . .
EXPOSE 3001

CMD [ "node", "./src/server.js"]