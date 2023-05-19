FROM node:19.4-alpine3.17
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "index.js"]