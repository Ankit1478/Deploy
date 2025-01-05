FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production
RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]
