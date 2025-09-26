# 🗄️ Configuração do Banco de Dados na Nuvem

Este guia te ajudará a configurar um banco de dados PostgreSQL na nuvem para substituir o Stackby.

## 🎯 Opções Recomendadas

### 1. Supabase (Recomendado) ⭐

**Vantagens:**
- Gratuito até 500MB
- Interface web amigável
- API REST automática
- Dashboard completo
- Backup automático

**Passo a passo:**

1. **Criar conta**
   - Acesse [supabase.com](https://supabase.com)
   - Clique em "Start your project"
   - Faça login com GitHub

2. **Criar projeto**
   - Clique em "New Project"
   - Escolha uma organização
   - Configure:
     - Nome: `e-acelera-db`
     - Senha: (anote bem!)
     - Região: `South America (São Paulo)` ou `US East (N. Virginia)`
   - Clique em "Create new project"
   - Aguarde 2-3 minutos

3. **Obter connection string**
   - Vá em Settings → Database
   - Copie a "Connection string" (URI)
   - Formato: `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`

4. **Configurar variáveis de ambiente**
   ```bash
   DATABASE_URL=postgresql://postgres:sua_senha@db.xxxxx.supabase.co:5432/postgres
   ```

### 2. Railway

**Vantagens:**
- Deploy simples
- Integração com GitHub
- $5/mês para uso contínuo

**Passo a passo:**

1. **Criar conta**
   - Acesse [railway.app](https://railway.app)
   - Faça login com GitHub

2. **Criar banco**
   - Clique em "New Project"
   - Selecione "Database" → "PostgreSQL"
   - Aguarde a criação

3. **Obter connection string**
   - Vá em "Variables"
   - Copie a `DATABASE_URL`

### 3. PlanetScale

**Vantagens:**
- MySQL (não PostgreSQL)
- Branching de banco
- Escalabilidade automática

**Nota:** Requer mudança no schema do Prisma para MySQL.

## 🔧 Configuração no Projeto

### 1. Atualizar .env

```bash
# Substitua pela sua connection string
DATABASE_URL=postgresql://postgres:sua_senha@db.xxxxx.supabase.co:5432/postgres

# Outras variáveis necessárias
JWT_SECRET=sua_chave_secreta_super_forte
NODE_ENV=production
```

### 2. Aplicar migrações

```bash
# No diretório do backend
npx prisma migrate deploy
npx prisma generate
```

### 3. Verificar conexão

```bash
# Testar conexão
npx prisma db pull

# Abrir Prisma Studio (opcional)
npx prisma studio
```

## 🚀 Deploy com Banco na Nuvem

### Vercel + Supabase

1. **Configurar no Vercel**
   - Vá para o projeto no Vercel
   - Settings → Environment Variables
   - Adicione:
     ```
     DATABASE_URL=sua_connection_string
     JWT_SECRET=sua_chave_secreta
     NODE_ENV=production
     ```

2. **Deploy**
   - O Vercel aplicará as migrações automaticamente
   - Verifique os logs de deploy

### Railway + Railway DB

1. **Conectar serviços**
   - Crie um novo projeto Railway
   - Adicione PostgreSQL Database
   - Adicione Node.js service
   - Conecte os serviços

2. **Configurar variáveis**
   - Railway detecta automaticamente a `DATABASE_URL`
   - Adicione outras variáveis necessárias

## 🧪 Testando a Configuração

### 1. Teste local

```bash
# Instalar dependências
npm install

# Aplicar migrações
npx prisma migrate deploy

# Executar testes
npm test

# Iniciar servidor
npm run dev
```

### 2. Teste de produção

```bash
# Build
npm run build

# Deploy
npx vercel --prod
```

### 3. Verificar banco

```bash
# Conectar ao banco
npx prisma studio
```

## 🔐 Segurança

### 1. Senhas fortes
- Use senhas complexas para o banco
- Use JWT secrets longos e aleatórios

### 2. Variáveis de ambiente
- Nunca commite arquivos .env
- Use secrets do GitHub/Vercel

### 3. CORS
- Configure CORS no backend
- Permita apenas domínios confiáveis

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de conexão**
   ```
   Error: connect ECONNREFUSED
   ```
   - Verifique se a connection string está correta
   - Verifique se o banco está acessível publicamente

2. **Erro de migração**
   ```
   Error: Migration failed
   ```
   - Verifique se o banco está vazio
   - Execute `npx prisma migrate reset` se necessário

3. **Erro de permissão**
   ```
   Error: permission denied
   ```
   - Verifique se o usuário tem permissões adequadas
   - Verifique se a senha está correta

### Logs Úteis

```bash
# Logs do Vercel
vercel logs

# Logs do Railway
railway logs

# Logs do Supabase
# Acesse o dashboard do Supabase
```

## 📊 Monitoramento

### 1. Supabase Dashboard
- Acesse o dashboard do Supabase
- Monitore uso de CPU, memória e storage
- Veja logs de queries

### 2. Vercel Analytics
- Monitore performance da API
- Veja logs de erro
- Monitore uso de funções

### 3. Railway Metrics
- Monitore uso de recursos
- Veja logs em tempo real
- Configure alertas

## 💰 Custos

### Supabase
- **Gratuito**: 500MB storage, 2GB bandwidth
- **Pro**: $25/mês para mais recursos

### Railway
- **Gratuito**: $5 de crédito
- **Pro**: $5/mês por serviço

### Vercel
- **Gratuito**: 100GB bandwidth
- **Pro**: $20/mês para mais recursos

## 🎉 Próximos Passos

Após configurar o banco:

1. ✅ Testar todas as funcionalidades
2. ✅ Configurar backup automático
3. ✅ Configurar monitoramento
4. ✅ Otimizar queries
5. ✅ Configurar índices se necessário

---

**Status:**
- ✅ Banco configurado
- ✅ Migrações aplicadas
- ✅ Deploy funcionando
- ✅ Testes passando
