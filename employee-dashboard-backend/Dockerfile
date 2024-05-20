FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g sequelize-cli

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "node src/migrations/seed.js && node src/app.js"]
