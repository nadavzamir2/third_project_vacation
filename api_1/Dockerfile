FROM node:22-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
COPY wait-for-it.sh .
COPY entrypoint.sh .
RUN chmod +x wait-for-it.sh
RUN chmod +x entrypoint.sh

RUN npm install

COPY ./src /app/src

CMD ["npm", "run", "start"]

