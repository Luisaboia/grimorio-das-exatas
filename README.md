# 📐 Grimório das Exatas

Catálogo web completo de fórmulas de **Matemática** e **Física** para estudo e consulta. Renderização LaTeX bonita com KaTeX, gráficos interativos com Mafs, busca instantânea, design responsivo e moderno.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)

## ✨ Features

- 📚 **62+ fórmulas** de Matemática e Física com explicações detalhadas
- 🧮 **Renderização KaTeX** — fórmulas LaTeX bonitas e nítidas
- 📊 **15 gráficos interativos** — visualizações com sliders e pontos arrastáveis via [Mafs](https://mafs.dev)
- 🔍 **Busca instantânea** — Command Palette com `Ctrl+K`
- 🌙 **Dark mode** com persistência
- 📱 **Responsivo** — mobile, tablet e desktop
- 🗂️ **Categorias organizadas** — navegação por sidebar e filtros
- ⚡ **SSG** — páginas pré-renderizadas para performance máxima
- 📖 **Demonstrações** — deduções passo a passo e contexto histórico para cada fórmula
- 🔗 **SEO** — sitemap, robots.txt, JSON-LD, Open Graph
- ♿ **Acessibilidade** — `role="img"` e `aria-label` nos gráficos, sliders com labels acessíveis

## 📊 Gráficos Interativos

15 fórmulas possuem visualizações interativas embarcadas diretamente no conteúdo MDX. O aluno pode manipular parâmetros via sliders e arrastar pontos no plano cartesiano, visualizando em tempo real como as fórmulas se comportam.

| Categoria | Gráficos |
|-----------|----------|
| Trigonometria | Círculo unitário, Identidades fundamentais, Fórmulas de adição |
| Cálculo | Derivada (reta tangente), Integral (Riemann), Limite |
| Cinemática | MRU, MRUV, Queda livre |
| Geometria Analítica | Equação da reta, Coeficiente angular, Distância entre pontos, Circunferência |
| Álgebra | Bhaskara (parábola com raízes) |
| Dinâmica | Segunda Lei de Newton (F = ma) |

Os gráficos usam **code splitting** (`React.lazy` + `Suspense`) para não impactar o carregamento inicial das páginas.

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
│   ├── graphs/             # Gráficos interativos (Mafs)
│   │   ├── Graph.tsx       # Entry point MDX (lazy loading)
│   │   ├── GraphContainer.tsx  # Wrapper com theming escuro
│   │   ├── registry.ts    # Mapa slug → componente (15 gráficos)
│   │   ├── controls/       # Slider, ValueDisplay
│   │   └── formulas/       # Implementações por categoria
│   │       ├── trigonometria/
│   │       ├── calculo/
│   │       ├── cinematica/
│   │       ├── geometria-analitica/
│   │       ├── algebra/
│   │       └── dinamica/
│   └── search/             # CommandPalette, SearchBar, SearchResults
├── content/
│   ├── fisica/             # 33 fórmulas de Física (MDX)
│   ├── matematica/         # 29 fórmulas de Matemática (MDX)
│   └── demonstracoes/      # Deduções passo a passo (MDX)
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
git clone https://github.com/Luisaboia/grimorio-das-exatas.git
cd grimorio-das-exatas

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
| `npm test` | Executa testes (87 testes) |

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
   - `<Graph type="slug-da-formula" />` — gráfico interativo (se registrado)

4. Execute `npm run build` para verificar que compila corretamente

Veja o guia completo em [CONTRIBUTING.md](CONTRIBUTING.md).

## 🏗️ Stack Técnica

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, SSG)
- **Linguagem**: [TypeScript 5](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Renderização LaTeX**: [react-katex](https://github.com/talyssonoc/react-katex) + [KaTeX](https://katex.org/)
- **Gráficos Interativos**: [Mafs](https://mafs.dev/) (visualização matemática com SVG)
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
- **Gráficos interativos** carregados via `React.lazy()` + `Suspense` — code splitting automático
- **Tema escuro** com cores oklch de alto contraste para gráficos e fórmulas

## 📄 Licença

MIT © Grimório das Exatas
