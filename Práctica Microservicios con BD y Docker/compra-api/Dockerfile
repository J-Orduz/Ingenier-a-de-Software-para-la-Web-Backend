FROM node:20-alpine

WORKDIR /compra-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]