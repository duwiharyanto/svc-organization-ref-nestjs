FROM node:12.19.0-alpine3.9

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY /dist ./dist

CMD ["node", "dist/main"]
