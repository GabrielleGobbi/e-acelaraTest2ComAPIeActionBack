# 🔄 Estratégia de Migração Híbrida: Stackby + GitHub

## 🎯 Conceito

Use o projeto original no Vercel para **acessar informações** do Stackby enquanto migra gradualmente para o novo sistema. Isso permite:

- ✅ **Acesso imediato** aos dados do Stackby
- ✅ **Migração gradual** sem interrupção
- ✅ **Teste paralelo** dos dois sistemas
- ✅ **Rollback fácil** se necessário

## 🏗️ Arquitetura Híbrida

```
Frontend (Novo) → Backend (Novo) → PostgreSQL (Novo)
     ↓
Backend (Original) → Stackby (Dados existentes)
```

## 📋 Plano de Implementação

### Fase 1: Deploy do Projeto Original (Imediato)

1. **Deploy do backend atual no Vercel**
   ```bash
   # No diretório do backend atual
   npx vercel --prod
   ```

2. **Configurar variáveis de ambiente no Vercel**
   ```
   STACKBY_SECRET_KEY=sua_chave_atual
   STACKBY_BASE_URL=sua_url_atual
   CACHE_ENABLED=TRUE
   CACHE_TTL=28800
   ```

3. **Deploy do frontend atual**
   ```bash
   # No diretório do frontend atual
   npx vercel --prod
   ```

### Fase 2: Configurar Acesso Híbrido

1. **Manter rotas do Stackby funcionando**
   - `/api/stackby/*` - Acesso aos dados do Stackby
   - `/api/progress/*` - Sistema de progresso (novo)

2. **Configurar CORS para permitir ambos os domínios**

### Fase 3: Migração Gradual

1. **Migrar dados essenciais primeiro**
   - Usuários
   - Progresso dos usuários
   - Configurações

2. **Manter Stackby como fallback**
   - Se novo sistema falhar, usar Stackby
   - Sincronização bidirecional

## 🚀 Implementação Rápida

### 1. Deploy Imediato do Backend Original

```bash
# No diretório e-acelera-back
npm install
npx vercel --prod
```

**Variáveis de ambiente no Vercel:**
```
STACKBY_SECRET_KEY=sua_stackby_secret_key
STACKBY_BASE_URL=sua_stackby_base_url
CACHE_ENABLED=TRUE
CACHE_TTL=28800
NODE_ENV=production
```

### 2. Deploy Imediato do Frontend Original

```bash
# No diretório e-acelera-front
npm install
npx vercel --prod
```

**Variáveis de ambiente no Vercel:**
```
BACKEND_BASE_URL=https://seu-backend-original.vercel.app
NEXTAUTH_URL=https://seu-frontend-original.vercel.app
NEXTAUTH_SECRET=sua_chave_secreta
# ... outras variáveis OAuth
```

### 3. Configurar Domínios

- **Backend original**: `e-acelera-api.vercel.app`
- **Frontend original**: `e-acelera-app.vercel.app`
- **Backend novo**: `e-acelera-api-v2.vercel.app`
- **Frontend novo**: `e-acelera-app-v2.vercel.app`

## 🔧 Configuração de CORS

### Backend Original
```typescript
// src/index.ts
app.use(cors({
  origin: [
    'https://e-acelera-app.vercel.app',
    'https://e-acelera-app-v2.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### Backend Novo
```typescript
// src/index.ts
app.use(cors({
  origin: [
    'https://e-acelera-app.vercel.app',
    'https://e-acelera-app-v2.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

## 📊 Estratégia de Dados

### 1. Dados de Leitura (Stackby)
- **Temas**: Continuar usando Stackby
- **Tópicos**: Continuar usando Stackby
- **Exercícios**: Continuar usando Stackby

### 2. Dados de Escrita (Novo Sistema)
- **Progresso do usuário**: Migrar para PostgreSQL
- **Autenticação**: Migrar para novo sistema
- **Configurações**: Migrar para PostgreSQL

### 3. Sincronização
```typescript
// Exemplo de serviço híbrido
class HybridDataService {
  async getThemes() {
    // Ler do Stackby
    return this.stackbyService.fetchStackbyData('Themes');
  }
  
  async saveProgress(progress) {
    // Salvar no PostgreSQL
    return this.progressService.save(progress);
  }
}
```

## 🧪 Testes da Estratégia Híbrida

### 1. Teste de Acesso
```bash
# Testar acesso aos dados do Stackby
curl https://e-acelera-api.vercel.app/api/stackby/Themes

# Testar novo sistema de progresso
curl https://e-acelera-api-v2.vercel.app/api/progress
```

### 2. Teste de Frontend
- Acesse `https://e-acelera-app.vercel.app`
- Verifique se os dados carregam
- Teste login e funcionalidades

## 🔄 Migração Gradual

### Semana 1: Deploy Original
- ✅ Deploy do sistema atual
- ✅ Teste de funcionalidades
- ✅ Configuração de domínios

### Semana 2: Configuração Híbrida
- ✅ Deploy do novo backend
- ✅ Configuração de CORS
- ✅ Teste de integração

### Semana 3: Migração de Dados
- ✅ Migrar progresso dos usuários
- ✅ Configurar sincronização
- ✅ Teste de dados

### Semana 4: Migração Completa
- ✅ Migrar todos os dados
- ✅ Desativar Stackby
- ✅ Limpeza do código

## 🚨 Pontos de Atenção

### 1. Duplicação de Dados
- Evite salvar os mesmos dados em dois lugares
- Use Stackby apenas para leitura
- Use PostgreSQL para escrita

### 2. Sincronização
- Configure sincronização automática se necessário
- Monitore inconsistências
- Tenha plano de rollback

### 3. Performance
- Cache dados do Stackby
- Otimize queries do PostgreSQL
- Monitore latência

## 💰 Custos

### Vercel
- **Gratuito**: 100GB bandwidth
- **Pro**: $20/mês se necessário

### Stackby
- Continue usando o plano atual
- Reduza uso gradualmente

### Banco de Dados
- **Supabase**: Gratuito até 500MB
- **Railway**: $5/mês

## 🎉 Vantagens da Estratégia Híbrida

1. **Zero Downtime**: Sistema continua funcionando
2. **Migração Segura**: Teste antes de migrar
3. **Rollback Fácil**: Volta ao Stackby se necessário
4. **Aprendizado**: Entenda o novo sistema gradualmente
5. **Dados Preservados**: Nada se perde na migração

## 📞 Próximos Passos

1. **Deploy imediato** do sistema atual
2. **Teste** todas as funcionalidades
3. **Configure** o novo sistema em paralelo
4. **Migre** gradualmente os dados
5. **Desative** o Stackby quando estiver seguro

---

**Esta estratégia permite que você tenha o melhor dos dois mundos: acesso imediato aos dados do Stackby e migração segura para o novo sistema!** 🚀
