FROM node:16.17.0-alpine

WORKDIR /home/node/app
RUN npm install -g npm@8.15.0
RUN npm config set unsafe-perm true
