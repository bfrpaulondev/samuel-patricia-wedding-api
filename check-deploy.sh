#!/bin/bash

echo "🔍 Verificando configuração do projeto antes do deploy..."

# Verificar se existe package.json
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado!"
    exit 1
fi

# Verificar scripts necessários
if ! grep -q '"build"' package.json; then
    echo "❌ Erro: script 'build' não encontrado no package.json!"
    exit 1
fi

if ! grep -q '"start"' package.json; then
    echo "❌ Erro: script 'start' não encontrado no package.json!"
    exit 1
fi

# Verificar tsconfig.json
if [ ! -f "tsconfig.json" ]; then
    echo "❌ Erro: tsconfig.json não encontrado!"
    exit 1
fi

# Verificar estrutura src/
if [ ! -d "src" ]; then
    echo "❌ Erro: diretório 'src' não encontrado!"
    exit 1
fi

if [ ! -f "src/index.ts" ]; then
    echo "❌ Erro: src/index.ts não encontrado!"
    exit 1
fi

# Verificar .env.example
if [ ! -f ".env.example" ]; then
    echo "⚠️  Aviso: .env.example não encontrado (recomendado)"
fi

# Testar build local
echo "📦 Testando build local..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro: Build falhou!"
    exit 1
fi

# Verificar se dist foi criado
if [ ! -d "dist" ]; then
    echo "❌ Erro: diretório 'dist' não foi criado pelo build!"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    echo "❌ Erro: dist/index.js não foi criado pelo build!"
    exit 1
fi

echo "✅ Todas as verificações passaram!"
echo "✅ Projeto pronto para deploy no Render!"
echo ""
echo "📝 Lembre-se de configurar as variáveis de ambiente:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - JWT_EXPIRES_IN"
echo "   - NODE_ENV"
echo "   - PORT"
echo "   - CORS_ORIGIN"
echo "   - ADMIN_USERNAME"
echo "   - ADMIN_EMAIL"
echo "   - ADMIN_PASSWORD"

exit 0
