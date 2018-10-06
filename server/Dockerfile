FROM node

RUN apt-get update

RUN mkdir /app

ADD . ./app

WORKDIR /app

RUN yarn install

RUN yarn global add nodemon

CMD yarn migrate && yarn start
