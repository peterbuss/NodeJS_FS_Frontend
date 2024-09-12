FROM node:22

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node", "server"]

