FROM node:18.16-buster-slim as backend

WORKDIR /usr/challenge-MERN/backend

COPY package.json .
COPY package-lock.json .

RUN rm -rf /var/cache/apt
RUN npm ci

COPY . .

#ENV PORT=4000
#
#EXPOSE $PORT

CMD ["npm", "run", "start"]