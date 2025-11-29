# 🚀 Quick Start - Início Rápido

## Opção 1: Com Docker (Recomendado)

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Passos

```bash
# 1. Navegar até o diretório do projeto
cd c:\Users\kevin\OneDrive\Documentos\API-node-js-mongodb-docker

# 2. Iniciar os containers
docker-compose up --build

# 3. Aguardar até ver a mensagem:
# "🚀 Servidor iniciado com sucesso!"
# "📚 Documentação: http://localhost:3000/api-docs"
```

### Acessar

- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api-docs
- **MongoDB**: localhost:27017

### Parar

```bash
# Parar os containers
docker-compose down

# Remover volumes (limpar dados)
docker-compose down -v
```

---

## Opção 2: Localmente (sem Docker)

### Pré-requisitos
- Node.js v18+
- MongoDB v7.0+ rodando localmente

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar MongoDB
mongod

# 3. Em outro terminal, iniciar a aplicação
npm run dev

# 4. Aguardar mensagem de sucesso
```

### Acessar
- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api-docs

---

## 🧪 Testes Rápidos

### Criar Estudante

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "matricula": "2023001",
    "age": 20,
    "course": "Engenharia"
  }'
```

### Listar Todos

```bash
curl http://localhost:3000/api/students
```

### Obter um (Substitua o ID)

```bash
curl http://localhost:3000/api/students/ID_DO_ESTUDANTE
```

### Atualizar (Substitua o ID)

```bash
curl -X PUT http://localhost:3000/api/students/ID_DO_ESTUDANTE \
  -H "Content-Type: application/json" \
  -d '{"age": 21}'
```

### Deletar (Substitua o ID)

```bash
curl -X DELETE http://localhost:3000/api/students/ID_DO_ESTUDANTE
```

---

## 📊 Status da API

```bash
# Verificar se está rodando
curl http://localhost:3000
```

Resposta esperada:
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

## 🐳 Docker Troubleshooting

### Porta 3000 já em uso?
```bash
# Editar docker-compose.yml
# Mudar: ports: - "3000:3000"
# Para:  ports: - "3001:3000"
```

### MongoDB não conecta?
```bash
# Ver logs
docker-compose logs mongodb

# Reiniciar
docker-compose restart mongodb
```

### Limpar tudo?
```bash
docker-compose down -v
docker system prune -a
```

---

## 📚 Documentação Completa

Veja `README.md` para documentação detalhada.

---

## ✅ Checklist de Sucesso

- [ ] Docker/MongoDB rodando
- [ ] API respondendo em http://localhost:3000
- [ ] Swagger acessível em http://localhost:3000/api-docs
- [ ] POST /api/students funcionando
- [ ] GET /api/students funcionando
- [ ] PUT /api/students/:id funcionando
- [ ] DELETE /api/students/:id funcionando
