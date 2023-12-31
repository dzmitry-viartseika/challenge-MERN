#FROM node:18 AS Production
#
#ENV NODE_ENV=production
#
#WORKDIR /usr/challenge-MERN/backend
#
#COPY package.json .
#COPY package-lock.json .
#
#RUN npm install && npm cache clean --force
#
#COPY . .
#
#EXPOSE 4000
#
#RUN npm run build

#FROM node:12.22.1-alpine3.10
#
#RUN mkdir -p /usr/src/backend
#WORKDIR /usr/src/backend
#
#COPY dist/final.js .
#
#EXPOSE 5000
#CMD ["node","final.js"]