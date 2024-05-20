
# Employee Dashboard

Este é um painel de funcionários desenvolvido com Vue.js no frontend e Node.js no backend, utilizando PostgreSQL como banco de dados e Docker para containerização.

## Requisitos

- Docker
- Docker Compose

## Configuração do Projeto

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/employee-dashboard.git
cd employee-dashboard
```

### Estrutura do Projeto

```
.
├── employee-dashboard         # Frontend Vue.js
├── employee-dashboard-backend # Backend Node.js
├── docker-compose.yml         # Configuração do Docker Compose
└── README.md                  # Este arquivo
```

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente definidas no arquivo `docker-compose.yml`. Certifique-se de que as seguintes variáveis estão configuradas corretamente:

```yaml
services:
  db:
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: employeedb
  backend:
    environment:
      - NODE_ENV=development
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
      - DB_NAME=employeedb
```

### Iniciando o Projeto

Para iniciar o projeto, basta executar o Docker Compose:

```bash
docker-compose up --build
```

Isso fará o build e iniciará os containers para o frontend, backend e banco de dados.

### Acessando a Aplicação

- **Frontend**: Acesse [http://localhost:8080](http://localhost:8080)
- **Backend**: A API estará disponível em [http://localhost:3000](http://localhost:3000)

### Executando Testes Unitários do Frontend

Para rodar os testes unitários do frontend, navegue até a pasta do frontend e execute o comando de testes:

```bash
cd employee-dashboard
npm run test
```

### Verificando a Conexão com o Banco de Dados (Nāo obrigatório)

Para garantir que o banco de dados PostgreSQL está funcionando corretamente, você pode acessar o container do banco de dados e utilizar o cliente `psql`:

```bash
docker exec -it desafio-simova-db-1 /bin/bash
psql -U myuser -d employeedb
```

### Migrações e Seed de Dados

As migrações e o seed de dados serão executados automaticamente na inicialização do backend. Se precisar rodar manualmente:

```bash
docker exec -it desafio-simova-backend-1 /bin/bash
npx sequelize-cli db:migrate
node src/migrations/seed.js
```

