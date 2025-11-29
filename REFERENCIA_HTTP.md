# 📋 Referência de Respostas HTTP

## Códigos de Status HTTP Utilizados

| Código | Significado | Uso |
|--------|------------|-----|
| 200 | OK | GET, PUT, DELETE bem-sucedidos |
| 201 | Created | POST bem-sucedido |
| 400 | Bad Request | Erro de validação |
| 404 | Not Found | Recurso não encontrado |
| 500 | Server Error | Erro no servidor |

---

## Estrutura de Resposta de Sucesso

### Formato Padrão
```json
{
  "success": true,
  "message": "Descrição da ação",
  "data": {
    // ... dados do recurso
  }
}
```

---

## POST /api/students - Criar Estudante

### Request
```http
POST /api/students HTTP/1.1
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "matricula": "2023001",
  "age": 20,
  "course": "Engenharia"
}
```

### Response 201 Created
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

### Response 400 Bad Request - Campos Obrigatórios Faltando
```json
{
  "success": false,
  "message": "Por favor, preencha todos os campos obrigatórios"
}
```

### Response 400 Bad Request - Email Duplicado
```json
{
  "success": false,
  "message": "Este email já está registrado"
}
```

### Response 400 Bad Request - Matrícula Duplicada
```json
{
  "success": false,
  "message": "Esta matrícula já está registrada"
}
```

---

## GET /api/students - Listar Todos

### Request
```http
GET /api/students HTTP/1.1
```

### Response 200 OK
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
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Maria Santos",
      "email": "maria@example.com",
      "matricula": "2023002",
      "age": 22,
      "course": "Sistemas",
      "active": true,
      "createdAt": "2024-11-25T10:31:00.000Z",
      "updatedAt": "2024-11-25T10:31:00.000Z"
    }
  ],
  "total": 2
}
```

### Response 500 Server Error
```json
{
  "success": false,
  "message": "Erro ao buscar estudantes",
  "error": "MongoError: connection refused"
}
```

---

## GET /api/students/:id - Obter Específico

### Request
```http
GET /api/students/507f1f77bcf86cd799439011 HTTP/1.1
```

### Response 200 OK
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

### Response 400 Bad Request - ID Inválido
```json
{
  "success": false,
  "message": "ID inválido"
}
```

### Response 404 Not Found
```json
{
  "success": false,
  "message": "Estudante não encontrado"
}
```

---

## PUT /api/students/:id - Atualizar

### Request
```http
PUT /api/students/507f1f77bcf86cd799439011 HTTP/1.1
Content-Type: application/json

{
  "age": 21,
  "name": "João Silva Santos"
}
```

### Response 200 OK
```json
{
  "success": true,
  "message": "Estudante atualizado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva Santos",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 21,
    "course": "Engenharia",
    "active": true,
    "createdAt": "2024-11-25T10:30:00.000Z",
    "updatedAt": "2024-11-25T10:35:00.000Z"
  }
}
```

### Response 400 Bad Request - Email Duplicado
```json
{
  "success": false,
  "message": "Este email já está em uso"
}
```

### Response 400 Bad Request - Matrícula Duplicada
```json
{
  "success": false,
  "message": "Esta matrícula já está em uso"
}
```

### Response 404 Not Found
```json
{
  "success": false,
  "message": "Estudante não encontrado"
}
```

---

## DELETE /api/students/:id - Deletar

### Request
```http
DELETE /api/students/507f1f77bcf86cd799439011 HTTP/1.1
```

### Response 200 OK
```json
{
  "success": true,
  "message": "Estudante deletado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva Santos",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 21,
    "course": "Engenharia",
    "active": true,
    "createdAt": "2024-11-25T10:30:00.000Z",
    "updatedAt": "2024-11-25T10:35:00.000Z"
  }
}
```

### Response 400 Bad Request - ID Inválido
```json
{
  "success": false,
  "message": "ID inválido"
}
```

### Response 404 Not Found
```json
{
  "success": false,
  "message": "Estudante não encontrado"
}
```

---

## GET / - Root Endpoint

### Request
```http
GET / HTTP/1.1
```

### Response 200 OK
```json
{
  "message": "API de Gerenciamento de Estudantes",
  "version": "1.0.0",
  "endpoints": {
    "docs": "/api-docs",
    "students": "/api/students"
  }
}
```

---

## Erro de Rota Não Encontrada (404)

### Request
```http
GET /api/invalido HTTP/1.1
```

### Response 404 Not Found
```json
{
  "success": false,
  "message": "Rota não encontrada"
}
```

---

## Schema de Validação - Student

### Campos Obrigatórios
```json
{
  "name": "string (3-255 caracteres)",
  "email": "string (email válido, único)",
  "matricula": "string (única)",
  "age": "number (18-100)",
  "course": "enum [Engenharia, Administração, Sistemas, Marketing, Outros]"
}
```

### Campos Opcionais
```json
{
  "active": "boolean (padrão: true)"
}
```

### Campos Automáticos
```json
{
  "_id": "ObjectId",
  "createdAt": "Date (automático)",
  "updatedAt": "Date (automático)"
}
```

---

## Headers Recomendados

### Para requisições com body (POST, PUT)
```
Content-Type: application/json
```

### Para todas as requisições
```
Accept: application/json
```

---

## Validações por Campo

| Campo | Validação | Erro |
|-------|-----------|------|
| name | Min: 3 caracteres | "Preencha corretamente" |
| email | Formato email | "Email inválido" |
| email | Único | "Email já existe" |
| matricula | Único | "Matrícula já existe" |
| age | Min: 18, Max: 100 | "Idade inválida" |
| course | Uma das opções | "Curso inválido" |
| _id (path) | MongoDB ObjectId | "ID inválido" |

---

## Exemplos de Payloads Válidos

### Mínimo obrigatório
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "matricula": "2023001",
  "age": 20,
  "course": "Engenharia"
}
```

### Completo
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "matricula": "2023001",
  "age": 20,
  "course": "Engenharia",
  "active": true
}
```

### Atualização parcial
```json
{
  "age": 21
}
```

---

## Tempos de Resposta Esperados

| Operação | Tempo Típico |
|----------|-------------|
| POST | 50-200ms |
| GET (lista) | 20-100ms |
| GET (por ID) | 10-50ms |
| PUT | 50-150ms |
| DELETE | 30-100ms |

---

## CORS Headers (Respostas)

Todas as respostas incluem:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Dicas de Debugging

1. **Verifique o status HTTP**: 2xx = OK, 4xx = Erro do cliente, 5xx = Erro do servidor
2. **Leia a mensagem**: Descreve exatamente o que deu errado
3. **Valide o JSON**: Use [JSONLint](https://jsonlint.com/)
4. **Copie IDs exatamente**: _id é case-sensitive
5. **Use Swagger**: http://localhost:3000/api-docs para testar interativamente
