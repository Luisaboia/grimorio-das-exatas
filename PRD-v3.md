# Feature: Demonstrações Matemáticas (Deduções)

## Overview

Adicionar um sistema de **demonstrações/deduções matemáticas** às fórmulas do Grimório das Exatas. Cada fórmula poderá ter uma demonstração associada — seja uma dedução passo a passo da fórmula, a história por trás de quem a formulou, ou ambos. O conteúdo será acessado via um botão **"Ver Demonstração"** que abre um **modal** elegante com o conteúdo completo renderizado em MDX/KaTeX.

O objetivo é ir além da memorização: permitir que o aluno entenda **de onde a fórmula veio**, transformando o catálogo em uma ferramenta de aprendizado profundo.

## Success Criteria

- [ ] Todas as tasks completas
- [ ] Todos os testes passando (`npm test`)
- [ ] Build prod com sucesso (`npm run build`)
- [ ] Lint limpo (`npm run lint`)
- [ ] Modal de demonstração funcional com renderização KaTeX
- [ ] Conteúdo de demonstração criado para todas as 62 fórmulas
- [ ] Fórmulas sem demonstração exibem o botão desabilitado com tooltip "Em breve"
- [ ] Acessibilidade: modal com focus trap, Escape para fechar, aria-labels

## Tasks

### Task-001: Infraestrutura — Tipo, Loader e Diretório de Demonstrações

**Priority**: High  
**Estimated Iterations**: 1-2

Criar a estrutura de dados e o pipeline de leitura para arquivos MDX de demonstração, separados dos arquivos de fórmula existentes.

**Decisões de arquitetura**:
- Os arquivos de demonstração ficam em `src/content/demonstracoes/{categoria}/{slug}.mdx`, espelhando a estrutura de `src/content/{categoria}/{slug}.mdx`
- O slug da demonstração é idêntico ao slug da fórmula correspondente
- O frontmatter da demonstração é mínimo: `title`, `slug`, `type` ("deducao" | "historia" | "mista")

**Acceptance Criteria**:

- [ ] Criar diretório `src/content/demonstracoes/fisica/` e `src/content/demonstracoes/matematica/`
- [ ] Criar tipo `DemonstracaoFrontmatter` em `src/types/formula.ts`:
  ```ts
  export interface DemonstracaoFrontmatter {
    title: string;
    slug: string; // mesmo slug da fórmula
    type: "deducao" | "historia" | "mista";
  }

  export interface DemonstracaoData {
    frontmatter: DemonstracaoFrontmatter;
    content: string; // raw MDX
    slug: string;
  }
  ```
- [ ] Adicionar funções em `src/lib/mdx.ts`:
  - `getDemonstracaoBySlug(slug: string): DemonstracaoData | null` — busca arquivo MDX de demonstração que tenha o slug correspondente
  - `getAllDemonstracoes(): DemonstracaoData[]` — lista todas as demonstrações disponíveis
  - `hasDemonstracao(slug: string): boolean` — retorna se a fórmula tem demonstração
- [ ] Criar um arquivo placeholder `src/content/demonstracoes/matematica/bhaskara.mdx` para testes

**Verificação**:

```bash
npm run build
npm test
```

---

### Task-002: Componente Modal de Demonstração

**Priority**: High  
**Estimated Iterations**: 2-3

Criar o componente `DemonstrationModal` — um modal fullscreen/drawer que exibe o conteúdo MDX da demonstração com renderização KaTeX completa.

**Acceptance Criteria**:

- [ ] Criar `src/components/formulas/DemonstrationModal.tsx` (client component)
- [ ] O modal recebe props:
  ```ts
  interface DemonstrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string; // título da demonstração
    type: "deducao" | "historia" | "mista";
    content: string; // raw MDX content
  }
  ```
- [ ] **Visual**: modal tipo overlay com max-width `4xl`, scrollável, fundo escuro com backdrop blur (similar ao CommandPalette existente, mas maior)
- [ ] **Header** do modal: ícone de tipo (🔍 dedução, 📜 história, 🔍📜 mista), título, badge do tipo, botão X para fechar
- [ ] **Corpo**: conteúdo MDX renderizado com os mesmos componentes do `[slug]/page.tsx` (Formula, FormulaBlock, Variable, Note, Example), usando `MDXRemote` client-side
- [ ] **Acessibilidade**: focus trap, `role="dialog"`, `aria-modal="true"`, fechar com Escape, `aria-label`
- [ ] **Animação**: fade in do backdrop + scale/slide-up do painel (usar as keyframes existentes `fadeIn` e `scaleIn`)
- [ ] **Responsivo**: em mobile, o modal ocupa a tela toda (fullscreen drawer); em desktop, centralizado com max-width
- [ ] Testes unitários: renderiza com conteúdo, fecha ao clicar backdrop, fecha ao pressionar Escape

**Verificação**:

```bash
npm test
npm run build
```

---

### Task-003: Botão "Ver Demonstração" na Página da Fórmula

**Priority**: High  
**Estimated Iterations**: 1-2

Integrar o botão "Ver Demonstração" na página de detalhe da fórmula (`src/app/formula/[slug]/page.tsx`).

**Acceptance Criteria**:

- [ ] Criar componente wrapper client `src/components/formulas/DemonstrationButton.tsx`:
  ```ts
  interface DemonstrationButtonProps {
    demonstrationTitle: string;
    demonstrationType: "deducao" | "historia" | "mista";
    demonstrationContent: string; // raw MDX
  }
  ```
  - Gerencia o estado `isOpen` do modal
  - Renderiza o botão + o `DemonstrationModal`
- [ ] O botão aparece logo **abaixo do `<FormulaBlock>` principal** na página da fórmula
- [ ] **Estilo do botão ativo**: ícone 🔍, texto "Ver Demonstração", estilo outline com borda `primary-700`, hover com `bg-primary-950/60`
- [ ] **Se a fórmula NÃO tem demonstração**: botão desabilitado (opacity reduzida), texto "Demonstração em breve", cursor `not-allowed`, tooltip explicativo
- [ ] Na `page.tsx`, consultar `getDemonstracaoBySlug(slug)` e passar os dados ao componente ou renderizar o botão desabilitado
- [ ] Build estático funciona — `generateStaticParams` não precisa mudar (dados carregados em tempo de build)

**Verificação**:

```bash
npm run build
# Navegar para /formula/bhaskara e verificar botão funcional
# Navegar para /formula/velocidade-media e verificar botão desabilitado
```

---

### Task-004: Conteúdo — Demonstrações de Matemática (29 fórmulas)

**Priority**: High  
**Estimated Iterations**: 8-12

Escrever os arquivos MDX de demonstração para todas as **29 fórmulas de Matemática**. Cada demonstração deve ser didática, passo a passo, usando os componentes MDX existentes.

**Diretrizes de conteúdo**:
- Usar `<FormulaBlock>` para passos intermediários da dedução
- Usar `<Note type="info">` para contexto histórico relevante
- Usar `<Note type="tip">` para insights ou dicas de memorização
- Linguagem acessível para nível ensino médio/técnico
- Cada demonstração deve ter entre 15-40 linhas de MDX
- Tipo `"deducao"` para fórmulas com dedução matemática clara
- Tipo `"historia"` para fórmulas onde a origem histórica é mais relevante
- Tipo `"mista"` quando ambos se aplicam

**Lista completa (29 arquivos — `src/content/demonstracoes/matematica/`):**

| # | Arquivo | Tipo sugerido |
|---|---------|---------------|
| 1 | `bhaskara.mdx` | mista |
| 2 | `produtos-notaveis.mdx` | deducao |
| 3 | `fatoracao.mdx` | deducao |
| 4 | `progressao-aritmetica.mdx` | deducao |
| 5 | `progressao-geometrica.mdx` | deducao |
| 6 | `area-triangulo.mdx` | deducao |
| 7 | `area-circulo.mdx` | mista |
| 8 | `area-trapezio.mdx` | deducao |
| 9 | `teorema-pitagoras.mdx` | mista |
| 10 | `perimetro-poligonos.mdx` | deducao |
| 11 | `volume-esfera.mdx` | mista |
| 12 | `volume-cilindro.mdx` | deducao |
| 13 | `volume-cone.mdx` | deducao |
| 14 | `volume-paralelepipedo.mdx` | deducao |
| 15 | `lei-dos-senos.mdx` | deducao |
| 16 | `lei-dos-cossenos.mdx` | deducao |
| 17 | `identidades-fundamentais.mdx` | deducao |
| 18 | `razoes-trigonometricas.mdx` | mista |
| 19 | `formulas-adicao.mdx` | deducao |
| 20 | `distancia-dois-pontos.mdx` | deducao |
| 21 | `equacao-reta.mdx` | deducao |
| 22 | `coeficiente-angular.mdx` | deducao |
| 23 | `equacao-circunferencia.mdx` | deducao |
| 24 | `limite.mdx` | mista |
| 25 | `derivada.mdx` | deducao |
| 26 | `integral.mdx` | mista |
| 27 | `media-aritmetica.mdx` | deducao |
| 28 | `desvio-padrao.mdx` | deducao |
| 29 | `mediana.mdx` | deducao |

**Frontmatter padrão**:

```yaml
---
title: "Demonstração: [Nome da Fórmula]"
slug: "[slug-da-formula]"
type: "deducao"
---
```

**Acceptance Criteria**:

- [ ] 29 arquivos MDX criados em `src/content/demonstracoes/matematica/`
- [ ] Cada arquivo usa os componentes MDX disponíveis (FormulaBlock, Formula, Note, Variable)
- [ ] Conteúdo matematicamente correto e didático
- [ ] Frontmatter válido em todos os arquivos
- [ ] Build passa sem erros
- [ ] Verificar renderização no modal para pelo menos 3 fórmulas diferentes

**Verificação**:

```bash
npm run build
# Abrir /formula/bhaskara → "Ver Demonstração" → modal renderiza corretamente
# Abrir /formula/teorema-pitagoras → "Ver Demonstração" → dedução exibida
# Abrir /formula/derivada → "Ver Demonstração" → conteúdo renderizado
```

---

### Task-005: Conteúdo — Demonstrações de Física (33 fórmulas)

**Priority**: High  
**Estimated Iterations**: 8-12

Escrever os arquivos MDX de demonstração para todas as **33 fórmulas de Física**.

**Lista completa (33 arquivos — `src/content/demonstracoes/fisica/`):**

| # | Arquivo | Tipo sugerido |
|---|---------|---------------|
| 1 | `segunda-lei-newton.mdx` | mista |
| 2 | `velocidade-media.mdx` | deducao |
| 3 | `mru-posicao.mdx` | deducao |
| 4 | `mruv-posicao.mdx` | deducao |
| 5 | `torricelli.mdx` | deducao |
| 6 | `queda-livre.mdx` | deducao |
| 7 | `peso.mdx` | mista |
| 8 | `forca-atrito.mdx` | mista |
| 9 | `forca-centripeta.mdx` | deducao |
| 10 | `forca-elastica.mdx` | mista |
| 11 | `trabalho.mdx` | deducao |
| 12 | `energia-cinetica.mdx` | deducao |
| 13 | `energia-potencial-gravitacional.mdx` | deducao |
| 14 | `potencia.mdx` | deducao |
| 15 | `calor-sensivel.mdx` | mista |
| 16 | `calor-latente.mdx` | mista |
| 17 | `dilatacao-linear.mdx` | deducao |
| 18 | `equacao-clapeyron.mdx` | mista |
| 19 | `equacao-gauss-espelhos.mdx` | deducao |
| 20 | `lei-snell-descartes.mdx` | mista |
| 21 | `aumento-linear.mdx` | deducao |
| 22 | `velocidade-onda.mdx` | deducao |
| 23 | `frequencia-periodo.mdx` | deducao |
| 24 | `efeito-doppler.mdx` | mista |
| 25 | `lei-coulomb.mdx` | mista |
| 26 | `campo-eletrico.mdx` | deducao |
| 27 | `potencial-eletrico.mdx` | deducao |
| 28 | `lei-ohm.mdx` | mista |
| 29 | `potencia-eletrica.mdx` | deducao |
| 30 | `resistores-serie-paralelo.mdx` | deducao |
| 31 | `energia-eletrica.mdx` | deducao |
| 32 | `lei-faraday.mdx` | mista |
| 33 | `forca-magnetica.mdx` | mista |

**Acceptance Criteria**:

- [ ] 33 arquivos MDX criados em `src/content/demonstracoes/fisica/`
- [ ] Cada arquivo usa os componentes MDX disponíveis
- [ ] Conteúdo fisicamente correto e didático
- [ ] Frontmatter válido em todos os arquivos
- [ ] Build passa sem erros
- [ ] Verificar renderização no modal para pelo menos 3 fórmulas diferentes

**Verificação**:

```bash
npm run build
# Abrir /formula/segunda-lei-newton → "Ver Demonstração" → modal renderiza
# Abrir /formula/energia-cinetica → verificar dedução com Teorema Trabalho-Energia
# Abrir /formula/lei-faraday → verificar contexto histórico
```

---

### Task-006: Indicador Visual nos Cards do Catálogo

**Priority**: Medium  
**Estimated Iterations**: 1-2

Adicionar um indicador sutil nos cards de fórmula (listagem do catálogo) para mostrar que a fórmula possui demonstração disponível.

**Acceptance Criteria**:

- [ ] No componente `FormulaCard.tsx`, receber prop `hasDemonstracao?: boolean`
- [ ] Se `true`, exibir um pequeno badge/ícone discreto (ex: "🔍" ou ícone de lupa) no canto do card
- [ ] Tooltip no ícone: "Demonstração disponível"
- [ ] Nas páginas de listagem (`formulas/page.tsx`, `[category]/page.tsx`, `[category]/[subcategory]/page.tsx`), calcular quais fórmulas têm demonstração e passar a prop
- [ ] Estilo discreto — não deve poluir o card, apenas um indicador secundário
- [ ] Build e testes passando

**Verificação**:

```bash
npm run build
npm test
# Verificar visualmente no catálogo que cards com demonstração exibem o ícone
```

---

### Task-007: Testes e Polish Final

**Priority**: Medium  
**Estimated Iterations**: 1-2

Testes automatizados e polimento final.

**Acceptance Criteria**:

- [ ] Testes unitários para `DemonstrationModal`: renderiza, fecha com Escape, fecha com backdrop click, exibe tipo correto
- [ ] Testes unitários para `DemonstrationButton`: renderiza botão ativo, renderiza botão desabilitado
- [ ] Teste de integração: `getDemonstracaoBySlug` retorna dados corretos, `hasDemonstracao` funciona
- [ ] Verificar que TODAS as 62 fórmulas têm demonstração (nenhum botão "Em breve" restante)
- [ ] Build de produção limpo
- [ ] Lint limpo
- [ ] Todos os testes passando
- [ ] Atualizar `README.md` mencionando a feature de demonstrações

**Verificação**:

```bash
npm test
npm run build
npm run lint
# Verificar /formula/[qualquer-slug] — todos devem ter "Ver Demonstração" ativo
```

---

## Technical Constraints

- **Language**: TypeScript 5
- **Framework**: Next.js 16 (App Router, Server Components, SSG)
- **Rendering**: `next-mdx-remote/rsc` (server) para páginas, `next-mdx-remote` client para o modal
- **Math**: react-katex + KaTeX (já instalados)
- **Styles**: Tailwind CSS v4 (dark-only, oklch tokens)
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint (via `npm run lint`)

## Architecture Notes

### Estrutura de diretórios final

```
src/content/
├── fisica/                          # Fórmulas existentes (33)
├── matematica/                      # Fórmulas existentes (29)
└── demonstracoes/                   # NOVO
    ├── fisica/                      # 33 arquivos MDX
    │   ├── segunda-lei-newton.mdx
    │   ├── velocidade-media.mdx
    │   └── ...
    └── matematica/                  # 29 arquivos MDX
        ├── bhaskara.mdx
        ├── teorema-pitagoras.mdx
        └── ...
```

### Fluxo de dados

1. **Build time**: `page.tsx` chama `getDemonstracaoBySlug(slug)` → lê MDX do disco → passa como prop ao `DemonstrationButton`
2. **Runtime**: Usuário clica "Ver Demonstração" → `DemonstrationButton` abre `DemonstrationModal` → `MDXRemote` renderiza o conteúdo MDX client-side com os componentes de fórmula
3. **Catálogo**: Páginas de listagem chamam `hasDemonstracao(slug)` para determinar o ícone no card

### Renderização MDX no modal

O modal precisa renderizar MDX **client-side** porque é aberto por interação do usuário. Usar `next-mdx-remote` (sem `/rsc`) ou compilar o MDX para string em build time e usar `dangerouslySetInnerHTML` com KaTeX pré-renderizado. A abordagem recomendada:

- Em build time (dentro do Server Component `page.tsx`), ler o `content` raw da demonstração
- Passar como string ao Client Component `DemonstrationButton`
- No modal, usar `MDXRemote` da versão client (`next-mdx-remote` — verificar compatibilidade com v6), ou alternativamente usar `serialize()` + `MDXRemoteClient`

**Alternativa mais simples**: pré-serializar o MDX em build time com `serialize()` da lib e passar o `MDXRemoteSerializeResult` ao client. O modal então renderiza com `<MDXRemote compiledSource={...} />`.

### Padrão existente reutilizado

- CommandPalette: padrão de modal com backdrop + animação (reutilizar)
- FormulaBlock, Formula, Variable, Note, Example: componentes MDX já existentes
- gray-matter: parsing de frontmatter já em uso

## Out of Scope

- **Vídeos ou animações dentro das demonstrações** (futuro — poderia ter GIFs ou animações SVG)
- **Contribuição da comunidade** (futuro — sistema de PR/sugestão de demonstrações)
- **Avaliação de dificuldade das demonstrações** (futuro — poderia ter nível de complexidade da dedução)
- **Demonstrações interativas** (futuro — steps revelados progressivamente com clique)
- **Supabase sync** (demonstrações ficam apenas em MDX local, como as fórmulas)
