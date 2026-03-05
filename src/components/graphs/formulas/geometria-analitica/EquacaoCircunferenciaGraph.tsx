"use client";

import { useState } from "react";
import { Mafs, Coordinates, Circle, Line, Point, Text, useMovablePoint } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { Slider } from "../../controls/Slider";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function EquacaoCircunferenciaGraph(_props: GraphProps) {
  const [r, setR] = useState(2);
  const center = useMovablePoint([0, 0]);

  const [a, b] = center.point;

  return (
    <GraphContainer label="Equação da Circunferência — (x − a)² + (y − b)² = r²">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-7, 7], y: [-7, 7] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
          yAxis={{ lines: 1, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* Circle */}
        <Circle center={center.point} radius={r} color="var(--mafs-blue)" weight={2.5} />

        {/* Radius line */}
        <Line.Segment
          point1={center.point}
          point2={[a + r, b]}
          color="var(--mafs-green)"
          weight={1.5}
        />

        {/* Radius endpoint */}
        <Point x={a + r} y={b} color="var(--mafs-green)" />

        {/* Radius label */}
        <Text x={a + r / 2} y={b + 0.4} size={12} color="var(--mafs-green)">
          r = {r.toFixed(1)}
        </Text>

        {/* Center label */}
        <Text x={a + 0.3} y={b - 0.4} size={12} color="var(--mafs-yellow)">
          C({a.toFixed(1)}, {b.toFixed(1)})
        </Text>

        {center.element}
      </Mafs>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Slider label="r (raio)" value={r} min={0.5} max={5} step={0.1} onChange={setR} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <ValueDisplay label="Centro" value={`(${a.toFixed(1)}, ${b.toFixed(1)})`} />
        <ValueDisplay label="Raio" value={r.toFixed(2)} />
        <ValueDisplay label="Equação" value={`(x − ${a.toFixed(1)})² + (y − ${b.toFixed(1)})² = ${(r * r).toFixed(1)}`} />
      </div>
    </GraphContainer>
  );
}
