# E-Acelera Backend

Backend da aplicação E-Acelera, migrado do Stackby para uma arquitetura baseada em GitHub Actions e deploy na nuvem.

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Express.js** para API REST
- **Prisma** como ORM
- **PostgreSQL** como banco de dados
- **Jest** para testes
- **GitHub Actions** para CI/CD
- **Vercel** para deploy

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/GabrielleGobbi/e-acelaraTest2ComAPIeActionBack.git
cd e-acelaraTest2ComAPIeActionBack
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco:
```bash
npx prisma migrate deploy
npx prisma generate
```

5. Inicie o servidor:
```bash
npm run dev
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## 🚀 Deploy

### Deploy Automático (Recomendado)

O projeto está configurado para deploy automático via GitHub Actions:

1. **Vercel**: Configure as secrets no GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` 
   - `VERCEL_PROJECT_ID`

2. **Banco de Dados**: Configure uma instância PostgreSQL na nuvem:
   - [Supabase](https://supabase.com) (Recomendado)
   - [Railway](https://railway.app)
   - [PlanetScale](https://planetscale.com)

### Deploy Manual

```bash
# Build do projeto
npm run build

# Deploy para Vercel
npx vercel --prod
```

## 📊 Banco de Dados

### Configuração na Nuvem

#### Supabase (Recomendado)
1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Copie a connection string
4. Configure a variável `DATABASE_URL` no seu ambiente

#### Railway
1. Crie uma conta no [Railway](https://railway.app)
2. Adicione um serviço PostgreSQL
3. Copie a connection string
4. Configure a variável `DATABASE_URL`

### Migrações

```bash
# Aplicar migrações
npx prisma migrate deploy

# Gerar cliente Prisma
npx prisma generate

# Visualizar banco (opcional)
npx prisma studio
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm test` - Executa os testes
- `npm run test:coverage` - Executa testes com coverage
- `npm run build` - Aplica migrações do banco

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Controladores da API
├── services/        # Lógica de negócio
├── middleware/      # Middlewares do Express
├── routes/          # Definição das rotas
├── types/           # Definições de tipos TypeScript
├── utils/           # Utilitários
└── index.ts         # Ponto de entrada da aplicação
```

## 🔐 Variáveis de Ambiente

Veja o arquivo `.env.example` para todas as variáveis necessárias.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com a equipe.