FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve @vue/cli-service-global

EXPOSE 8080

CMD ["npm", "run", "serve"]
