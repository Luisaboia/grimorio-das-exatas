"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function EquacaoRetaGraph(_props: GraphProps) {
  const [m, setM] = useState(1);
  const [b, setB] = useState(0);

  const y = (x: number) => m * x + b;
  const xIntercept = m !== 0 ? -b / m : null;
  const angleDeg = (Math.atan(m) * 180) / Math.PI;

  return (
    <GraphContainer label="Equação da Reta — y = mx + b">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-6, 6], y: [-6, 6] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
          yAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        <Plot.OfX y={y} color="var(--mafs-blue)" weight={2.5} />

        {/* Y-intercept */}
        <Point x={0} y={b} color="var(--mafs-yellow)" />
        <Text x={0.4} y={b + 0.4} size={12} color="var(--mafs-yellow)">
          (0, {b.toFixed(1)})
        </Text>

        {/* X-intercept */}
        {xIntercept !== null && Math.abs(xIntercept) <= 6 && (
          <>
            <Point x={xIntercept} y={0} color="var(--mafs-green)" />
            <Text x={xIntercept + 0.3} y={-0.5} size={12} color="var(--mafs-green)">
              ({xIntercept.toFixed(1)}, 0)
            </Text>
          </>
        )}
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="m (angular)" value={m} min={-5} max={5} step={0.1} onChange={setM} />
        <Slider label="b (linear)" value={b} min={-5} max={5} step={0.1} onChange={setB} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="Equação" value={`y = ${m.toFixed(1)}x + ${b.toFixed(1)}`} />
        <ValueDisplay label="α" value={`${angleDeg.toFixed(1)}°`} />
        {xIntercept !== null && <ValueDisplay label="Raiz" value={`x = ${xIntercept.toFixed(2)}`} />}
      </div>
    </GraphContainer>
  );
}
