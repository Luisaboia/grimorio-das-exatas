"use client";

import { useState, useMemo } from "react";
import { Mafs, Coordinates, Plot, Polygon } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

const func = (x: number) => Math.sin(x) + 1.5;
const antiderivative = (x: number) => -Math.cos(x) + 1.5 * x;

export default function IntegralGraph(_props: GraphProps) {
  const [n, setN] = useState(10);
  const [a, setA] = useState(0);
  const [b, setB] = useState(Math.PI);

  const actualB = Math.max(a + 0.1, b);

  const { rectangles, riemannSum } = useMemo(() => {
    const dx = (actualB - a) / n;
    const rects: { x: number; y: number; width: number }[] = [];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const xi = a + i * dx;
      const yi = func(xi);
      rects.push({ x: xi, y: yi, width: dx });
      sum += yi * dx;
    }
    return { rectangles: rects, riemannSum: sum };
  }, [n, a, actualB]);

  const exactIntegral = antiderivative(actualB) - antiderivative(a);
  const error = Math.abs(riemannSum - exactIntegral);

  return (
    <GraphContainer label="Somas de Riemann — Integral de sin(x) + 1.5">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-0.5, 7], y: [-0.5, 3.5] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (v) => (v !== 0 ? String(v) : "") }}
          yAxis={{ lines: 1, labels: (v) => (v !== 0 ? String(v) : "") }}
        />

        {/* Riemann rectangles */}
        {rectangles.map((rect, i) => (
          <Polygon
            key={i}
            points={[
              [rect.x, 0],
              [rect.x + rect.width, 0],
              [rect.x + rect.width, rect.y],
              [rect.x, rect.y],
            ]}
            color="var(--mafs-blue)"
            fillOpacity={0.3}
          />
        ))}

        {/* Function curve */}
        <Plot.OfX y={func} color="var(--mafs-green)" weight={2.5} />
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="n (retângulos)" value={n} min={1} max={50} step={1} onChange={setN} />
        <Slider label="a (inferior)" value={a} min={0} max={4} step={0.1} onChange={setA} />
        <Slider label="b (superior)" value={b} min={0.5} max={6} step={0.1} onChange={setB} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="Σ Riemann" value={riemannSum.toFixed(4)} />
        <ValueDisplay label="∫ exata" value={exactIntegral.toFixed(4)} />
        <ValueDisplay label="Erro" value={error.toFixed(4)} />
      </div>
    </GraphContainer>
  );
}
