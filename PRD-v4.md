# Feature: Correções de Responsividade (Mobile/Tablet)

## Overview

Corrigir todos os problemas de layout e responsividade da aplicação para telas de 360px a 1024px (mobile e tablet). Nenhuma alteração no design existente — apenas ajustes de breakpoints, overflow, padding e layout para que o conteúdo caiba e funcione corretamente em viewports menores.

**Branch:** `fix/responsive-layout`
**Viewport mínimo suportado:** 360px (maioria dos dispositivos Android)

## Success Criteria

- [ ] Todos os tasks completos
- [ ] Nenhum overflow horizontal em nenhuma página (360px–1024px)
- [ ] Fórmulas KaTeX longas exibem scroll horizontal interno, sem quebrar o layout da página
- [ ] Navegação prev/next empilhada em mobile
- [ ] Ícone de busca visível no header mobile
- [ ] Modal de demonstração funcional em 360px
- [ ] Build passa sem erros
- [ ] Testes existentes continuam passando

## Tasks

### Task-001: FormulaBlock — overflow KaTeX e padding responsivo

**Priority**: Alta
**Estimated Iterations**: 1-2

O `FormulaBlock` é o componente mais usado (aparece em todas as 62 fórmulas e 62 demonstrações). Fórmulas KaTeX longas ultrapassam o viewport em mobile porque não há `overflow-x-auto` no container, e o `px-6` consome espaço demais em telas pequenas.

**Acceptance Criteria**:

- [ ] Adicionar `overflow-x-auto` no container da fórmula `BlockMath` para scroll horizontal quando necessário
- [ ] Reduzir padding para `px-3 sm:px-6` no container principal
- [ ] Reduzir tamanho da fórmula para `text-base sm:text-xl` no mobile
- [ ] Botão "Copiar LaTeX" não sobrepõe a label em mobile — ajustar posição se necessário
- [ ] Testar com fórmulas longas (ex: Bhaskara `\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`, Torricelli `v^2 = v_0^2 + 2 \cdot a \cdot \Delta s`)

**Arquivo**: `src/components/formulas/FormulaBlock.tsx`

**Verification**:

```bash
npm run build
npm test
```

---

### Task-002: Página de fórmula — gap do flex container e overflow do conteúdo

**Priority**: Alta
**Estimated Iterations**: 1-2

Na página `formula/[slug]/page.tsx`, o layout `flex gap-10` entre o conteúdo e o TableOfContents desperdiça 40px de espaço no mobile (o TOC está `hidden xl:block`). Além disso, o conteúdo MDX pode conter elementos que fazem overflow.

**Acceptance Criteria**:

- [ ] Alterar `gap-10` para `gap-0 xl:gap-10` (gap só quando o TOC é visível)
- [ ] Garantir que o container do conteúdo MDX tenha `overflow-x-hidden` ou `overflow-wrap: anywhere` para prevenir overflow de texto longo
- [ ] Verificar que o layout funciona em 360px, 768px e 1280px

**Arquivo**: `src/app/formula/[slug]/page.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-003: FormulaNavigation — empilhar prev/next em mobile

**Priority**: Média
**Estimated Iterations**: 1

Os botões "Anterior" e "Próxima" ficam lado a lado em todas as telas. Em mobile (< sm), ficam muito apertados (~100px por botão).

**Acceptance Criteria**:

- [ ] Alterar layout para `flex-col sm:flex-row` no container dos botões
- [ ] Ajustar `gap-4` para `gap-3 sm:gap-4`
- [ ] Ambos os botões ocupam largura total (`w-full`) em mobile
- [ ] Manter alinhamento correto (Anterior à esquerda, Próxima à direita em desktop)

**Arquivo**: `src/components/formulas/FormulaNavigation.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-004: Header mobile — adicionar ícone de busca

**Priority**: Média
**Estimated Iterations**: 1-2

Atualmente, em viewports < `lg`, não há nenhum botão/ícone de busca visível no header. O usuário precisa abrir o drawer para acessar a busca.

**Acceptance Criteria**:

- [ ] Adicionar um botão com ícone de lupa no header, visível apenas em `lg:hidden`
- [ ] O botão dispara a mesma ação de abrir o SearchBar modal (`onOpenSearch` / Ctrl+K)
- [ ] Posicionar à esquerda do botão hamburger (ou à direita do logo, conforme o layout existente)
- [ ] Estilo consistente com o botão hamburger existente (mesmos tamanhos, padding, hover)
- [ ] Não alterar o layout desktop — a SearchBar continua no mesmo lugar

**Arquivos**: `src/components/layout/Header.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-005: MobileNav drawer — largura responsiva

**Priority**: Média
**Estimated Iterations**: 1

O drawer do menu mobile tem `w-72` (288px) fixo. Em telas de 360px, ele ocupa 80% da tela, deixando pouco espaço para o backdrop e tornando difícil fechar clicando fora.

**Acceptance Criteria**:

- [ ] Alterar largura para `w-[85vw] max-w-72` — ocupa 85% do viewport com máximo de 288px
- [ ] O backdrop continua visível e clicável para fechar em telas 360px
- [ ] Não alterar conteúdo interno ou comportamento do drawer

**Arquivo**: `src/components/layout/MobileNav.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-006: DemonstrationModal — ajustes de header e conteúdo mobile

**Priority**: Média
**Estimated Iterations**: 1-2

O header do modal de demonstração fica apertado em telas ~360px. o ícone + título + badge + botão fechar competem por espaço em `px-6`. O conteúdo interno (FormulaBlocks) pode ter overflow.

**Acceptance Criteria**:

- [ ] Reduzir padding do header para `px-3 sm:px-6`
- [ ] Reduzir padding do body para `px-3 py-4 sm:px-8 sm:py-8`
- [ ] Reduzir padding do footer para `px-3 sm:px-6`
- [ ] Em mobile (< sm), ocultar o badge de tipo OU colocá-lo abaixo do título para não competir por espaço horizontal
- [ ] Conteúdo MDX dentro do modal herda as correções do Task-001 (FormulaBlock com overflow-x-auto)

**Arquivo**: `src/components/formulas/DemonstrationModal.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-007: Home page — títulos e typewriter responsivos

**Priority**: Baixa
**Estimated Iterations**: 1

O `<h1>` da home usa `text-4xl` sem redução para mobile. O `FormulaTypewriter` pode ter overflow com fórmulas KaTeX longas em viewports estreitos.

**Acceptance Criteria**:

- [ ] Alterar título principal para `text-2xl sm:text-4xl` ou `text-3xl sm:text-5xl` (manter proporção existente)
- [ ] Adicionar `overflow-x-auto` ou `overflow-hidden` no container da fórmula do Typewriter
- [ ] Verificar que o hero + SearchBar + Typewriter cabem em 360px sem overflow

**Arquivos**: `src/app/page.tsx`, `src/components/home/FormulaTypewriter.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-008: Variable.tsx — layout apertado em mobile

**Priority**: Baixa
**Estimated Iterations**: 1

O componente `Variable` usa `w-16 shrink-0` para o símbolo KaTeX. Em mobile, isso limita o espaço para a descrição.

**Acceptance Criteria**:

- [ ] Reduzir símbolo para `w-12 sm:w-16` em mobile
- [ ] Ajustar `gap-4` para `gap-2 sm:gap-4`
- [ ] Descrição e unidade continuam legíveis em 360px

**Arquivo**: `src/components/formulas/Variable.tsx`

**Verification**:

```bash
npm run build
```

---

### Task-009: Validação final e testes

**Priority**: Alta
**Estimated Iterations**: 1-2

Validação completa do build, testes e verificação visual.

**Acceptance Criteria**:

- [ ] `npm run build` passa sem erros
- [ ] `npm test` — todos os testes existentes passam
- [ ] Verificação manual em no mínimo 3 fórmulas (página de detalhe + modal de demonstração)
- [ ] Não há overflow horizontal em nenhuma página quando visualizada em 360px
- [ ] Commit final na branch `fix/responsive-layout`

**Verification**:

```bash
npm run build
npm test
```

## Technical Constraints

- **Language**: TypeScript / React 19
- **Framework**: Next.js 16.1.6 (App Router)
- **Styling**: Tailwind CSS v4 (somente classes utilitárias, sem CSS custom modules)
- **Breakpoints Tailwind**: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- **Viewport mínimo**: 360px
- **KaTeX**: react-katex (`BlockMath`, `InlineMath`) — não é possível controlar tamanho interno, apenas do container
- **Sem alterações de design**: apenas ajustes de responsividade

## Architecture Notes

- **Abordagem mobile-first**: classes sem prefixo = mobile, com prefixo (sm:, md:, lg:) = telas maiores
- **Overflow KaTeX**: `overflow-x-auto` no container pai do `BlockMath` permite scroll horizontal apenas na fórmula, sem afetar o layout da página
- **FormulaBlock é o componente mais crítico**: usado em todas as 62 páginas de fórmulas + 62 demonstrações = 124+ instâncias

## Out of Scope

- Redesign de componentes (apenas ajustar responsividade do layout existente)
- Temas ou cores (dark mode permanece como está)
- Funcionalidades novas (exceto ícone de busca no header, que é exposição de funcionalidade existente)
- Suporte a viewports < 360px (ex: Galaxy Fold fechado 280px)
- Testes e2e ou visuais automatizados
