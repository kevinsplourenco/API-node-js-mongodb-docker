# Exemplos de Testes da API

Este arquivo contém exemplos de requisições HTTP para testar todos os endpoints da API.

## 1. Criar Estudante

### Request
```
POST /api/students
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "matricula": "2023001",
  "age": 20,
  "course": "Engenharia"
}
```

### Response (201)
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

---

## 2. Criar Outro Estudante

### Request
```
POST /api/students
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "matricula": "2023002",
  "age": 22,
  "course": "Sistemas"
}
```

---

## 3. Listar Todos os Estudantes

### Request
```
GET /api/students
```

### Response (200)
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

---

## 4. Obter Estudante por ID

### Request
```
GET /api/students/507f1f77bcf86cd799439011
```

### Response (200)
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

---

## 5. Atualizar Estudante

### Request
```
PUT /api/students/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "age": 21,
  "name": "João Silva Oliveira"
}
```

### Response (200)
```json
{
  "success": true,
  "message": "Estudante atualizado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva Oliveira",
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

---

## 6. Inativar Estudante

### Request
```
PUT /api/students/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "active": false
}
```

---

## 7. Deletar Estudante

### Request
```
DELETE /api/students/507f1f77bcf86cd799439011
```

### Response (200)
```json
{
  "success": true,
  "message": "Estudante deletado com sucesso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "João Silva Oliveira",
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

---

## 8. Erros Comuns

### Email Duplicado (400)
```
POST /api/students
{
  "name": "Outro Estudante",
  "email": "joao@example.com",  // Já existe
  "matricula": "2023003",
  "age": 20,
  "course": "Engenharia"
}

Response (400):
{
  "success": false,
  "message": "Este email já está registrado"
}
```

### Matrícula Duplicada (400)
```
POST /api/students
{
  "name": "Outro Estudante",
  "email": "outro@example.com",
  "matricula": "2023001",  // Já existe
  "age": 20,
  "course": "Engenharia"
}

Response (400):
{
  "success": false,
  "message": "Esta matrícula já está registrada"
}
```

### Campos Obrigatórios Faltando (400)
```
POST /api/students
{
  "name": "Estudante Incompleto"
  // Faltam campos obrigatórios
}

Response (400):
{
  "success": false,
  "message": "Por favor, preencha todos os campos obrigatórios"
}
```

### ID Inválido (400)
```
GET /api/students/invalid-id

Response (400):
{
  "success": false,
  "message": "ID inválido"
}
```

### Estudante Não Encontrado (404)
```
GET /api/students/507f1f77bcf86cd799439999

Response (404):
{
  "success": false,
  "message": "Estudante não encontrado"
}
```

---

## Testes com cURL

```bash
# Criar
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 20,
    "course": "Engenharia"
  }'

# Listar todos
curl http://localhost:3000/api/students

# Obter um por ID (substitua o ID)
curl http://localhost:3000/api/students/REPLACE_WITH_ID

# Atualizar (substitua o ID)
curl -X PUT http://localhost:3000/api/students/REPLACE_WITH_ID \
  -H "Content-Type: application/json" \
  -d '{
    "age": 21,
    "name": "João Silva Atualizado"
  }'

# Deletar (substitua o ID)
curl -X DELETE http://localhost:3000/api/students/REPLACE_WITH_ID
```

---

## Testes com PowerShell

```powershell
# Criar
$body = @{
    name = "João Silva"
    email = "joao@example.com"
    matricula = "2023001"
    age = 20
    course = "Engenharia"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/students" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

# Listar todos
Invoke-WebRequest -Uri "http://localhost:3000/api/students" `
  -Method GET

# Obter um
Invoke-WebRequest -Uri "http://localhost:3000/api/students/REPLACE_WITH_ID" `
  -Method GET

# Atualizar
$updateBody = @{
    age = 21
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/students/REPLACE_WITH_ID" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $updateBody

# Deletar
Invoke-WebRequest -Uri "http://localhost:3000/api/students/REPLACE_WITH_ID" `
  -Method DELETE
```
