FROM node:17-alpine as dependencies
WORKDIR /
COPY package.json .
RUN yarn
COPY . .
# Build production image
FROM dependencies as builder
RUN yarn build
EXPOSE 3000
CMD yarn start:prod