# ⚡ Deploy Rápido - Projeto Original no Vercel

## 🎯 Objetivo

Fazer deploy imediato do projeto atual (que usa Stackby) no Vercel para ter acesso às informações enquanto migra para o novo sistema.

## 🚀 Deploy em 3 Passos

### 1. Deploy do Backend

```bash
# No diretório e-acelera-back
cd e-acelera-back

# Instalar Vercel CLI (se não tiver)
npm install -g vercel

# Deploy
vercel --prod
```

**Variáveis de ambiente no Vercel:**
```
STACKBY_SECRET_KEY=sua_stackby_secret_key
STACKBY_BASE_URL=sua_stackby_base_url
CACHE_ENABLED=TRUE
CACHE_TTL=28800
NODE_ENV=production
```

### 2. Deploy do Frontend

```bash
# No diretório e-acelera-front
cd e-acelera-front

# Deploy
vercel --prod
```

**Variáveis de ambiente no Vercel:**
```
BACKEND_BASE_URL=https://seu-backend.vercel.app
NEXTAUTH_URL=https://seu-frontend.vercel.app
NEXTAUTH_SECRET=sua_chave_secreta_forte
GIT_ID=seu_github_client_id
GIT_SECRET=seu_github_client_secret
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
LINKEDIN_CLIENT_ID=seu_linkedin_client_id
LINKEDIN_CLIENT_SECRET=seu_linkedin_client_secret
FACEBOOK_CLIENT_ID=seu_facebook_client_id
FACEBOOK_CLIENT_SECRET=seu_facebook_client_secret
```

### 3. Configurar Variáveis no Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto deployado
3. Vá em Settings → Environment Variables
4. Adicione todas as variáveis listadas acima
5. Clique em "Save"
6. Faça um novo deploy para aplicar as variáveis

## 🧪 Testar o Deploy

### Backend
```bash
# Testar rota de temas
curl https://seu-backend.vercel.app/api/stackby/Themes

# Testar rota de tópicos
curl https://seu-backend.vercel.app/api/stackby/Topics

# Testar rota de exercícios
curl https://seu-backend.vercel.app/api/stackby/Exercises
```

### Frontend
1. Acesse a URL do frontend deployado
2. Teste o login
3. Navegue pelas páginas
4. Verifique se os dados carregam

## 🔧 Configuração de CORS (se necessário)

Se houver problemas de CORS, adicione no backend:

```typescript
// src/index.ts
import cors from 'cors';

app.use(cors({
  origin: [
    'https://seu-frontend.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

## 📊 Estratégia de Domínios

### Opção 1: Domínios Automáticos
- Backend: `e-acelera-back-xxx.vercel.app`
- Frontend: `e-acelera-front-xxx.vercel.app`

### Opção 2: Domínios Personalizados
- Backend: `api.e-acelera.com`
- Frontend: `app.e-acelera.com`

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de variáveis de ambiente**
   - Verifique se todas as variáveis estão configuradas
   - Faça um novo deploy após adicionar variáveis

2. **Erro de CORS**
   - Configure CORS no backend
   - Verifique as URLs permitidas

3. **Erro de autenticação**
   - Verifique se as chaves OAuth estão corretas
   - Verifique se as URLs de callback estão configuradas

4. **Erro de conexão com Stackby**
   - Verifique se as credenciais do Stackby estão corretas
   - Verifique se a URL do Stackby está acessível

### Logs Úteis

```bash
# Ver logs do Vercel
vercel logs

# Ver logs em tempo real
vercel logs --follow
```

## 🎉 Próximos Passos

Após o deploy bem-sucedido:

1. ✅ **Teste todas as funcionalidades**
2. ✅ **Configure domínios personalizados** (opcional)
3. ✅ **Configure monitoramento** (opcional)
4. ✅ **Inicie a migração gradual** para o novo sistema

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Vercel
2. Consulte a documentação do Vercel
3. Verifique as variáveis de ambiente
4. Teste localmente primeiro

---

**Com este deploy, você terá acesso imediato aos dados do Stackby enquanto migra para o novo sistema!** 🚀
