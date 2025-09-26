# 🚀 Guia de Migração Frontend: Stackby → GitHub + Nuvem

Este guia te ajudará a migrar o frontend do Stackby para uma arquitetura baseada em GitHub Actions e deploy na nuvem.

## 📋 Status da Migração Frontend

### ✅ Configurações Iniciais
- [x] Repositório GitHub configurado
- [x] GitHub Actions configurado
- [x] Estrutura de CI/CD pronta

### 🔄 Próximos Passos

#### A. Atualizar Variáveis de Ambiente

1. **Criar arquivo .env.example** (já criado)
2. **Atualizar .env local** com as novas configurações:
   ```bash
   # Substituir URLs do Stackby pela URL do backend
   BACKEND_BASE_URL=https://seu-backend.vercel.app
   NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
   
   # Atualizar URL de produção
   NEXTAUTH_URL=https://seu-frontend.vercel.app
   ```

#### B. Atualizar Código para Nova API

1. **Substituir chamadas do Stackby**
   - Encontrar todas as referências ao Stackby no código
   - Substituir pelas chamadas para o novo backend
   - Atualizar endpoints e estruturas de dados

2. **Configurar CORS**
   - Garantir que o backend aceite requisições do frontend
   - Configurar domínios permitidos

#### C. Deploy do Frontend

**Vercel (Recomendado)**
1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório `e-acelaraTest2ComAPIeActionFront`
3. Configure as variáveis de ambiente:
   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
   NEXTAUTH_URL=https://seu-frontend.vercel.app
   NEXTAUTH_SECRET=sua_chave_secreta
   GIT_ID=seu_github_client_id
   GIT_SECRET=seu_github_client_secret
   GOOGLE_CLIENT_ID=seu_google_client_id
   GOOGLE_CLIENT_SECRET=seu_google_client_secret
   ```
4. Deploy!

#### D. Configurar Secrets no GitHub

1. Vá para o repositório no GitHub
2. Settings → Secrets and variables → Actions
3. Adicione as seguintes secrets:
   - `VERCEL_TOKEN`: Token do Vercel
   - `VERCEL_ORG_ID`: ID da organização
   - `VERCEL_PROJECT_ID`: ID do projeto

### 🧪 Testes e Validação

1. **Testes Locais**
   ```bash
   npm test
   npm run build
   ```

2. **Testes de Integração**
   - Teste login com diferentes provedores
   - Teste todas as funcionalidades principais
   - Verifique se os dados são salvos corretamente

3. **Testes de Deploy**
   - Verifique se o deploy automático funciona
   - Teste em ambiente de produção

### 🔧 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Executar testes
npm test

# Build para produção
npm run build

# Deploy para Vercel
npx vercel --prod
```

### 🚨 Troubleshooting

#### Problemas Comuns

1. **Erro de CORS**
   - Verifique se o backend está configurado para aceitar o domínio do frontend
   - Configure CORS no backend

2. **Erro de autenticação**
   - Verifique se as URLs do NextAuth estão corretas
   - Verifique se os client IDs e secrets estão configurados

3. **Erro de build**
   - Verifique se todas as variáveis de ambiente estão definidas
   - Verifique se não há erros de TypeScript

4. **Deploy falha**
   - Verifique os logs no Vercel
   - Verifique se todas as variáveis de ambiente estão configuradas

### 📞 Suporte

Se encontrar problemas:
1. Verifique os logs de deploy
2. Consulte a documentação do Vercel
3. Abra uma issue no repositório
4. Entre em contato com a equipe

---

**Próximos Passos:**
1. Atualizar variáveis de ambiente
2. Substituir chamadas do Stackby
3. Fazer deploy
4. Testar integração
5. Configurar domínio personalizado