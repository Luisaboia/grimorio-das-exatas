-- ============================================================
-- seed.sql
-- Seed data matching src/lib/categories.ts + existing MDX files
-- ============================================================

-- -------------------------------------------------------
-- 1. Parent categories
-- -------------------------------------------------------
INSERT INTO categories (id, name, slug, icon, description, parent_id, display_order)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Matemática', 'matematica', '📐', 'Fórmulas e conceitos de Matemática', NULL, 1),
  ('b0000000-0000-0000-0000-000000000001', 'Física',     'fisica',     '⚛️',  'Fórmulas e conceitos de Física',     NULL, 2);

-- -------------------------------------------------------
-- 2. Subcategories — Matemática
-- -------------------------------------------------------
INSERT INTO categories (name, slug, icon, description, parent_id, display_order)
VALUES
  ('Álgebra',             'algebra',             NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 1),
  ('Geometria Plana',     'geometria-plana',     NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 2),
  ('Geometria Espacial',  'geometria-espacial',  NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 3),
  ('Trigonometria',       'trigonometria',        NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 4),
  ('Geometria Analítica', 'geometria-analitica',  NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 5),
  ('Cálculo',             'calculo',              NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 6),
  ('Estatística',         'estatistica',          NULL, NULL, 'a0000000-0000-0000-0000-000000000001', 7);

-- -------------------------------------------------------
-- 3. Subcategories — Física
-- -------------------------------------------------------
INSERT INTO categories (name, slug, icon, description, parent_id, display_order)
VALUES
  ('Cinemática',       'cinematica',       NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 1),
  ('Dinâmica',         'dinamica',         NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 2),
  ('Trabalho e Energia','trabalho-energia', NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 3),
  ('Termodinâmica',    'termodinamica',    NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 4),
  ('Óptica',           'optica',           NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 5),
  ('Ondulatória',      'ondulatoria',      NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 6),
  ('Eletrostática',    'eletrostatica',    NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 7),
  ('Eletrodinâmica',   'eletrodinamica',   NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 8),
  ('Eletromagnetismo', 'eletromagnetismo', NULL, NULL, 'b0000000-0000-0000-0000-000000000001', 9);

-- -------------------------------------------------------
-- 4. Formula metadata for existing MDX files
-- -------------------------------------------------------

-- Segunda Lei de Newton (fisica/segunda-lei-newton.mdx)
INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Segunda Lei de Newton',
  'segunda-lei-newton',
  'A força resultante sobre um corpo é igual ao produto de sua massa pela aceleração adquirida',
  'F = m \cdot a',
  'b0000000-0000-0000-0000-000000000001',
  'dinamica',
  'basico',
  ARRAY['força', 'massa', 'aceleração', 'Newton'],
  'fisica/segunda-lei-newton.mdx'
);

-- Fórmula de Bhaskara (matematica/bhaskara.mdx)
INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Fórmula de Bhaskara',
  'bhaskara',
  'Fórmula para encontrar as raízes de uma equação do segundo grau',
  'x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}',
  'a0000000-0000-0000-0000-000000000001',
  'algebra',
  'basico',
  ARRAY['equação quadrática', 'segundo grau', 'raízes', 'Bhaskara'],
  'matematica/bhaskara.mdx'
);
