# API de Gerenciamento de Estudantes

Uma aplicação robusta de API REST desenvolvida em Node.js com Express e MongoDB, containerizada com Docker, para gerenciar dados de estudantes com operações CRUD completas e documentação automática via Swagger.

## 📋 Características

- ✅ **API REST Completa**: Operações CRUD (Create, Read, Update, Delete)
- ✅ **MongoDB**: Banco de dados NoSQL com Mongoose ODM
- ✅ **Docker & Docker Compose**: Containerização e orquestração
- ✅ **Swagger UI**: Documentação interativa automática
- ✅ **Validação de Dados**: Validações robustas no schema
- ✅ **Tratamento de Erros**: Respostas padronizadas
- ✅ **CORS Habilitado**: Pronto para requisições cross-origin

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18)
- **Express.js** (v4.18)
- **MongoDB** (v7.0)
- **Mongoose** (v7.5)
- **Swagger UI & JSDoc** (v5.0 e v6.2)
- **Docker & Docker Compose**
- **Dotenv** (Variáveis de ambiente)
- **CORS** (Compartilhamento de recursos cross-origin)

## 📁 Estrutura do Projeto

```
API-node-js-mongodb-docker/
├── src/
│   ├── config/
│   │   ├── database.js          # Configuração MongoDB
│   │   └── swagger.js           # Configuração Swagger
│   ├── controllers/
│   │   └── studentController.js # Lógica CRUD dos estudantes
│   ├── models/
│   │   └── Student.js           # Schema do MongoDB
│   ├── routes/
│   │   └── studentRoutes.js     # Rotas da API
│   ├── middleware/              # Middleware customizado
│   └── server.js                # Arquivo principal
├── .env                         # Variáveis de ambiente
├── .gitignore
├── Dockerfile                   # Containerização Node.js
├── docker-compose.yml           # Orquestração Docker
├── package.json
└── README.md
```

## 🚀 Como Executar

### Opção 1: Executar Localmente (sem Docker)

#### Pré-requisitos:
- Node.js (v18+)
- MongoDB (v7.0+)

#### Passos:

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
# Editar .env
MONGODB_URI=mongodb://localhost:27017/api_node_db
PORT=3000
```

3. **Iniciar o MongoDB:**
```bash
# Se usando MongoDB localmente
mongod
```

4. **Executar a aplicação:**
```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

5. **Acessar a API:**
- API: http://localhost:3000
- Documentação Swagger: http://localhost:3000/api-docs

### Opção 2: Executar com Docker Compose (Recomendado)

#### Pré-requisitos:
- Docker
- Docker Compose

#### Passos:

1. **Construir e iniciar os containers:**
```bash
docker-compose up --build
```

2. **Acessar a API:**
- API: http://localhost:3000
- Documentação Swagger: http://localhost:3000/api-docs

3. **Parar os containers:**
```bash
docker-compose down
```

4. **Para remover volumes (limpar dados):**
```bash
docker-compose down -v
```

## 📚 Documentação da API

A documentação completa está disponível em: **http://localhost:3000/api-docs**

### Endpoints Disponíveis

#### 1. **POST /api/students** - Criar Estudante
Cria um novo registro de estudante.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "matricula": "2023001",
  "age": 20,
  "course": "Engenharia"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Estudante criado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 20,
    "course": "Engenharia",
    "active": true,
    "createdAt": "2024-11-25T10:30:00.000Z",
    "updatedAt": "2024-11-25T10:30:00.000Z"
  }
}
```

#### 2. **GET /api/students** - Listar Todos os Estudantes
Recupera todos os estudantes cadastrados.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estudantes recuperados com sucesso",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "João Silva",
      "email": "joao@example.com",
      "matricula": "2023001",
      "age": 20,
      "course": "Engenharia",
      "active": true,
      "createdAt": "2024-11-25T10:30:00.000Z",
      "updatedAt": "2024-11-25T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

#### 3. **GET /api/students/:id** - Obter Estudante por ID
Recupera um estudante específico.

**Parameters:**
- `id` (path, required): ID do estudante (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estudante recuperado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 20,
    "course": "Engenharia",
    "active": true,
    "createdAt": "2024-11-25T10:30:00.000Z",
    "updatedAt": "2024-11-25T10:30:00.000Z"
  }
}
```

#### 4. **PUT /api/students/:id** - Atualizar Estudante
Atualiza um estudante existente.

**Parameters:**
- `id` (path, required): ID do estudante

**Request Body (todos os campos são opcionais):**
```json
{
  "name": "João Silva Atualizado",
  "age": 21,
  "active": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estudante atualizado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva Atualizado",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 21,
    "course": "Engenharia",
    "active": true,
    "createdAt": "2024-11-25T10:30:00.000Z",
    "updatedAt": "2024-11-25T10:30:00.000Z"
  }
}
```

#### 5. **DELETE /api/students/:id** - Deletar Estudante
Remove um estudante do banco de dados.

**Parameters:**
- `id` (path, required): ID do estudante

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estudante deletado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 20,
    "course": "Engenharia",
    "active": true,
    "createdAt": "2024-11-25T10:30:00.000Z",
    "updatedAt": "2024-11-25T10:30:00.000Z"
  }
}
```

## 🧪 Testando a API

### Usando cURL

```bash
# Criar estudante
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@example.com",
    "matricula": "2023002",
    "age": 22,
    "course": "Sistemas"
  }'

# Listar todos
curl http://localhost:3000/api/students

# Obter por ID
curl http://localhost:3000/api/students/507f1f77bcf86cd799439011

# Atualizar
curl -X PUT http://localhost:3000/api/students/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "age": 23,
    "name": "Maria Santos Silva"
  }'

# Deletar
curl -X DELETE http://localhost:3000/api/students/507f1f77bcf86cd799439011
```

### Usando Postman

1. Importe a URL da API: `http://localhost:3000/api-docs`
2. Postman pode gerar automaticamente uma collection a partir do Swagger
3. Teste cada endpoint utilizando a interface

### Usando Insomnia

1. Crie um novo workspace
2. Importe a collection do Swagger: `http://localhost:3000/swagger.json`
3. Teste os endpoints diretamente

## 📊 Modelo de Dados - Student

```javascript
{
  _id: ObjectId,              // ID único do MongoDB
  name: String,               // Nome (obrigatório, mínimo 3 caracteres)
  email: String,              // Email único (obrigatório, validado)
  matricula: String,          // Matrícula única (obrigatório)
  age: Number,                // Idade (obrigatória, mínimo 18)
  course: String,             // Curso (obrigatório)
                              // Valores: Engenharia, Administração, Sistemas, Marketing, Outros
  active: Boolean,            // Status ativo (padrão: true)
  createdAt: DateTime,        // Data de criação (automática)
  updatedAt: DateTime         // Data de atualização (automática)
}
```

## 🐳 Docker - Detalhes

### Serviços

#### MongoDB
- **Imagem**: mongo:7.0
- **Container**: api-mongodb
- **Porta**: 27017
- **Volume**: mongodb_data (persistência de dados)
- **Rede**: api_network

#### Node.js App
- **Imagem**: Compilada do Dockerfile
- **Container**: api-node-app
- **Porta**: 3000
- **Volume**: ./src (código)
- **Rede**: api_network
- **Dependência**: mongodb (healthcheck)

### Rede Docker

Os containers se comunicam através da rede interna `api_network`:
- App acessa MongoDB em: `mongodb://mongodb:27017`
- Isolamento de rede entre containers

## 🔧 Variáveis de Ambiente

Arquivo `.env`:
```
# Servidor
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://mongodb:27017/api_node_db
```

## 📝 Validações

### Student Model
- **name**: Obrigatório, mínimo 3 caracteres
- **email**: Obrigatório, único, formato válido
- **matricula**: Obrigatória, única
- **age**: Obrigatório, mínimo 18, máximo 100
- **course**: Obrigatório, valores permitidos
- **active**: Booleano, padrão true

### Respostas de Erro

**Erro de Validação (400):**
```json
{
  "success": false,
  "message": "Por favor, preencha todos os campos obrigatórios"
}
```

**Não Encontrado (404):**
```json
{
  "success": false,
  "message": "Estudante não encontrado"
}
```

**Erro do Servidor (500):**
```json
{
  "success": false,
  "message": "Erro ao criar estudante",
  "error": "Detalhes do erro"
}
```

## 🚨 Troubleshooting

### Problema: MongoDB não conecta
```
Solução: Verifique se o container MongoDB está rodando:
docker ps
docker-compose logs mongodb
```

### Problema: Porta 3000 já em uso
```
Solução: Mude a porta no docker-compose.yml:
ports:
  - "3001:3000"
```

### Problema: Volumes não sincronizam
```
Solução: Recrie os containers:
docker-compose down -v
docker-compose up --build
```

## 📖 Referências

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Swagger/OpenAPI](https://swagger.io/)

## 📄 Licença

Este projeto é fornecido como parte de um exercício educacional.

## 👤 Autor

Desenvolvido como projeto de aprendizado em Banco de Dados NoSQL.

---

**Última atualização**: Novembro 2024
