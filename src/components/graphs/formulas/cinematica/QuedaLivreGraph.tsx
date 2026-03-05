"use client";

import { useState } from "react";
import { Mafs, Coordinates, Plot, Point, Line, Text } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

const g = 9.8;

export default function QuedaLivreGraph(_props: GraphProps) {
  const [h0, setH0] = useState(20);

  const tFall = Math.sqrt((2 * h0) / g);
  const h = (t: number) => h0 - 0.5 * g * t * t;
  const vFinal = g * tFall;

  const maxT = tFall + 1;
  const maxY = Math.max(h0 + 5, 10);

  return (
    <GraphContainer label="Queda Livre — h(t) = h₀ − ½gt²">
      <Mafs
        width="auto"
        height={300}
        viewBox={{ x: [-0.3, Math.max(maxT, 3)], y: [-5, maxY] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (n) => (n >= 0 ? String(n) : "") }}
          yAxis={{ lines: Math.ceil(maxY / 5), labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* h(t) curve (only while h >= 0) */}
        <Plot.OfX
          y={(t) => {
            const val = h(t);
            return val >= 0 ? val : NaN;
          }}
          color="var(--mafs-blue)"
          weight={2.5}
        />

        {/* Starting point */}
        <Point x={0} y={h0} color="var(--mafs-yellow)" />

        {/* Fall point */}
        <Point x={tFall} y={0} color="var(--mafs-red)" />

        {/* Vertical line at t_fall */}
        <Line.Segment
          point1={[tFall, 0]}
          point2={[tFall, h0]}
          color="var(--mafs-red)"
          weight={1}
          opacity={0.3}
        />

        <Text x={Math.max(maxT, 3) - 0.5} y={-3} size={12} color="var(--mafs-fg)">t (s)</Text>
        <Text x={0.3} y={maxY - 1} size={12} color="var(--mafs-fg)">h (m)</Text>
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="h₀" value={h0} min={1} max={100} step={1} onChange={setH0} unit=" m" />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <ValueDisplay label="t queda" value={tFall.toFixed(3)} unit=" s" />
        <ValueDisplay label="v final" value={vFinal.toFixed(2)} unit=" m/s" />
        <ValueDisplay label="g" value="9.8" unit=" m/s²" />
      </div>
    </GraphContainer>
  );
}
