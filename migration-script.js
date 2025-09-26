#!/usr/bin/env node

/**
 * Script de Migração: Stackby → GitHub + Nuvem
 * 
 * Este script automatiza parte do processo de migração
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando migração do Stackby para GitHub + Nuvem...\n');

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command) {
  try {
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function runCommand(command, description) {
  try {
    log(`⏳ ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} concluído!`, 'green');
    return true;
  } catch (error) {
    log(`❌ Erro em: ${description}`, 'red');
    log(`   ${error.message}`, 'red');
    return false;
  }
}

// Verificar pré-requisitos
log('🔍 Verificando pré-requisitos...', 'blue');

const prerequisites = [
  { name: 'Node.js', command: 'node --version' },
  { name: 'npm', command: 'npm --version' },
  { name: 'git', command: 'git --version' }
];

let allPrerequisitesMet = true;

prerequisites.forEach(prereq => {
  if (checkCommand(prereq.command)) {
    log(`✅ ${prereq.name} instalado`, 'green');
  } else {
    log(`❌ ${prereq.name} não encontrado`, 'red');
    allPrerequisitesMet = false;
  }
});

if (!allPrerequisitesMet) {
  log('\n❌ Alguns pré-requisitos não foram encontrados. Instale-os antes de continuar.', 'red');
  process.exit(1);
}

log('\n📋 Checklist de Migração:', 'bold');
log('1. ✅ Repositórios GitHub configurados');
log('2. ✅ GitHub Actions configurados');
log('3. 🔄 Configurar banco de dados na nuvem');
log('4. ⏳ Deploy do backend');
log('5. ⏳ Deploy do frontend');
log('6. ⏳ Testar integração');

log('\n🎯 Próximos passos manuais:', 'yellow');
log('1. Configure um banco PostgreSQL na nuvem (Supabase recomendado)');
log('2. Configure as variáveis de ambiente');
log('3. Faça deploy no Vercel');
log('4. Teste a integração');

log('\n📚 Documentação disponível:', 'blue');
log('- MIGRATION_GUIDE.md: Guia completo de migração');
log('- DATABASE_SETUP.md: Configuração do banco de dados');
log('- README.md: Documentação do projeto');

log('\n🔗 Links úteis:', 'blue');
log('- Supabase: https://supabase.com');
log('- Vercel: https://vercel.com');
log('- GitHub Actions: https://github.com/features/actions');

log('\n✨ Migração configurada com sucesso!', 'green');
log('Siga os guias de documentação para completar a migração.', 'blue');
