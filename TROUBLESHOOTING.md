# 🔧 Troubleshooting & Guia Avançado

## Problemas Comuns

### 1. MongoDB não conecta

**Sintoma**: 
```
❌ Erro ao conectar ao MongoDB: connect ECONNREFUSED 127.0.0.1:27017
```

**Soluções**:

```bash
# Opção 1: Verifique se MongoDB está rodando
docker-compose ps

# Opção 2: Ver logs do MongoDB
docker-compose logs mongodb

# Opção 3: Reiniciar MongoDB
docker-compose restart mongodb

# Opção 4: Reconstruir tudo
docker-compose down -v
docker-compose up --build
```

---

### 2. Porta 3000 já em uso

**Sintoma**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Soluções**:

```bash
# Opção 1: Mude a porta no docker-compose.yml
# Edite: ports: - "3001:3000"

# Opção 2: Encontre o processo usando a porta
netstat -ano | findstr :3000

# Opção 3: Mate o processo
taskkill /PID [PID] /F
```

---

### 3. Volumes não sincronizam

**Sintoma**: 
Código alterado mas alterações não refletem

**Soluções**:

```bash
# Opção 1: Remova e recrie os containers
docker-compose down
docker-compose up --build

# Opção 2: Remova os volumes
docker volume rm api-node-js-mongodb-docker_mongodb_data

# Opção 3: Force rebuild
docker-compose up --build --no-cache
```

---

### 4. Node modules corrompido

**Sintoma**:
```
Error: Cannot find module
```

**Soluções**:

```bash
# Opção 1: Reinstale localmente
rm -r node_modules
npm install

# Opção 2: Limpe npm cache
npm cache clean --force
npm install

# Opção 3: Reconstrua imagem Docker
docker-compose build --no-cache
docker-compose up
```

---

### 5. Email/Matrícula já existe

**Sintoma** (ao testar POST):
```json
{
  "success": false,
  "message": "Este email já está registrado"
}
```

**Solução**: Use emails/matrículas diferentes:
```bash
# Use incrementos
"email": "teste1@example.com"
"email": "teste2@example.com"
"matricula": "2023001"
"matricula": "2023002"
```

---

### 6. ID inválido em GET/PUT/DELETE

**Sintoma**:
```json
{
  "success": false,
  "message": "ID inválido"
}
```

**Solução**: Copie o `_id` exato da resposta de criação:
```bash
# ❌ Errado
curl http://localhost:3000/api/students/123

# ✅ Correto
curl http://localhost:3000/api/students/507f1f77bcf86cd799439011
```

---

### 7. CORS Error

**Sintoma**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solução**: CORS já está habilitado em `server.js`:
```javascript
app.use(cors());
```

Se ainda tiver problema, reinicie a API.

---

## 🔍 Debugging

### Ver logs do MongoDB

```bash
docker-compose logs mongodb --follow
```

### Ver logs da App

```bash
docker-compose logs app --follow
```

### Ver todos os logs

```bash
docker-compose logs --follow
```

### Inspecionar container

```bash
# Entrar no container da app
docker-compose exec app sh

# Dentro do container
ls -la
cat .env
npm list
```

### Verificar rede Docker

```bash
docker network ls
docker network inspect api_network
```

### Verificar volumes

```bash
docker volume ls
docker volume inspect api-node-js-mongodb-docker_mongodb_data
```

---

## 📊 Monitoramento

### Status dos containers

```bash
docker-compose ps
```

### Uso de recursos

```bash
docker stats
```

### Verificar conectividade entre containers

```bash
# Entrar no app
docker-compose exec app ping mongodb

# Deve responder com ping
```

---

## 🧹 Limpeza

### Remover containers parados

```bash
docker-compose down
```

### Remover volumes (CUIDADO: perderá dados!)

```bash
docker-compose down -v
```

### Limpar sistema Docker

```bash
docker system prune -a
```

### Remover imagens não utilizadas

```bash
docker image prune -a
```

---

## 🔄 Reset Completo

Se algo deu muito errado:

```bash
# Parar tudo
docker-compose down -v

# Remover volumes
docker volume prune -f

# Remover imagens
docker rmi api-node-js-mongodb-docker-app mongo:7.0

# Limpar cache
npm cache clean --force

# Reconstruir
docker-compose build --no-cache

# Iniciar
docker-compose up
```

---

## 📝 Logs Úteis

### Criar logs em arquivo

```bash
docker-compose logs > debug.log 2>&1
```

### Filtrar erros

```bash
docker-compose logs | grep ERROR
docker-compose logs | grep "❌"
```

---

## 🔗 Conectar ao MongoDB diretamente

### Via MongoDB Compass

1. Abra MongoDB Compass
2. URI: `mongodb://localhost:27017/api_node_db`
3. Conecte
4. Veja coleção `students`

### Via mongosh

```bash
# Dentro do container
docker-compose exec mongodb mongosh

# Dentro do mongosh
use api_node_db
db.students.find()
```

---

## 📈 Performance

### Ver índices MongoDB

```bash
docker-compose exec mongodb mongosh

use api_node_db
db.students.getIndexes()
```

### Verificar queries lentas

```bash
db.setProfilingLevel(1)
db.system.profile.find().pretty()
```

---

## 🚨 Erros Conhecidos

### "Cannot reach database"
- Aguarde 10 segundos após iniciar
- Verifique se MongoDB iniciou com sucesso
- Veja logs do MongoDB

### "Undefined environment variables"
- Verifique `.env` existe
- Reinicie containers após editar `.env`

### "Cannot find module 'express'"
- Rode `npm install`
- Reconstrua imagem Docker

---

## ✅ Verificação de Saúde

Execute este script para verificar se tudo está OK:

```bash
#!/bin/bash

echo "🔍 Verificando saúde da API..."

# Verificar conexão
echo -n "📍 API respondendo? "
curl -s http://localhost:3000 | grep -q "API de Gerenciamento" && echo "✅" || echo "❌"

# Verificar Swagger
echo -n "📚 Swagger acessível? "
curl -s http://localhost:3000/api-docs | grep -q "swagger" && echo "✅" || echo "❌"

# Verificar MongoDB
echo -n "🗄️ MongoDB respondendo? "
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')" --quiet 2>/dev/null | grep -q "ok" && echo "✅" || echo "❌"

# Verificar containers
echo "🐳 Containers rodando:"
docker-compose ps

echo "✅ Verificação concluída!"
```

---

## 📞 Suporte

Se o problema persistir:

1. Verifique se Docker está instalado
2. Execute `docker-compose version`
3. Verifique se portas estão livres
4. Consulte logs: `docker-compose logs`
5. Tente reset completo conforme acima
