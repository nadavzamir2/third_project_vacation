FROM node:22-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
COPY wait-for-it.sh .
COPY entrypoint.sh .
RUN chmod +x wait-for-it.sh
RUN chmod +x entrypoint.sh

# Install all dependencies (including devDependencies for development)
RUN npm install

COPY ./src /app/src

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "start"]

