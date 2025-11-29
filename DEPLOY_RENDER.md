# 🚀 Guia de Deploy no Render

## Passos para Deploy da API Node.js + MongoDB Atlas no Render

### 1. Preparação no Render
1. Acesse [render.com](https://render.com) e faça login/crie uma conta
2. Clique em **"New +"** e selecione **"Web Service"**
3. Selecione a opção **"Connect a GitHub repository"**
4. Procure por `API-node-js-mongodb-docker` e conecte

### 2. Configuração do Serviço

**Nome do Serviço:**
- `api-node-mongodb` (ou outro nome de sua preferência)

**Ambiente:**
- Node
- Região: Oregon (ou a mais próxima)

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

### 3. Variáveis de Ambiente

⚠️ **IMPORTANTE:** Adicione as variáveis de ambiente no dashboard do Render:

| Variável | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `MONGODB_URI` | `mongodb+srv://DTKido:Lowshutdown%403224@atividade.jak7ir0.mongodb.net/api_node_db?retryWrites=true&w=majority&appName=Atividade` |

**Passos para adicionar:**
1. Vá para **"Environment"** na página do serviço
2. Clique em **"Add Environment Variable"**
3. Preencheu cada variável conforme a tabela acima

### 4. Health Check (Opcional mas Recomendado)

1. Vá para **"Health Check"**
2. Define o caminho: `/api-docs`
3. Port: `3000`
4. Initial Delay: `30` (segundos)
5. Timeout: `10` (segundos)

### 5. Auto-Deploy (Já Configurado!)

✅ O repositório GitHub já está conectado. Cada push na branch `main` acionará automaticamente um novo deploy!

**Para fazer deploy:**
```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

### 6. Verificação do Deploy

1. Acesse a URL fornecida pelo Render (exemplo: `https://api-node-mongodb.onrender.com`)
2. Teste a documentação Swagger: `https://api-node-mongodb.onrender.com/api-docs`
3. Teste um endpoint:
```bash
curl https://api-node-mongodb.onrender.com/api/students
```

### 7. Troubleshooting

**Erro: "MongoDB connection timeout"**
- Verifique se a variável `MONGODB_URI` está corretamente configurada
- Certifique-se de que o IP do Render está na whitelist do MongoDB Atlas
  - No MongoDB Atlas → Network Access → Add IP Address
  - Adicione `0.0.0.0/0` para aceitar conexões de qualquer lugar (desenvolvimento)

**Erro: "Port 3000 not available"**
- Verifique se a variável `PORT` está configurada como `3000`
- Render geralmente fornece a variável `PORT` automaticamente

**Deploy não acionado após push**
- Verifique se está fazendo push na branch `main`
- Confirme que o repositório está conectado em Render → Settings

### 8. Logs em Tempo Real

Para visualizar os logs:
1. Acesse o serviço no Render Dashboard
2. Clique em **"Logs"** para ver logs em tempo real
3. Use **"Useful Environment Variables"** para entender variáveis disponíveis

### 9. Database MongoDB Atlas - Network Access

⚠️ **Importante:** No MongoDB Atlas, você precisa:

1. Ir para **Network Access** → **IP Whitelist**
2. Clique em **"Add IP Address"**
3. Selecione **"Allow Access from Anywhere"** (ou adicione o IP específico do Render)
4. Confirme

Isso permite que o serviço Render se conecte ao seu banco MongoDB.

### 10. Monitoramento e Métricas

Render fornece:
- Logs em tempo real
- Métricas de CPU/Memória
- Status de health check
- Histórico de deploys

## Checklist de Deploy

- [ ] Repositório GitHub conectado ao Render
- [ ] Variáveis de ambiente configuradas (NODE_ENV, PORT, MONGODB_URI)
- [ ] IP do Render adicionado ao whitelist do MongoDB Atlas
- [ ] Build command configurado: `npm install`
- [ ] Start command configurado: `npm start`
- [ ] Health check apontando para `/api-docs`
- [ ] URL do serviço anotada
- [ ] Swagger acessível na URL
- [ ] Teste POST/GET funcionando

## URLs Úteis

- **API Base:** `https://seu-servico.onrender.com`
- **Swagger UI:** `https://seu-servico.onrender.com/api-docs`
- **Health Check:** `https://seu-servico.onrender.com/api-docs`

---

✅ **Parabéns!** Sua API está no ar e pronta para uso em produção!
