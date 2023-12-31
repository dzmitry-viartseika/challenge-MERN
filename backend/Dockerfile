FROM node:18

WORKDIR /usr/challenge-MERN/backend

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

CMD ["npm", "start"]