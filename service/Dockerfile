FROM node:14-alpine as build
WORKDIR /app

COPY ./package.json ./yarn.* ./
RUN npm install
COPY . .
RUN npm run build
RUN apk add zip
RUN zip -r dist.zip ./dist

FROM node:14-alpine
COPY --from=build ./app/package.json .
COPY --from=build ./app/yarn.lock .
COPY --from=build ./app/dist.zip ./
RUN apk add unzip && unzip dist.zip && apk del unzip
RUN yarn --prod && yarn cache clean

EXPOSE 3009

CMD npm start