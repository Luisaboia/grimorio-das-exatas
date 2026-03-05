"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

const f = (x: number) => x * x * x - 3 * x;
const fPrime = (x: number) => 3 * x * x - 3;

export default function DerivadaGraph(_props: GraphProps) {
  const [x0, setX0] = useState(1);

  const y0 = f(x0);
  const slope = fPrime(x0);

  // Tangent line: y = y0 + slope * (x - x0)
  const tangentY = (x: number) => y0 + slope * (x - x0);

  return (
    <GraphContainer label="Reta Tangente — Derivada de f(x) = x³ − 3x">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-4, 4], y: [-6, 6] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
          yAxis={{ lines: 2, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* Function curve */}
        <Plot.OfX y={f} color="var(--mafs-blue)" weight={2.5} />

        {/* Tangent line */}
        <Plot.OfX y={tangentY} color="var(--mafs-green)" weight={2} opacity={0.8} />

        {/* Point of tangency */}
        <Point x={x0} y={y0} color="var(--mafs-yellow)" />

        {/* Label */}
        <Text x={x0 + 0.3} y={y0 + 0.5} size={12} color="var(--mafs-yellow)">
          ({x0.toFixed(1)}, {y0.toFixed(1)})
        </Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="x₀" value={x0} min={-3} max={3} step={0.05} onChange={setX0} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="f(x₀)" value={y0.toFixed(3)} />
        <ValueDisplay label="f'(x₀)" value={slope.toFixed(3)} />
        <ValueDisplay label="Equação tangente" value={`y = ${slope.toFixed(2)}(x − ${x0.toFixed(2)}) + ${y0.toFixed(2)}`} />
      </div>
    </GraphContainer>
  );
}
