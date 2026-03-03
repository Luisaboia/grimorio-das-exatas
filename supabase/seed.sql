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

-- -------------------------------------------------------
-- Cinemática
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Velocidade Média',
  'velocidade-media',
  'A velocidade média é a razão entre o deslocamento total e o intervalo de tempo gasto',
  'v_m = \frac{\Delta s}{\Delta t}',
  'b0000000-0000-0000-0000-000000000001',
  'cinematica',
  'basico',
  ARRAY['velocidade', 'deslocamento', 'tempo', 'cinemática'],
  'fisica/velocidade-media.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação Horária do MRU',
  'mru-posicao',
  'A equação horária da posição no Movimento Retilíneo Uniforme descreve a posição em função do tempo',
  's = s_0 + v \cdot t',
  'b0000000-0000-0000-0000-000000000001',
  'cinematica',
  'basico',
  ARRAY['MRU', 'movimento uniforme', 'posição', 'cinemática'],
  'fisica/mru-posicao.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação Horária do MRUV',
  'mruv-posicao',
  'A equação horária da posição no Movimento Retilíneo Uniformemente Variado descreve a posição em função do tempo com aceleração constante',
  's = s_0 + v_0 t + \frac{1}{2}at^2',
  'b0000000-0000-0000-0000-000000000001',
  'cinematica',
  'basico',
  ARRAY['MRUV', 'movimento uniformemente variado', 'aceleração', 'cinemática'],
  'fisica/mruv-posicao.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação de Torricelli',
  'torricelli',
  'A equação de Torricelli relaciona velocidade, aceleração e deslocamento sem a variável tempo',
  'v^2 = v_0^2 + 2a\Delta s',
  'b0000000-0000-0000-0000-000000000001',
  'cinematica',
  'intermediario',
  ARRAY['Torricelli', 'velocidade', 'aceleração', 'deslocamento', 'cinemática'],
  'fisica/torricelli.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Queda Livre',
  'queda-livre',
  'Na queda livre, a altura percorrida por um corpo em função do tempo depende apenas da aceleração gravitacional',
  'h = \frac{1}{2}gt^2',
  'b0000000-0000-0000-0000-000000000001',
  'cinematica',
  'basico',
  ARRAY['queda livre', 'gravidade', 'altura', 'cinemática'],
  'fisica/queda-livre.mdx'
);

-- -------------------------------------------------------
-- Dinâmica (peso, atrito, centrípeta, elástica)
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Força Peso',
  'peso',
  'A força peso é a força gravitacional exercida sobre um corpo próximo à superfície de um astro',
  'P = m \cdot g',
  'b0000000-0000-0000-0000-000000000001',
  'dinamica',
  'basico',
  ARRAY['peso', 'massa', 'gravidade', 'dinâmica'],
  'fisica/peso.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Força de Atrito',
  'forca-atrito',
  'A força de atrito é proporcional à força normal e ao coeficiente de atrito entre as superfícies',
  'f_{at} = \mu \cdot N',
  'b0000000-0000-0000-0000-000000000001',
  'dinamica',
  'basico',
  ARRAY['atrito', 'coeficiente de atrito', 'normal', 'dinâmica'],
  'fisica/forca-atrito.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Força Centrípeta',
  'forca-centripeta',
  'A força centrípeta é a resultante das forças que mantêm um corpo em movimento circular',
  'F_c = \frac{mv^2}{r}',
  'b0000000-0000-0000-0000-000000000001',
  'dinamica',
  'intermediario',
  ARRAY['força centrípeta', 'movimento circular', 'aceleração centrípeta', 'dinâmica'],
  'fisica/forca-centripeta.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Força Elástica (Lei de Hooke)',
  'forca-elastica',
  'A lei de Hooke descreve a força exercida por uma mola quando deformada, sendo proporcional à deformação',
  'F = -k \cdot x',
  'b0000000-0000-0000-0000-000000000001',
  'dinamica',
  'basico',
  ARRAY['lei de Hooke', 'mola', 'elasticidade', 'dinâmica'],
  'fisica/forca-elastica.mdx'
);

-- -------------------------------------------------------
-- Trabalho e Energia
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Trabalho de uma Força',
  'trabalho',
  'O trabalho de uma força é o produto da força pelo deslocamento vezes o cosseno do ângulo entre eles',
  '\tau = F \cdot d \cdot \cos\theta',
  'b0000000-0000-0000-0000-000000000001',
  'trabalho-energia',
  'basico',
  ARRAY['trabalho', 'força', 'deslocamento', 'energia'],
  'fisica/trabalho.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Energia Cinética',
  'energia-cinetica',
  'A energia cinética é a energia associada ao movimento de um corpo',
  'E_c = \frac{1}{2}mv^2',
  'b0000000-0000-0000-0000-000000000001',
  'trabalho-energia',
  'basico',
  ARRAY['energia cinética', 'velocidade', 'massa', 'energia'],
  'fisica/energia-cinetica.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Energia Potencial Gravitacional',
  'energia-potencial-gravitacional',
  'A energia potencial gravitacional é a energia armazenada em um corpo devido à sua posição em um campo gravitacional',
  'E_p = mgh',
  'b0000000-0000-0000-0000-000000000001',
  'trabalho-energia',
  'basico',
  ARRAY['energia potencial', 'gravidade', 'altura', 'energia'],
  'fisica/energia-potencial-gravitacional.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Potência',
  'potencia',
  'A potência mede a rapidez com que um trabalho é realizado ou a energia é transferida',
  'P = \frac{\tau}{\Delta t}',
  'b0000000-0000-0000-0000-000000000001',
  'trabalho-energia',
  'basico',
  ARRAY['potência', 'trabalho', 'tempo', 'energia'],
  'fisica/potencia.mdx'
);

-- -------------------------------------------------------
-- Termodinâmica
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Calor Sensível',
  'calor-sensivel',
  'O calor sensível é a quantidade de calor necessária para variar a temperatura de um corpo sem mudança de fase',
  'Q = mc\Delta T',
  'b0000000-0000-0000-0000-000000000001',
  'termodinamica',
  'basico',
  ARRAY['calor', 'temperatura', 'calor específico', 'termodinâmica'],
  'fisica/calor-sensivel.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Calor Latente',
  'calor-latente',
  'O calor latente é a quantidade de calor necessária para mudar o estado físico de um corpo sem alterar sua temperatura',
  'Q = mL',
  'b0000000-0000-0000-0000-000000000001',
  'termodinamica',
  'basico',
  ARRAY['calor latente', 'mudança de fase', 'fusão', 'vaporização', 'termodinâmica'],
  'fisica/calor-latente.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Dilatação Linear',
  'dilatacao-linear',
  'A dilatação linear descreve como o comprimento de um corpo varia com a temperatura',
  '\Delta L = L_0 \cdot \alpha \cdot \Delta T',
  'b0000000-0000-0000-0000-000000000001',
  'termodinamica',
  'basico',
  ARRAY['dilatação', 'temperatura', 'coeficiente de dilatação', 'termodinâmica'],
  'fisica/dilatacao-linear.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação de Clapeyron',
  'equacao-clapeyron',
  'A equação de Clapeyron é a equação de estado dos gases ideais, relacionando pressão, volume e temperatura',
  'PV = nRT',
  'b0000000-0000-0000-0000-000000000001',
  'termodinamica',
  'intermediario',
  ARRAY['gás ideal', 'Clapeyron', 'pressão', 'volume', 'temperatura', 'termodinâmica'],
  'fisica/equacao-clapeyron.mdx'
);

-- -------------------------------------------------------
-- Óptica
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação de Gauss para Espelhos',
  'equacao-gauss-espelhos',
  'A equação de Gauss relaciona a distância focal, a distância do objeto e a distância da imagem em espelhos e lentes',
  '\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}',
  'b0000000-0000-0000-0000-000000000001',
  'optica',
  'intermediario',
  ARRAY['espelhos', 'Gauss', 'distância focal', 'óptica'],
  'fisica/equacao-gauss-espelhos.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Lei de Snell-Descartes',
  'lei-snell-descartes',
  'A Lei de Snell-Descartes descreve a relação entre os ângulos de incidência e refração quando a luz passa de um meio para outro',
  'n_1 \sin\theta_1 = n_2 \sin\theta_2',
  'b0000000-0000-0000-0000-000000000001',
  'optica',
  'intermediario',
  ARRAY['refração', 'Snell', 'índice de refração', 'óptica'],
  'fisica/lei-snell-descartes.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Aumento Linear Transversal',
  'aumento-linear',
  'O aumento linear transversal indica a relação entre o tamanho da imagem e o tamanho do objeto',
  'A = \frac{d_i}{d_o}',
  'b0000000-0000-0000-0000-000000000001',
  'optica',
  'basico',
  ARRAY['ampliação', 'aumento', 'espelhos', 'lentes', 'óptica'],
  'fisica/aumento-linear.mdx'
);

-- -------------------------------------------------------
-- Ondulatória
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Velocidade de Onda',
  'velocidade-onda',
  'A velocidade de propagação de uma onda é o produto do comprimento de onda pela frequência',
  'v = \lambda \cdot f',
  'b0000000-0000-0000-0000-000000000001',
  'ondulatoria',
  'basico',
  ARRAY['onda', 'frequência', 'comprimento de onda', 'ondulatória'],
  'fisica/velocidade-onda.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Frequência e Período',
  'frequencia-periodo',
  'A frequência é o inverso do período: indica quantas oscilações ocorrem por unidade de tempo',
  'f = \frac{1}{T}',
  'b0000000-0000-0000-0000-000000000001',
  'ondulatoria',
  'basico',
  ARRAY['frequência', 'período', 'oscilação', 'ondulatória'],
  'fisica/frequencia-periodo.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Efeito Doppler',
  'efeito-doppler',
  'O efeito Doppler descreve a mudança na frequência percebida de uma onda quando a fonte ou o observador se movem',
  'f'' = f \cdot \frac{v \pm v_o}{v \mp v_f}',
  'b0000000-0000-0000-0000-000000000001',
  'ondulatoria',
  'intermediario',
  ARRAY['Doppler', 'frequência', 'onda', 'som', 'ondulatória'],
  'fisica/efeito-doppler.mdx'
);

-- -------------------------------------------------------
-- Eletrostática
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Lei de Coulomb',
  'lei-coulomb',
  'A Lei de Coulomb calcula a força de interação entre duas cargas elétricas pontuais',
  'F = k \frac{|q_1 q_2|}{d^2}',
  'b0000000-0000-0000-0000-000000000001',
  'eletrostatica',
  'basico',
  ARRAY['Coulomb', 'carga elétrica', 'força elétrica', 'eletrostática'],
  'fisica/lei-coulomb.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Campo Elétrico',
  'campo-eletrico',
  'O campo elétrico gerado por uma carga pontual depende do valor da carga e da distância ao ponto considerado',
  'E = k \frac{|Q|}{d^2}',
  'b0000000-0000-0000-0000-000000000001',
  'eletrostatica',
  'basico',
  ARRAY['campo elétrico', 'carga', 'eletrostática'],
  'fisica/campo-eletrico.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Potencial Elétrico',
  'potencial-eletrico',
  'O potencial elétrico gerado por uma carga pontual indica a energia potencial por unidade de carga em um ponto',
  'V = k \frac{Q}{d}',
  'b0000000-0000-0000-0000-000000000001',
  'eletrostatica',
  'basico',
  ARRAY['potencial elétrico', 'voltagem', 'carga', 'eletrostática'],
  'fisica/potencial-eletrico.mdx'
);

-- -------------------------------------------------------
-- Eletrodinâmica
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Lei de Ohm',
  'lei-ohm',
  'A Lei de Ohm estabelece que a tensão em um resistor é proporcional à corrente que o percorre',
  'U = R \cdot I',
  'b0000000-0000-0000-0000-000000000001',
  'eletrodinamica',
  'basico',
  ARRAY['Lei de Ohm', 'resistência', 'tensão', 'corrente', 'eletrodinâmica'],
  'fisica/lei-ohm.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Potência Elétrica',
  'potencia-eletrica',
  'A potência elétrica é o produto da tensão pela corrente, representando a taxa de consumo de energia elétrica',
  'P = U \cdot I',
  'b0000000-0000-0000-0000-000000000001',
  'eletrodinamica',
  'basico',
  ARRAY['potência elétrica', 'tensão', 'corrente', 'eletrodinâmica'],
  'fisica/potencia-eletrica.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Resistores em Série e Paralelo',
  'resistores-serie-paralelo',
  'As fórmulas de resistência equivalente permitem simplificar circuitos com resistores em série e em paralelo',
  'R_{eq} = R_1 + R_2 + \ldots',
  'b0000000-0000-0000-0000-000000000001',
  'eletrodinamica',
  'intermediario',
  ARRAY['resistores', 'série', 'paralelo', 'circuito', 'eletrodinâmica'],
  'fisica/resistores-serie-paralelo.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Energia Elétrica',
  'energia-eletrica',
  'A energia elétrica consumida por um dispositivo é o produto de sua potência pelo tempo de uso',
  'E = P \cdot \Delta t',
  'b0000000-0000-0000-0000-000000000001',
  'eletrodinamica',
  'basico',
  ARRAY['energia elétrica', 'potência', 'consumo', 'eletrodinâmica'],
  'fisica/energia-eletrica.mdx'
);

-- -------------------------------------------------------
-- Eletromagnetismo
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Lei de Faraday',
  'lei-faraday',
  'A Lei de Faraday afirma que a força eletromotriz induzida é igual à taxa de variação do fluxo magnético',
  '\varepsilon = -\frac{d\Phi_B}{dt}',
  'b0000000-0000-0000-0000-000000000001',
  'eletromagnetismo',
  'intermediario',
  ARRAY['Faraday', 'indução', 'fluxo magnético', 'fem', 'eletromagnetismo'],
  'fisica/lei-faraday.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Força Magnética',
  'forca-magnetica',
  'A força magnética atua sobre uma carga elétrica em movimento dentro de um campo magnético',
  'F = qvB\sin\theta',
  'b0000000-0000-0000-0000-000000000001',
  'eletromagnetismo',
  'intermediario',
  ARRAY['força magnética', 'campo magnético', 'carga', 'Lorentz', 'eletromagnetismo'],
  'fisica/forca-magnetica.mdx'
);

-- =========================================================
-- MATEMÁTICA — Fórmulas
-- =========================================================

-- -------------------------------------------------------
-- Álgebra
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Produtos Notáveis',
  'produtos-notaveis',
  'Fórmulas dos principais produtos notáveis usados na simplificação de expressões algébricas',
  '(a+b)^2 = a^2 + 2ab + b^2',
  'a0000000-0000-0000-0000-000000000001',
  'algebra',
  'basico',
  ARRAY['produtos notáveis', 'quadrado da soma', 'quadrado da diferença', 'produto da soma pela diferença'],
  'matematica/produtos-notaveis.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Fatoração',
  'fatoracao',
  'Principais técnicas de fatoração de expressões algébricas',
  'a^2 - b^2 = (a+b)(a-b)',
  'a0000000-0000-0000-0000-000000000001',
  'algebra',
  'basico',
  ARRAY['fatoração', 'diferença de quadrados', 'trinômio quadrado perfeito', 'fator comum'],
  'matematica/fatoracao.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Progressão Aritmética (PA)',
  'progressao-aritmetica',
  'Fórmulas do termo geral e da soma dos termos de uma progressão aritmética',
  'a_n = a_1 + (n-1)r',
  'a0000000-0000-0000-0000-000000000001',
  'algebra',
  'basico',
  ARRAY['PA', 'progressão aritmética', 'razão', 'sequência', 'soma'],
  'matematica/progressao-aritmetica.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Progressão Geométrica (PG)',
  'progressao-geometrica',
  'Fórmulas do termo geral e da soma dos termos de uma progressão geométrica',
  'a_n = a_1 \cdot q^{n-1}',
  'a0000000-0000-0000-0000-000000000001',
  'algebra',
  'basico',
  ARRAY['PG', 'progressão geométrica', 'razão', 'sequência', 'soma'],
  'matematica/progressao-geometrica.mdx'
);

-- -------------------------------------------------------
-- Geometria Plana
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Área do Triângulo',
  'area-triangulo',
  'Fórmula para calcular a área de um triângulo a partir da base e da altura',
  'A = \frac{b \cdot h}{2}',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-plana',
  'basico',
  ARRAY['área', 'triângulo', 'base', 'altura', 'geometria plana'],
  'matematica/area-triangulo.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Área do Círculo',
  'area-circulo',
  'Fórmula para calcular a área de um círculo a partir do raio',
  'A = \pi r^2',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-plana',
  'basico',
  ARRAY['área', 'círculo', 'raio', 'pi', 'geometria plana'],
  'matematica/area-circulo.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Teorema de Pitágoras',
  'teorema-pitagoras',
  'O Teorema de Pitágoras relaciona os lados de um triângulo retângulo',
  'a^2 = b^2 + c^2',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-plana',
  'basico',
  ARRAY['Pitágoras', 'triângulo retângulo', 'hipotenusa', 'cateto', 'geometria plana'],
  'matematica/teorema-pitagoras.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Perímetro de Polígonos',
  'perimetro-poligonos',
  'Fórmulas de perímetro para as principais figuras planas',
  'P = \sum l_i',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-plana',
  'basico',
  ARRAY['perímetro', 'polígono', 'triângulo', 'quadrado', 'retângulo', 'circunferência'],
  'matematica/perimetro-poligonos.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Área do Trapézio',
  'area-trapezio',
  'Fórmula para calcular a área de um trapézio a partir das bases e da altura',
  'A = \frac{(B + b) \cdot h}{2}',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-plana',
  'basico',
  ARRAY['área', 'trapézio', 'base maior', 'base menor', 'geometria plana'],
  'matematica/area-trapezio.mdx'
);

-- -------------------------------------------------------
-- Geometria Espacial
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Volume da Esfera',
  'volume-esfera',
  'Fórmula para calcular o volume de uma esfera a partir do raio',
  'V = \frac{4}{3}\pi r^3',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-espacial',
  'basico',
  ARRAY['volume', 'esfera', 'raio', 'pi', 'geometria espacial'],
  'matematica/volume-esfera.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Volume do Cilindro',
  'volume-cilindro',
  'Fórmula para calcular o volume de um cilindro circular reto',
  'V = \pi r^2 h',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-espacial',
  'basico',
  ARRAY['volume', 'cilindro', 'raio', 'altura', 'geometria espacial'],
  'matematica/volume-cilindro.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Volume do Cone',
  'volume-cone',
  'Fórmula para calcular o volume de um cone circular reto',
  'V = \frac{1}{3}\pi r^2 h',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-espacial',
  'basico',
  ARRAY['volume', 'cone', 'raio', 'altura', 'geometria espacial'],
  'matematica/volume-cone.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Volume do Paralelepípedo',
  'volume-paralelepipedo',
  'Fórmula para calcular o volume de um paralelepípedo retângulo',
  'V = a \cdot b \cdot c',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-espacial',
  'basico',
  ARRAY['volume', 'paralelepípedo', 'comprimento', 'largura', 'altura', 'geometria espacial'],
  'matematica/volume-paralelepipedo.mdx'
);

-- -------------------------------------------------------
-- Trigonometria
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Lei dos Senos',
  'lei-dos-senos',
  'A Lei dos Senos relaciona os lados de um triângulo com os senos dos ângulos opostos',
  '\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R',
  'a0000000-0000-0000-0000-000000000001',
  'trigonometria',
  'intermediario',
  ARRAY['lei dos senos', 'triângulo', 'seno', 'circunscrito', 'trigonometria'],
  'matematica/lei-dos-senos.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Lei dos Cossenos',
  'lei-dos-cossenos',
  'A Lei dos Cossenos generaliza o Teorema de Pitágoras para triângulos quaisquer',
  'a^2 = b^2 + c^2 - 2bc\cos A',
  'a0000000-0000-0000-0000-000000000001',
  'trigonometria',
  'intermediario',
  ARRAY['lei dos cossenos', 'triângulo', 'cosseno', 'trigonometria'],
  'matematica/lei-dos-cossenos.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Identidades Trigonométricas Fundamentais',
  'identidades-fundamentais',
  'Identidades trigonométricas fundamentais que relacionam seno, cosseno e tangente',
  '\sin^2\theta + \cos^2\theta = 1',
  'a0000000-0000-0000-0000-000000000001',
  'trigonometria',
  'intermediario',
  ARRAY['identidade trigonométrica', 'seno', 'cosseno', 'tangente', 'trigonometria'],
  'matematica/identidades-fundamentais.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Razões Trigonométricas no Triângulo Retângulo',
  'razoes-trigonometricas',
  'Definições de seno, cosseno e tangente no triângulo retângulo',
  '\sin\theta = \frac{\text{cateto oposto}}{\text{hipotenusa}}',
  'a0000000-0000-0000-0000-000000000001',
  'trigonometria',
  'basico',
  ARRAY['seno', 'cosseno', 'tangente', 'triângulo retângulo', 'trigonometria'],
  'matematica/razoes-trigonometricas.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Fórmulas de Adição de Arcos',
  'formulas-adicao',
  'Fórmulas para seno, cosseno e tangente da soma e diferença de dois ângulos',
  '\sin(a \pm b) = \sin a \cos b \pm \cos a \sin b',
  'a0000000-0000-0000-0000-000000000001',
  'trigonometria',
  'intermediario',
  ARRAY['adição de arcos', 'seno', 'cosseno', 'tangente', 'trigonometria'],
  'matematica/formulas-adicao.mdx'
);

-- -------------------------------------------------------
-- Geometria Analítica
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Distância entre Dois Pontos',
  'distancia-dois-pontos',
  'Fórmula para calcular a distância entre dois pontos no plano cartesiano',
  'd = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-analitica',
  'intermediario',
  ARRAY['distância', 'pontos', 'coordenadas', 'plano cartesiano', 'geometria analítica'],
  'matematica/distancia-dois-pontos.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação da Reta',
  'equacao-reta',
  'Formas da equação da reta no plano cartesiano: reduzida e geral',
  'y = mx + b',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-analitica',
  'intermediario',
  ARRAY['reta', 'equação', 'angular', 'linear', 'geometria analítica'],
  'matematica/equacao-reta.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Coeficiente Angular',
  'coeficiente-angular',
  'Fórmula do coeficiente angular de uma reta dados dois pontos',
  'm = \frac{y_2 - y_1}{x_2 - x_1}',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-analitica',
  'intermediario',
  ARRAY['coeficiente angular', 'inclinação', 'reta', 'geometria analítica'],
  'matematica/coeficiente-angular.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Equação da Circunferência',
  'equacao-circunferencia',
  'Equação reduzida da circunferência no plano cartesiano',
  '(x-a)^2 + (y-b)^2 = r^2',
  'a0000000-0000-0000-0000-000000000001',
  'geometria-analitica',
  'intermediario',
  ARRAY['circunferência', 'equação', 'centro', 'raio', 'geometria analítica'],
  'matematica/equacao-circunferencia.mdx'
);

-- -------------------------------------------------------
-- Cálculo
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Limite',
  'limite',
  'Definição e principais propriedades de limites de funções',
  '\lim_{x \to a} f(x) = L',
  'a0000000-0000-0000-0000-000000000001',
  'calculo',
  'avancado',
  ARRAY['limite', 'continuidade', 'convergência', 'cálculo'],
  'matematica/limite.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Derivada',
  'derivada',
  'Definição de derivada e regras básicas de diferenciação',
  'f''(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}',
  'a0000000-0000-0000-0000-000000000001',
  'calculo',
  'avancado',
  ARRAY['derivada', 'taxa de variação', 'diferenciação', 'cálculo'],
  'matematica/derivada.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Integral',
  'integral',
  'Conceito de integral e regras básicas de integração',
  '\int f(x)\,dx',
  'a0000000-0000-0000-0000-000000000001',
  'calculo',
  'avancado',
  ARRAY['integral', 'primitiva', 'antiderivada', 'área', 'cálculo'],
  'matematica/integral.mdx'
);

-- -------------------------------------------------------
-- Estatística
-- -------------------------------------------------------

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Média Aritmética',
  'media-aritmetica',
  'Fórmula da média aritmética simples e ponderada',
  '\bar{x} = \frac{\sum x_i}{n}',
  'a0000000-0000-0000-0000-000000000001',
  'estatistica',
  'basico',
  ARRAY['média', 'aritmética', 'estatística', 'medida de tendência central'],
  'matematica/media-aritmetica.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Desvio Padrão',
  'desvio-padrao',
  'Fórmula do desvio padrão como medida de dispersão de um conjunto de dados',
  '\sigma = \sqrt{\frac{\sum(x_i - \bar{x})^2}{n}}',
  'a0000000-0000-0000-0000-000000000001',
  'estatistica',
  'intermediario',
  ARRAY['desvio padrão', 'variância', 'dispersão', 'estatística'],
  'matematica/desvio-padrao.mdx'
);

INSERT INTO formulas (title, slug, description, formula_preview, category_id, subcategory, difficulty, tags, mdx_path)
VALUES (
  'Mediana',
  'mediana',
  'Definição e cálculo da mediana para conjuntos de dados com número par e ímpar de elementos',
  'Md = x_{(n+1)/2}',
  'a0000000-0000-0000-0000-000000000001',
  'estatistica',
  'basico',
  ARRAY['mediana', 'estatística', 'medida de tendência central', 'posição'],
  'matematica/mediana.mdx'
);
