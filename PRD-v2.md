# Feature: Grimório das Exatas — Ajustes de Layout, Filtros e Rebrand

## Overview

Conjunto de ajustes no projeto atual para corrigir bugs, simplificar o tema visual e atualizar a identidade do projeto. São 4 frentes: (1) corrigir os filtros de dificuldade que não funcionam, (2) remover o sistema de alternância de tema e fixar o modo escuro como único, (3) substituir o link de GitHub no footer por uma página "Sobre" funcional, e (4) renomear todo o projeto de "Fórmulas IFPR" para **"Grimório das Exatas"**.

## Success Criteria

- [ ] Todas as tasks completas
- [ ] Build de produção sem erros (`npm run build`)
- [ ] Lint sem erros (`npm run lint`)
- [ ] Testes passando (`npm test`)
- [ ] Filtros de dificuldade funcionando em `/formulas` e nas páginas de categoria/subcategoria
- [ ] Aplicação 100% em dark mode, sem toggle, sem flash de tema claro
- [ ] Página `/sobre` acessível e renderizando conteúdo
- [ ] Nenhuma ocorrência de "Fórmulas IFPR" no código-fonte (exceto PRD.md histórico)

---

## Tasks

### Task-001: Corrigir Filtros de Dificuldade

**Priority**: High
**Estimated Iterations**: 2-3

Os chips de filtro "Básico", "Intermediário" e "Avançado" na página `/formulas` navegam para `/formulas?dificuldade=basico` (etc.), mas a `FormulasPage` em `src/app/formulas/page.tsx` **não lê o search param `dificuldade`** e exibe todas as fórmulas sem filtrar. Além disso, o `active` dos chips de dificuldade está hardcoded como `false`, então nunca mostram estado ativo.

O filtro de dificuldade também não aparece nas páginas de categoria (`/formulas/[category]`) nem subcategoria (`/formulas/[category]/[subcategory]`).

**Causa raiz**:
- `src/app/formulas/page.tsx` — `FormulasPage` não recebe `searchParams`, não filtra `frontmatters` por `dificuldade`
- `src/components/formulas/CategoryFilter.tsx` — chips de dificuldade têm `active={false}` hardcoded e não recebem o valor atual; filtro só aparece quando `!currentCategory`

**Acceptance Criteria**:

- [ ] `FormulasPage` (`src/app/formulas/page.tsx`) lê `searchParams.dificuldade` e filtra a lista de fórmulas
- [ ] Páginas de categoria (`src/app/formulas/[category]/page.tsx`) e subcategoria (`src/app/formulas/[category]/[subcategory]/page.tsx`) também suportam `?dificuldade=` e filtram as fórmulas
- [ ] `CategoryFilter` recebe a prop `currentDifficulty` e destaca o chip ativo corretamente
- [ ] Filtros de dificuldade aparecem em **todas** as páginas de catálogo (não só na raiz `/formulas`)
- [ ] Os links dos chips de dificuldade preservam a rota atual (ex: `/formulas/fisica?dificuldade=basico` dentro da categoria Física)
- [ ] Chip "Todas" (ou estado sem filtro) limpa o query param de dificuldade
- [ ] O chip ativo muda de estilo visual (estado selecionado)

**Arquivos a modificar**:
- `src/app/formulas/page.tsx` — ler `searchParams`, filtrar fórmulas, passar `currentDifficulty` ao `CategoryFilter`
- `src/app/formulas/[category]/page.tsx` — idem
- `src/app/formulas/[category]/[subcategory]/page.tsx` — idem
- `src/components/formulas/CategoryFilter.tsx` — adicionar prop `currentDifficulty`, adicionar prop `basePath` (para gerar os hrefs corretos), corrigir `active` dos chips, mostrar filtros de dificuldade em todas as views

**Verification**:

```bash
npm run build
npm run lint
# Teste manual:
# 1. Acessar /formulas → clicar em "Básico" → somente fórmulas básicas aparecem, chip fica ativo
# 2. Acessar /formulas/fisica → clicar em "Avançado" → somente fórmulas avançadas de Física
# 3. Clicar no chip ativo novamente (ou "Todas") → filtro removido, todas as fórmulas voltam
```

---

### Task-002: Fixar Modo Escuro como Único Tema

**Priority**: High
**Estimated Iterations**: 2-3

Remover completamente o sistema de alternância light/dark. A aplicação deve usar **apenas o modo escuro**, sem toggle, sem ThemeProvider, sem script anti-flash, sem variantes `dark:` desnecessárias no Tailwind.

**Acceptance Criteria**:

- [ ] Classe `dark` fixada permanentemente no `<html>` em `src/app/layout.tsx`
- [ ] `ThemeProvider` removido de `src/app/layout.tsx` (arquivo `ThemeProvider.tsx` deletado)
- [ ] `ThemeToggle` removido do `Header.tsx` (arquivo `ThemeToggle.tsx` deletado)
- [ ] Script inline anti-flash de tema removido do `layout.tsx`
- [ ] Em **todos** os componentes: remover as variantes `dark:` e manter apenas os estilos do dark mode como estilos padrão. Exemplo:
  - `bg-surface-50 dark:bg-surface-950` → `bg-surface-950`
  - `text-surface-800 dark:text-surface-50` → `text-surface-50`
  - `border-surface-200 dark:border-surface-800` → `border-surface-800`
- [ ] Página `/dev/components` atualizada (remover showcase de tema toggle)
- [ ] Nenhuma referência a `useTheme`, `ThemeProvider`, `ThemeToggle`, `toggleTheme` restante no código
- [ ] Testes existentes que importem ThemeProvider/ThemeToggle atualizados ou removidos
- [ ] Visual final: fundo escuro, texto claro, cards com superfícies escuras — sem nenhum flash claro

**Arquivos a deletar**:
- `src/components/layout/ThemeProvider.tsx`
- `src/components/layout/ThemeToggle.tsx`

**Arquivos a modificar** (todos os que contêm `dark:`):
- `src/app/layout.tsx` — remover ThemeProvider, fixar `<html className="dark">`
- `src/components/layout/Header.tsx` — remover ThemeToggle
- `src/components/layout/Footer.tsx` — simplificar classes
- `src/components/layout/Sidebar.tsx` — simplificar classes
- `src/components/layout/MobileNav.tsx` — simplificar classes
- `src/components/layout/Breadcrumbs.tsx` — simplificar classes
- `src/components/layout/index.ts` — remover exports
- `src/components/ui/Button.tsx` — simplificar classes
- `src/components/ui/Card.tsx` — simplificar classes
- `src/components/ui/Badge.tsx` — simplificar classes
- `src/components/ui/Input.tsx` — simplificar classes
- `src/components/ui/Skeleton.tsx` — simplificar classes
- `src/components/formulas/*.tsx` — simplificar classes (FormulaCard, FormulaGrid, FormulaBlock, Formula, Variable, Example, Note, MDXContent, CategoryFilter, RelatedFormulas, FormulaNavigation, TableOfContents)
- `src/components/search/*.tsx` — simplificar classes (CommandPalette, SearchBar, SearchResults)
- `src/app/page.tsx`, `src/app/HeroSearch.tsx` — simplificar classes
- `src/app/formulas/**/*.tsx` — simplificar classes
- `src/app/busca/page.tsx` — simplificar classes
- `src/app/formula/[slug]/page.tsx` — simplificar classes
- `src/app/dev/components/page.tsx` — remover showcase de toggle, simplificar
- `src/app/globals.css` — simplificar tokens de tema

**Verification**:

```bash
npm run build
npm run lint
npm test
# grep -r "dark:" src/ → zero resultados
# grep -r "ThemeProvider\|ThemeToggle" src/ → zero resultados
```

---

### Task-003: Criar Página "Sobre" e Remover Link GitHub

**Priority**: Medium
**Estimated Iterations**: 1-2

Remover o link externo para GitHub do footer e criar uma página `/sobre` com informações sobre o projeto.

**Acceptance Criteria**:

- [ ] Link "GitHub" removido do `Footer.tsx` (manter apenas link "Sobre")
- [ ] Página `src/app/sobre/page.tsx` criada com:
  - Título: "Sobre o Grimório das Exatas"
  - Descrição do projeto (catálogo de fórmulas de Matemática e Física)
  - Propósito e público-alvo (alunos e professores)
  - Lista de tecnologias utilizadas (Next.js, TypeScript, Tailwind, KaTeX, MDX, Supabase)
  - Informações de créditos
  - Design consistente com o resto da app (modo escuro, usando componentes existentes — Card, Badge)
- [ ] Metadata SEO na página (`title`, `description`, `openGraph`)
- [ ] Breadcrumbs: Home > Sobre

**Arquivos a criar**:
- `src/app/sobre/page.tsx`

**Arquivos a modificar**:
- `src/components/layout/Footer.tsx` — remover link GitHub

**Verification**:

```bash
npm run build   # Rota /sobre gerada
npm run lint
# Acessar /sobre — conteúdo renderizado, breadcrumbs funcionando
# Footer: apenas link "Sobre", sem "GitHub"
```

---

### Task-004: Renomear Projeto para "Grimório das Exatas"

**Priority**: High
**Estimated Iterations**: 1-2

Substituir **todas** as ocorrências de "Fórmulas IFPR" por "Grimório das Exatas" em toda a codebase.

**Ocorrências conhecidas (16+)**:

| Arquivo | Linha | Contexto |
|---------|-------|----------|
| `src/app/layout.tsx` | 23 | metadata title default |
| `src/app/layout.tsx` | 24 | metadata title template |
| `src/app/layout.tsx` | 30 | openGraph title |
| `src/app/layout.tsx` | 35 | openGraph siteName |
| `src/components/layout/Header.tsx` | 36 | logo text |
| `src/components/layout/MobileNav.tsx` | 58 | logo text |
| `src/components/layout/Footer.tsx` | 8 | copyright text |
| `src/components/layout/JsonLd.tsx` | 21 | author name |
| `src/components/layout/JsonLd.tsx` | 25 | publisher name |
| `src/app/formulas/page.tsx` | 13 | openGraph title |
| `src/app/formula/[slug]/page.tsx` | 176 | openGraph title |
| `README.md` | 1 | título |
| `README.md` | 128 | licença |
| `CONTRIBUTING.md` | 1 | título |
| `CHANGELOG.md` | — | menções |

**Acceptance Criteria**:

- [ ] Todas as ocorrências de "Fórmulas IFPR" substituídas por "Grimório das Exatas"
- [ ] Hero da home page (`src/app/page.tsx`) atualizado com novo título/subtítulo
- [ ] `package.json` campo `name` atualizado para `grimorio-das-exatas`
- [ ] Metadata `keywords` em `layout.tsx` atualizada (adicionar "grimório", "exatas")
- [ ] `layout.tsx` description atualizada para refletir novo nome
- [ ] Nenhuma ocorrência restante de "Fórmulas IFPR" no código (exceto PRD antigo)

**Verification**:

```bash
npm run build
npm run lint
# grep -r "Fórmulas IFPR" src/ → zero resultados
# Visual: Header mostra "Grimório das Exatas", Footer mostra "Grimório das Exatas © 2026"
```

---

## Technical Constraints

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Tema**: Modo escuro único (sem alternância)
- **Testes**: Jest + React Testing Library (testes existentes devem continuar passando)

## Architecture Notes

- As páginas de catálogo são **Server Components** — o filtro de dificuldade via `searchParams` é lido no server side
- O `CategoryFilter` é **Client Component** — gera `<Link>` tags com os query params corretos, sem precisar de estado local para filtrar
- A remoção das variantes `dark:` do Tailwind é mecânica mas volumosa — deve ser feita com cuidado para preservar o visual escuro e não quebrar o contraste
- A página "Sobre" é um Server Component estático simples

## Out of Scope

- Alterar as fórmulas MDX existentes
- Alterar o schema do Supabase ou seed SQL
- Adicionar novas funcionalidades além das listadas
- Alterar a lógica de busca
- Refatorar arquitetura ou adicionar novas dependências
