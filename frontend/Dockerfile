FROM node:18-alpine as build

WORKDIR /usr/challenge-MERN/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]