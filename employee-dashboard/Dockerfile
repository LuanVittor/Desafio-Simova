# Usar uma imagem oficial do Node.js como a base
FROM node:14

# Criar e definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Build da aplicação
RUN npm run build

# Instalar um servidor web simples para servir os arquivos estáticos
RUN npm install -g serve

# Expor a porta que a aplicação usará
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "run", "serve"]
