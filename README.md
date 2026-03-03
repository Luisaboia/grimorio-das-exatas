# 📐 Fórmulas IFPR

Catálogo web completo de fórmulas de **Matemática** e **Física** para estudo e consulta. Renderização LaTeX bonita com KaTeX, busca instantânea, design responsivo e moderno.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)

## ✨ Features

- 📚 **62+ fórmulas** de Matemática e Física com explicações detalhadas
- 🧮 **Renderização KaTeX** — fórmulas LaTeX bonitas e nítidas
- 🔍 **Busca instantânea** — Command Palette com `Ctrl+K`
- 🌙 **Dark mode** com persistência
- 📱 **Responsivo** — mobile, tablet e desktop
- 🗂️ **Categorias organizadas** — navegação por sidebar e filtros
- ⚡ **SSG** — páginas pré-renderizadas para performance máxima
- 🔗 **SEO** — sitemap, robots.txt, JSON-LD, Open Graph

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas (App Router)
│   ├── formula/[slug]/     # Página de detalhe da fórmula
│   ├── formulas/           # Catálogo e filtros
│   ├── busca/              # Página de busca
│   └── api/search/         # API de busca
├── components/
│   ├── ui/                 # Button, Card, Badge, Input, Skeleton
│   ├── layout/             # Header, Sidebar, Footer, MobileNav, Breadcrumbs
│   ├── formulas/           # FormulaCard, FormulaGrid, MDXContent, KaTeX
│   └── search/             # CommandPalette, SearchBar, SearchResults
├── content/
│   ├── fisica/             # 33 fórmulas de Física (MDX)
│   └── matematica/         # 29 fórmulas de Matemática (MDX)
├── lib/                    # mdx.ts, search.ts, supabase.ts, categories.ts
└── types/                  # TypeScript types
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- npm 9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/your-username/fisica-ifpr-app.git
cd fisica-ifpr-app

# Instale as dependências
npm install

# Configure as variáveis de ambiente (opcional — app funciona sem Supabase)
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase (se tiver)

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Verifica erros de lint |
| `npm test` | Executa testes |

## 📝 Como Adicionar Novas Fórmulas

1. Crie um arquivo `.mdx` em `src/content/fisica/` ou `src/content/matematica/`
2. Adicione o frontmatter:

```yaml
---
title: "Nome da Fórmula"
slug: "nome-da-formula"
category: "fisica"           # ou "matematica"
subcategory: "cinematica"    # slug da subcategoria
tags: ["tag1", "tag2"]
difficulty: "basico"         # basico | intermediario | avancado
description: "Descrição breve"
formula_preview: "F = m \\cdot a"
---
```

3. Use os componentes MDX disponíveis:
   - `<FormulaBlock math="LaTeX" label="Nome" />` — fórmula em destaque
   - `<Formula math="LaTeX" />` — fórmula inline
   - `<Variable symbol="F" description="Força" unit="N" />` — variável
   - `<Example title="Título">...</Example>` — exemplo
   - `<Note type="tip|info|warning">...</Note>` — nota/dica

4. Execute `npm run build` para verificar que compila corretamente

Veja o guia completo em [CONTRIBUTING.md](CONTRIBUTING.md).

## 🏗️ Stack Técnica

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, SSG)
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Renderização LaTeX**: [react-katex](https://github.com/talyssonoc/react-katex) + [KaTeX](https://katex.org/)
- **Conteúdo**: [MDX](https://mdxjs.com/) via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL) — opcional
- **Testes**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Deploy**: [Vercel](https://vercel.com/)

## 🏛️ Arquitetura

- Fórmulas escritas em **MDX** com frontmatter (`src/content/`)
- Listagem e busca usam os metadados do MDX (filesystem)
- **Supabase é opcional** — se configurado, habilita busca full-text em português
- Páginas pré-renderizadas como **SSG** para performance máxima
- **Server Components** por padrão; Client Components apenas para interatividade

## 📄 Licença

MIT © Fórmulas IFPR
