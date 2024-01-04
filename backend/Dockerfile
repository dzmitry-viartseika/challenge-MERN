FROM node:18-alpine

WORKDIR /usr/challenge-MERN/backend

COPY package.json .
#COPY package-lock.json .

RUN npm install
#RUN npm ci

COPY . .

#ENV PORT=4000
#
#EXPOSE $PORT

CMD ["npm", "run", "start"]