# 🛠️ Exemplos de Testes com Diferentes Ferramentas

## 1️⃣ cURL (Linha de Comando)

### Criar Estudante
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Costa",
    "email": "ana@example.com",
    "matricula": "2023001",
    "age": 21,
    "course": "Sistemas"
  }'
```

### Listar Todos
```bash
curl http://localhost:3000/api/students
```

### Obter Específico
```bash
# Substitua STUDENT_ID com o ID real
curl http://localhost:3000/api/students/STUDENT_ID
```

### Atualizar
```bash
curl -X PUT http://localhost:3000/api/students/STUDENT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "age": 22,
    "course": "Engenharia"
  }'
```

### Deletar
```bash
curl -X DELETE http://localhost:3000/api/students/STUDENT_ID
```

---

## 2️⃣ PowerShell

### Criar Estudante
```powershell
$body = @{
    name = "Carlos Silva"
    email = "carlos@example.com"
    matricula = "2023002"
    age = 20
    course = "Administração"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/students" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content | ConvertFrom-Json
```

### Listar Todos
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/students"
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

### Obter Específico
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/students/STUDENT_ID"
$response.Content | ConvertFrom-Json
```

### Atualizar
```powershell
$body = @{
    age = 21
    active = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/students/STUDENT_ID" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

### Deletar
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/students/STUDENT_ID" `
  -Method DELETE
```

---

## 3️⃣ JavaScript/Fetch (Node.js ou Browser)

### Setup
```javascript
const BASE_URL = 'http://localhost:3000/api';

async function apiCall(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) options.body = JSON.stringify(body);
  
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return response.json();
}
```

### Criar
```javascript
const newStudent = await apiCall('POST', '/students', {
  name: 'Marina Silva',
  email: 'marina@example.com',
  matricula: '2023003',
  age: 19,
  course: 'Marketing'
});
console.log(newStudent);
```

### Listar
```javascript
const students = await apiCall('GET', '/students');
console.log(students);
```

### Obter
```javascript
const student = await apiCall('GET', `/students/${studentId}`);
console.log(student);
```

### Atualizar
```javascript
const updated = await apiCall('PUT', `/students/${studentId}`, {
  age: 20
});
console.log(updated);
```

### Deletar
```javascript
const deleted = await apiCall('DELETE', `/students/${studentId}`);
console.log(deleted);
```

---

## 4️⃣ Postman

### Importar Collection

1. Abra Postman
2. Click em **Import**
3. Cole a URL: `http://localhost:3000/swagger.json`
4. Postman cria automaticamente a collection

### Ou criar manualmente:

#### Request: POST - Criar
- **Method**: POST
- **URL**: http://localhost:3000/api/students
- **Headers**: Content-Type: application/json
- **Body** (raw, JSON):
```json
{
  "name": "Pedro Santos",
  "email": "pedro@example.com",
  "matricula": "2023004",
  "age": 22,
  "course": "Engenharia"
}
```

#### Request: GET - Listar
- **Method**: GET
- **URL**: http://localhost:3000/api/students

#### Request: GET - Obter por ID
- **Method**: GET
- **URL**: http://localhost:3000/api/students/{{STUDENT_ID}}

#### Request: PUT - Atualizar
- **Method**: PUT
- **URL**: http://localhost:3000/api/students/{{STUDENT_ID}}
- **Headers**: Content-Type: application/json
- **Body** (raw, JSON):
```json
{
  "age": 23,
  "course": "Sistemas"
}
```

#### Request: DELETE - Deletar
- **Method**: DELETE
- **URL**: http://localhost:3000/api/students/{{STUDENT_ID}}

---

## 5️⃣ Insomnia

### Importar Collection

1. Abra Insomnia
2. **Create** → **Request Collection**
3. **Create** → **API Request**
4. Cole a URL da API

### Ou usar Swagger:
1. **Preferences** → **Data**
2. **Sync** → Importe de http://localhost:3000/swagger.json

---

## 6️⃣ Thunder Client (VS Code)

### Extensão
1. Instale "Thunder Client" no VS Code
2. Abra a extensão
3. **Collections** → **New**

### Criar Requests

**POST - Criar Estudante**
```
POST http://localhost:3000/api/students
Content-Type: application/json

{
  "name": "Julia Oliveira",
  "email": "julia@example.com",
  "matricula": "2023005",
  "age": 20,
  "course": "Administração"
}
```

**GET - Listar**
```
GET http://localhost:3000/api/students
```

---

## 7️⃣ REST Client (VS Code)

### Criar arquivo `requests.http`

```http
### Variáveis
@baseUrl = http://localhost:3000/api
@studentId = 

### Criar Estudante
POST {{baseUrl}}/students
Content-Type: application/json

{
  "name": "Lucas Ferreira",
  "email": "lucas@example.com",
  "matricula": "2023006",
  "age": 21,
  "course": "Sistemas"
}

### Listar Todos
GET {{baseUrl}}/students

### Obter por ID
GET {{baseUrl}}/students/{{studentId}}

### Atualizar
PUT {{baseUrl}}/students/{{studentId}}
Content-Type: application/json

{
  "age": 22,
  "active": true
}

### Deletar
DELETE {{baseUrl}}/students/{{studentId}}
```

---

## 8️⃣ Python (Requests)

### Instalar
```bash
pip install requests
```

### Script
```python
import requests
import json

BASE_URL = 'http://localhost:3000/api'

# Criar
response = requests.post(f'{BASE_URL}/students', json={
    'name': 'Sophia Costa',
    'email': 'sophia@example.com',
    'matricula': '2023007',
    'age': 19,
    'course': 'Marketing'
})
print('Criar:', response.json())

# Listar
response = requests.get(f'{BASE_URL}/students')
print('Listar:', response.json())

# Obter
student_id = response.json()['data'][0]['_id']
response = requests.get(f'{BASE_URL}/students/{student_id}')
print('Obter:', response.json())

# Atualizar
response = requests.put(f'{BASE_URL}/students/{student_id}', json={'age': 20})
print('Atualizar:', response.json())

# Deletar
response = requests.delete(f'{BASE_URL}/students/{student_id}')
print('Deletar:', response.json())
```

---

## 9️⃣ cURL com Arquivo JSON

### Criar arquivo `student.json`
```json
{
  "name": "Rafael Martins",
  "email": "rafael@example.com",
  "matricula": "2023008",
  "age": 21,
  "course": "Engenharia"
}
```

### Usar com cURL
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d @student.json
```

---

## 🔟 Wget

### Criar
```bash
wget --method=POST \
  --header='Content-Type: application/json' \
  --body-data='{"name":"Beatriz","email":"beatriz@example.com","matricula":"2023009","age":22,"course":"Sistemas"}' \
  http://localhost:3000/api/students
```

### Listar
```bash
wget http://localhost:3000/api/students
```

---

## 📊 Resumo de Todas as Ferramentas

| Ferramenta | Melhor para | Link |
|-----------|-----------|------|
| cURL | Linha de comando | https://curl.se/ |
| Postman | Testes profissionais | https://www.postman.com/ |
| Insomnia | Alternativa ao Postman | https://insomnia.rest/ |
| Thunder Client | VS Code | [Extensão VS Code](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) |
| REST Client | VS Code | [Extensão VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) |
| JavaScript/Fetch | Browser/Node.js | Padrão |
| Python Requests | Scripts Python | https://requests.readthedocs.io/ |

---

## 💡 Dicas

- Use variáveis de ambiente para guardar IDs
- Teste cada endpoint individualmente
- Verifique respostas de erro (400, 404, 500)
- Use Swagger UI para referência: http://localhost:3000/api-docs
