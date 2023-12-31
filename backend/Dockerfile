FROM node:18 AS Production

ENV NODE_ENV=production

WORKDIR /usr/challenge-MERN/backend

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

RUN npm run build