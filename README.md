# Fórmulas IFPR

Catálogo web de fórmulas de **Matemática** e **Física** para alunos e professores do IFPR. Apresenta cards visuais com renderização LaTeX, navegação por categorias, busca instantânea e design mobile-first.

## Tech Stack

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **ESLint** + **Prettier** (com `prettier-plugin-tailwindcss`)
- **Supabase** (PostgreSQL) para metadados
- **MDX** para conteúdo de fórmulas
- **KaTeX** para renderização LaTeX

## Pré-requisitos

- Node.js 20+
- npm 10+

## Setup

1. Clone o repositório:

   ```bash
   git clone <repo-url>
   cd fisica-ifpr-app
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   ```bash
   cp .env.local.example .env.local
   ```

   Edite `.env.local` com suas credenciais do Supabase.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Comando          | Descrição                         |
| ---------------- | --------------------------------- |
| `npm run dev`    | Servidor de desenvolvimento       |
| `npm run build`  | Build de produção                 |
| `npm run start`  | Inicia o servidor de produção     |
| `npm run lint`   | Executa o ESLint                  |

## Estrutura de pastas

```
src/
  app/              # Rotas (App Router)
  components/
    ui/             # Componentes base de UI
    layout/         # Header, Footer, Sidebar, MobileNav
    formulas/       # FormulaCard, FormulaGrid, FormulaDetail
    search/         # SearchBar, SearchResults
  lib/              # Utilitários, helpers, config
  content/
    matematica/     # Arquivos MDX de Matemática
    fisica/         # Arquivos MDX de Física
  types/            # Interfaces TypeScript
  styles/           # CSS global, tokens customizados
```

## Licença

Projeto interno IFPR.
