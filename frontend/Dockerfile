FROM node:18-alpine

WORKDIR /usr/challenge-MERN/frontend

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]