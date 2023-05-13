FROM node:19.4-alpine3.17
WORKDIR /app
COPY package.json ./
RUN npm i ts-node -g
RUN npm install
COPY . .
EXPOSE 3000
CMD ["ts-node", "server.ts"]