FROM node:latest

WORKDIR /MS-Authentication

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
