# Feature: Fórmulas IFPR — Catálogo de Fórmulas de Matemática e Física

## Overview

Aplicação web de referência (estilo wiki/cheatsheet) que organiza, exibe e permite buscar fórmulas de **Matemática** e **Física** com renderização LaTeX bonita e responsiva. O conteúdo é armazenado em arquivos MDX e os metadados/índice ficam no Supabase (PostgreSQL). Não há autenticação de usuários neste MVP — o acesso é 100% público.

O objetivo é oferecer a alunos e professores um catálogo consultivo moderno, com cards visuais, navegação por categorias, busca instantânea e design mobile-first.

## Success Criteria

- [ ] Todas as tasks completas e verificadas
- [ ] Todos os testes passando (`npm test`)
- [ ] Build de produção sem erros (`npm run build`)
- [ ] Lighthouse Performance ≥ 80, Accessibility ≥ 90
- [ ] Responsivo funcionando em mobile, tablet e desktop
- [ ] Renderização KaTeX correta em todos os cards de fórmulas
- [ ] Busca retornando resultados relevantes em < 300ms
- [ ] Sem blockers ou warnings críticos no console

---

## Tasks

### Task-001: Inicialização do Projeto Next.js

**Priority**: Critical
**Estimated Iterations**: 1-2

Criar o projeto Next.js com App Router, configurar Tailwind CSS v4, TypeScript, ESLint, Prettier e a estrutura de pastas padrão.

**Acceptance Criteria**:

- [ ] Projeto Next.js 15+ criado com `create-next-app` (App Router, TypeScript, Tailwind CSS, ESLint)
- [ ] Tailwind CSS v4 configurado e funcional
- [ ] Prettier configurado com plugin para Tailwind (ordenação de classes)
- [ ] Estrutura de pastas organizada:
  ```
  src/
    app/              # Rotas (App Router)
    components/       # Componentes reutilizáveis
      ui/             # Componentes de UI base (Button, Card, Badge, etc.)
      layout/         # Header, Footer, Sidebar, MobileNav
      formulas/       # FormulaCard, FormulaGrid, FormulaDetail
      search/         # SearchBar, SearchResults
    lib/              # Utilitários, helpers, config
    content/          # Arquivos MDX com fórmulas
      matematica/     # MDX de Matemática
      fisica/         # MDX de Física
    types/            # TypeScript interfaces e types
    styles/           # CSS global e tokens customizados
  ```
- [ ] Arquivo `tsconfig.json` com path aliases (`@/` → `src/`)
- [ ] `.env.local.example` com variáveis de ambiente documentadas
- [ ] README.md inicial com instruções de setup

**Verification**:

```bash
npm run dev     # Dev server inicia sem erros
npm run build   # Build de produção completa sem erros
npm run lint    # Zero warnings/errors
```

---

### Task-002: Design System e Componentes UI Base

**Priority**: Critical
**Estimated Iterations**: 2-3

Criar o design system com Tailwind CSS: tokens de cor, tipografia, e componentes UI base reutilizáveis com visual moderno e fluido.

**Acceptance Criteria**:

- [ ] Paleta de cores definida no Tailwind config (cores primárias, secundárias, accent, superfícies)
- [ ] Suporte a **dark mode** (class strategy) com toggle funcional
- [ ] Tipografia configurada (fonte sans: Inter ou Geist; fonte mono: JetBrains Mono para código)
- [ ] Componentes UI base criados:
  - `Button` — variantes: primary, secondary, ghost, outline
  - `Card` — com hover effects suaves, sombras, bordas arredondadas
  - `Badge` — para tags de categoria (Física, Matemática, subtemas)
  - `Input` — estilizado para barra de busca
  - `Skeleton` — loading placeholder animado
- [ ] Todos os componentes são responsivos (mobile-first)
- [ ] Animações suaves com `transition` e `hover:` do Tailwind
- [ ] Gradientes sutis nos cards (glassmorphism leve ou gradientes de superfície)

**Verification**:

```bash
npm run build   # Build sem erros
npm run lint    # Sem warnings
# Verificação visual: abrir /dev/components (página de showcase temporária) e conferir todos os componentes em light/dark mode
```

---

### Task-003: Layout Principal e Navegação

**Priority**: Critical
**Estimated Iterations**: 2-3

Criar o layout responsivo da aplicação: header, navegação lateral/mobile, footer e estrutura de páginas.

**Acceptance Criteria**:

- [ ] **Header** fixo no topo com:
  - Logo/nome da aplicação ("Fórmulas IFPR" ou similar)
  - Barra de busca integrada (desktop)
  - Toggle dark mode
  - Menu hamburger (mobile)
- [ ] **Sidebar** (desktop ≥ 1024px):
  - Navegação por categorias (Matemática, Física)
  - Subcategorias expansíveis (accordion)
  - Indicador visual da seção ativa
- [ ] **Mobile Navigation**:
  - Menu drawer/slide deslizante
  - Barra de busca acessível
  - Navegação por categorias em lista
- [ ] **Footer** com créditos e links úteis
- [ ] **Breadcrumbs** para navegação contextual em páginas internas
- [ ] Layout `(root)/layout.tsx` com metadata SEO padrão
- [ ] Página inicial (`/`) com hero section e acesso rápido às categorias

**Verification**:

```bash
npm run build
# Testar responsividade: Chrome DevTools → dispositivos (iPhone SE, iPad, Desktop)
# Verificar: sidebar colapsa em mobile, menu hamburger funciona, busca acessível em ambos
```

---

### Task-004: Configuração MDX e Renderização KaTeX

**Priority**: Critical
**Estimated Iterations**: 2-3

Configurar o pipeline MDX (next-mdx-remote ou @next/mdx) para carregar conteúdo de fórmulas, e integrar react-katex para renderização matemática.

**Acceptance Criteria**:

- [ ] Dependências instaladas: `next-mdx-remote`, `react-katex`, `katex`
- [ ] Pipeline MDX configurado para carregar arquivos `.mdx` de `src/content/`
- [ ] Componentes MDX customizados mapeados:
  - `<Formula>` — renderiza LaTeX inline ou em bloco com KaTeX
  - `<FormulaBlock>` — bloco destacado com fundo, borda e cópia
  - `<Variable>` — destaca e explica variáveis da fórmula
  - `<Example>` — seção de exemplo de aplicação
  - `<Note>` — callout informativo (dica, aviso, importante)
- [ ] CSS do KaTeX importado globalmente (ou via componente)
- [ ] Renderização LaTeX funcional tanto inline (`$E = mc^2$`) quanto em bloco (`$$...$$`)
- [ ] Frontmatter dos MDX definido com schema:
  ```yaml
  title: "Segunda Lei de Newton"
  slug: "segunda-lei-newton"
  category: "fisica"
  subcategory: "dinamica"
  tags: ["força", "massa", "aceleração"]
  difficulty: "basico"      # basico | intermediario | avancado
  description: "Relação entre força, massa e aceleração"
  formula_preview: "F = m \\cdot a"
  ```
- [ ] Função utilitária `getFormulaBySlug(slug)` e `getAllFormulas()` para carregar MDX
- [ ] Pelo menos 2 fórmulas de exemplo criadas e renderizando corretamente

**Verification**:

```bash
npm run build   # Build com MDX sem erros
npm run dev     # Navegar até uma fórmula e verificar renderização KaTeX
# Verificar: fórmulas LaTeX renderizadas, variáveis explicadas, exemplos visíveis
```

---

### Task-005: Integração Supabase — Schema e Seed

**Priority**: High
**Estimated Iterations**: 2-3

Configurar o Supabase como banco de dados para metadados, busca full-text e analytics básicas. Criar o schema e popular com dados iniciais.

**Acceptance Criteria**:

- [ ] Supabase Client configurado em `src/lib/supabase.ts` (client-side e server-side)
- [ ] Variáveis de ambiente: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Schema SQL criado (`supabase/migrations/001_initial_schema.sql`):
  ```sql
  -- Categorias (Matemática, Física)
  categories (id, name, slug, icon, description, parent_id, order)

  -- Fórmulas (metadados — conteúdo fica no MDX)
  formulas (
    id, title, slug, description, formula_preview,
    category_id, subcategory, difficulty,
    tags[], mdx_path, is_published,
    created_at, updated_at
  )

  -- Busca full-text
  CREATE INDEX formulas_search_idx ON formulas
    USING GIN(to_tsvector('portuguese', title || ' ' || description || ' ' || array_to_string(tags, ' ')));
  ```
- [ ] RLS (Row Level Security) configurado — leitura pública, escrita restrita
- [ ] Seed com categorias e subcategorias completas:
  - **Matemática**: Álgebra, Geometria, Trigonometria, Geometria Analítica, Cálculo, Estatística
  - **Física**: Cinemática, Dinâmica, Estática, Trabalho e Energia, Termodinâmica, Óptica, Ondulatória, Eletrostática, Eletrodinâmica, Eletromagnetismo
- [ ] Seed com metadados das fórmulas (sincronizado com os arquivos MDX existentes)
- [ ] Função helper `searchFormulas(query)` com busca full-text em português
- [ ] Types TypeScript gerados automaticamente ou manualmente para as tabelas

**Verification**:

```bash
# Executar migration no Supabase
npx supabase db push          # ou via Dashboard
# Verificar seed
npx supabase db seed
# Testar busca
npm run dev  # Testar busca por "Newton" retorna resultados
```

---

### Task-006: Catálogo de Fórmulas — Listagem e Cards

**Priority**: High
**Estimated Iterations**: 3-4

Implementar as páginas de listagem de fórmulas com grid de cards visuais, filtros por categoria e paginação.

**Acceptance Criteria**:

- [ ] Rota `/formulas` — página principal do catálogo com grid de cards
- [ ] Rota `/formulas/[category]` — fórmulas filtradas por categoria (ex: `/formulas/fisica`)
- [ ] Rota `/formulas/[category]/[subcategory]` — filtro por subcategoria
- [ ] **FormulaCard** component:
  - Preview da fórmula em KaTeX (campo `formula_preview`)
  - Título da fórmula
  - Badge de categoria com cor correspondente
  - Badge de dificuldade (básico=verde, intermediário=amarelo, avançado=vermelho)
  - Hover effect com elevação e escala sutil
  - Link para página de detalhe
- [ ] **FormulaGrid** component:
  - Grid responsivo: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
  - Animação de entrada (fade-in escalonado)
  - Estado de loading com Skeletons
  - Estado vazio ("Nenhuma fórmula encontrada")
- [ ] Filtros visuais por:
  - Categoria (tabs ou chips)
  - Dificuldade (botões de toggle)
- [ ] Dados carregados via Server Components (SSR/SSG) do Supabase
- [ ] Metadata SEO dinâmica por categoria

**Verification**:

```bash
npm run build
npm run dev
# Navegar para /formulas — ver grid de cards
# Clicar em uma categoria — filtro aplicado
# Testar responsividade em diferentes breakpoints
# Verificar KaTeX renderizado nos cards
```

---

### Task-007: Página de Detalhe da Fórmula

**Priority**: High
**Estimated Iterations**: 2-3

Implementar a página de detalhe que renderiza o conteúdo MDX completo de uma fórmula.

**Acceptance Criteria**:

- [ ] Rota `/formula/[slug]` — página de detalhe
- [ ] Conteúdo MDX renderizado com todos os componentes customizados
- [ ] Layout da página de detalhe:
  - Breadcrumb (Home > Física > Dinâmica > Segunda Lei de Newton)
  - Título com badge de categoria
  - Fórmula principal em destaque (bloco grande com KaTeX)
  - Explicação das variáveis em lista/tabela
  - Exemplos de aplicação
  - Notas e dicas
- [ ] **Botão "Copiar fórmula"** — copia o LaTeX para a área de transferência
- [ ] Navegação lateral (table of contents) para fórmulas longas
- [ ] Links "Fórmula anterior" / "Próxima fórmula" na mesma subcategoria
- [ ] Metadata SEO por fórmula (title, description, og:image com fórmula)
- [ ] Componente de "Fórmulas relacionadas" no final (mesma subcategoria)
- [ ] Loading state com Skeleton enquanto MDX carrega

**Verification**:

```bash
npm run build
npm run dev
# Acessar /formula/segunda-lei-newton — conteúdo renderizado
# Verificar: KaTeX, variáveis, exemplos, breadcrumb, copiar fórmula
# Testar navegação entre fórmulas (anterior/próxima)
```

---

### Task-008: Sistema de Busca

**Priority**: High
**Estimated Iterations**: 2-3

Implementar busca instantânea (search-as-you-type) usando full-text search do Supabase.

**Acceptance Criteria**:

- [ ] **SearchBar** component:
  - Input com ícone de lupa e atalho de teclado (`Ctrl+K` / `Cmd+K`)
  - Debounce de 300ms no input
  - Dropdown de resultados com preview da fórmula
  - Highlight do termo buscado nos resultados
  - Suporte a busca por nome, tag, categoria
- [ ] **SearchResults** page (`/busca?q=...`):
  - Grid de cards com resultados
  - Contagem de resultados
  - Filtros por categoria e dificuldade
  - Estado vazio com sugestões
- [ ] **Command Palette** (modal `Ctrl+K`):
  - Input de busca centralizado (estilo Spotlight/VS Code)
  - Resultados instantâneos com navegação por teclado (↑↓ Enter)
  - Ações rápidas: ir para categoria, ir para fórmula
- [ ] Busca via Supabase full-text search (`to_tsquery('portuguese', ...)`)
- [ ] API Route `/api/search` para busca server-side
- [ ] Cache dos resultados (React Query ou SWR — opcional)

**Verification**:

```bash
npm run build
npm run dev
# Testar Ctrl+K — abre command palette
# Digitar "Newton" — resultados aparecem em tempo real
# Clicar em resultado — navega para /formula/[slug]
# Testar busca com termos em português: "força", "aceleração", "triângulo"
```

---

### Task-009: Conteúdo MDX — Fórmulas de Física

**Priority**: High
**Estimated Iterations**: 3-5

Criar os arquivos MDX com as fórmulas de Física organizadas por subcategoria.

**Acceptance Criteria**:

- [ ] **Cinemática** (mínimo 5 fórmulas):
  - Velocidade média, Equação horária posição (MRU), Equação horária posição (MRUV), Equação de Torricelli, Queda livre
- [ ] **Dinâmica** (mínimo 5 fórmulas):
  - Segunda Lei de Newton, Peso, Força de atrito, Força centrípeta, Força elástica (Hooke)
- [ ] **Trabalho e Energia** (mínimo 4 fórmulas):
  - Trabalho, Energia cinética, Energia potencial gravitacional, Potência
- [ ] **Termodinâmica** (mínimo 4 fórmulas):
  - Calor sensível, Calor latente, Dilatação linear, Equação de Clapeyron
- [ ] **Óptica** (mínimo 3 fórmulas):
  - Equação de Gauss (espelhos), Lei de Snell-Descartes, Equação do aumento
- [ ] **Ondulatória** (mínimo 3 fórmulas):
  - Velocidade de onda, Frequência, Efeito Doppler
- [ ] **Eletrostática** (mínimo 3 fórmulas):
  - Lei de Coulomb, Campo elétrico, Potencial elétrico
- [ ] **Eletrodinâmica** (mínimo 4 fórmulas):
  - Lei de Ohm, Potência elétrica, Resistores em série/paralelo, Energia elétrica
- [ ] **Eletromagnetismo** (mínimo 2 fórmulas):
  - Lei de Faraday, Força magnética
- [ ] Cada MDX com: frontmatter completo, fórmula principal, explicação de variáveis, pelo menos 1 exemplo numérico, unidades SI
- [ ] Seed do Supabase atualizado com metadados de todas as fórmulas

**Verification**:

```bash
npm run build   # MDX compila sem erros
npm run dev     # Navegar por /formulas/fisica e verificar todas as subcategorias
# Verificar renderização KaTeX em pelo menos 5 fórmulas aleatórias
# Confirmar: variáveis explicadas, exemplos com valores, unidades corretas
```

---

### Task-010: Conteúdo MDX — Fórmulas de Matemática

**Priority**: High
**Estimated Iterations**: 3-5

Criar os arquivos MDX com as fórmulas de Matemática organizadas por subcategoria.

**Acceptance Criteria**:

- [ ] **Álgebra** (mínimo 5 fórmulas):
  - Equação do 2º grau (Bhaskara), Produtos notáveis, Fatoração, Progressão Aritmética (PA), Progressão Geométrica (PG)
- [ ] **Geometria Plana** (mínimo 5 fórmulas):
  - Área do triângulo, Área do círculo, Teorema de Pitágoras, Perímetro, Área do trapézio
- [ ] **Geometria Espacial** (mínimo 4 fórmulas):
  - Volume da esfera, Volume do cilindro, Volume do cone, Volume do paralelepípedo
- [ ] **Trigonometria** (mínimo 5 fórmulas):
  - Lei dos senos, Lei dos cossenos, Identidades fundamentais, Seno/Cosseno/Tangente, Fórmulas de adição
- [ ] **Geometria Analítica** (mínimo 4 fórmulas):
  - Distância entre dois pontos, Equação da reta, Coeficiente angular, Equação da circunferência
- [ ] **Cálculo** (mínimo 3 fórmulas):
  - Limite, Derivada (regras básicas), Integral (regras básicas)
- [ ] **Estatística** (mínimo 3 fórmulas):
  - Média aritmética, Desvio padrão, Mediana
- [ ] Cada MDX com: frontmatter completo, fórmula principal, explicação de variáveis, pelo menos 1 exemplo numérico
- [ ] Seed do Supabase atualizado com metadados de todas as fórmulas

**Verification**:

```bash
npm run build
npm run dev     # Navegar por /formulas/matematica e verificar subcategorias
# Verificar renderização KaTeX em pelo menos 5 fórmulas aleatórias
# Confirmar: variáveis explicadas, exemplos com valores
```

---

### Task-011: SEO, Performance e Testes

**Priority**: Medium
**Estimated Iterations**: 2-3

Otimizar SEO, performance e adicionar testes automatizados básicos.

**Acceptance Criteria**:

- [ ] **SEO**:
  - `metadata` configurado em cada layout/page (title, description, og:image)
  - `sitemap.xml` gerado automaticamente (`next-sitemap` ou App Router metadata)
  - `robots.txt` configurado
  - Structured data (JSON-LD) para fórmulas (tipo `EducationalContent` ou `Article`)
  - Tags `<meta>` open graph para compartilhamento social
- [ ] **Performance**:
  - Imagens otimizadas com `next/image` (se houver)
  - Lazy loading de componentes pesados (KaTeX bundle)
  - Font optimization via `next/font`
  - Bundle analysis executado e otimizado (`@next/bundle-analyzer`)
- [ ] **Testes**:
  - Jest + React Testing Library configurados
  - Testes unitários para componentes: FormulaCard, SearchBar, Badge (mínimo 5 testes)
  - Teste de integração: pipeline MDX carrega e renderiza fórmula
  - Teste de busca: função `searchFormulas` retorna resultados corretos
- [ ] **Acessibilidade**:
  - Labels ARIA em componentes interativos
  - Navegação por teclado funcional
  - Contraste de cores adequado (WCAG AA)

**Verification**:

```bash
npm test                    # Todos os testes passam
npm run build               # Build sem erros
npx lighthouse http://localhost:3000 --output=json  # Scores: Perf ≥ 80, A11y ≥ 90
```

---

### Task-012: Deploy e Documentação Final

**Priority**: Medium
**Estimated Iterations**: 1-2

Preparar para deploy na Vercel e finalizar documentação.

**Acceptance Criteria**:

- [ ] Configuração de deploy Vercel:
  - `vercel.json` (se necessário)
  - Environment variables documentadas
  - Preview deployments funcionando
- [ ] README.md completo com:
  - Descrição do projeto
  - Screenshots / GIFs do app
  - Instruções de instalação e desenvolvimento local
  - Como adicionar novas fórmulas (guia de contribuição MDX)
  - Arquitetura e decisões técnicas
  - Stack e dependências
- [ ] `.env.local.example` atualizado com todas as variáveis
- [ ] Guia de contribuição para adicionar novas fórmulas MDX
- [ ] CHANGELOG.md inicial

**Verification**:

```bash
npm run build               # Build de produção sem erros
vercel --prod               # Deploy funcional
# Acessar URL de produção — app funcional
# Testar em dispositivo mobile real
```

---

## Technical Constraints

- **Language**: TypeScript (strict mode)
- **Framework**: Next.js 15+ (App Router)
- **Runtime**: Node.js 20+
- **Styling**: Tailwind CSS v4
- **Math Rendering**: react-katex + katex
- **Content**: MDX via next-mdx-remote
- **Database**: Supabase (PostgreSQL) — apenas metadados e busca
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Deploy**: Vercel

## Architecture Notes

```
┌─────────────────────────────────────────────────┐
│                   Next.js App                     │
│                  (App Router)                     │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Pages/   │  │Components│  │  MDX Content  │  │
│  │  Routes   │◄─┤  (React) │◄─┤  (Fórmulas)  │  │
│  └────┬─────┘  └────┬─────┘  └───────────────┘  │
│       │              │                            │
│       │         ┌────┴─────┐                      │
│       │         │react-katex│  ← Renderização     │
│       │         │  (KaTeX)  │    LaTeX             │
│       │         └──────────┘                      │
│       │                                           │
│  ┌────┴────────────────────┐                      │
│  │    Supabase Client      │                      │
│  │  (metadados + busca)    │                      │
│  └────┬────────────────────┘                      │
└───────┼───────────────────────────────────────────┘
        │
        ▼
┌───────────────────┐
│   Supabase        │
│  (PostgreSQL)     │
│  - categories     │
│  - formulas       │
│  - full-text idx  │
└───────────────────┘
```

**Fluxo de dados**:
1. Fórmulas são escritas em MDX com frontmatter (`src/content/`)
2. Metadados são sincronizados para o Supabase (via seed/script)
3. Listagem e busca consultam o Supabase (Server Components)
4. Detalhe da fórmula carrega o MDX do filesystem (SSG/ISR)
5. KaTeX renderiza as expressões matemáticas no cliente

**Padrões**:
- Server Components por padrão; Client Components apenas onde necessário (busca, toggle, interações)
- Colocação de componentes: componentes específicos ficam junto à feature
- MDX como source of truth para conteúdo; Supabase como índice de busca

## Out of Scope

- Autenticação de usuários (futuro: favoritos, histórico)
- Calculadoras interativas (futuro: inserir valores e calcular)
- Exercícios e quizzes (futuro: prática com questões)
- Progresso do aluno (futuro: tracking de estudo)
- PWA / app nativo (futuro)
- Internacionalização (app em pt-BR apenas no MVP)
- Editor de fórmulas (admin) — conteúdo é gerenciado via código/MDX
- Analytics avançadas (futuro: fórmulas mais acessadas, heatmaps)
