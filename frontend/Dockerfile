FROM node:18.16-buster-slim as frontend

WORKDIR /usr/challenge-MERN/frontend

COPY package.json .
COPY package-lock.json .

RUN rm -rf /var/cache/apt
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]