FROM node

RUN apt-get update

RUN mkdir /app

ADD . ./app

WORKDIR /app

RUN yarn install

CMD yarn start
