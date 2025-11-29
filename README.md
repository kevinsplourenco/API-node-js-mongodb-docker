# API Node.js MongoDB Docker

REST API para gerenciamento de estudantes com Node.js, MongoDB e Docker.

## Requisitos

- Node.js 18+
- MongoDB Atlas ou MongoDB local
- Docker e Docker Compose

## Instalacao Rapida

1. Clone o repositorio
```bash
git clone https://github.com/kevinsplourenco/API-node-js-mongodb-docker.git
cd API-node-js-mongodb-docker
```

2. Instale as dependencias
```bash
npm install
```

3. Configure o arquivo .env
```bash
cp .env.example .env
```

Edite o arquivo .env com suas credenciais MongoDB:
```
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/banco
```

4. Inicie a aplicacao
```bash
npm start
```

API disponivel em: http://localhost:3000

## Com Docker

```bash
docker-compose up
```

## Endpoints

- POST /api/students - Criar estudante
- GET /api/students - Listar estudantes  
- GET /api/students/:id - Obter estudante
- PUT /api/students/:id - Atualizar estudante
- DELETE /api/students/:id - Deletar estudante

## Documentacao

Swagger UI: http://localhost:3000/api-docs

## Estrutura

```
src/
  config/database.js - Conexao MongoDB
  config/swagger.js - Documentacao API
  controllers/studentController.js - Logica CRUD
  models/Student.js - Schema MongoDB
  routes/studentRoutes.js - Rotas
  server.js - Aplicacao Express
```

## Tecnologias

- Express.js
- MongoDB
- Mongoose
- Swagger/OpenAPI
- Docker
