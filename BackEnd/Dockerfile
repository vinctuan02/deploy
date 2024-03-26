FROM node:14-alpine
#chuẩn bị môi trường node.js, version node14/alpine

WORKDIR /hoidanit/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD [ "npm","run", "build" ]

#docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker