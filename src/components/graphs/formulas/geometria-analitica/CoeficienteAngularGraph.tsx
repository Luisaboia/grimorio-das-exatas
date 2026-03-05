"use client";

import { Mafs, Coordinates, Line, Plot, Text, useMovablePoint } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function CoeficienteAngularGraph(_props: GraphProps) {
  const p1 = useMovablePoint([-2, -1]);
  const p2 = useMovablePoint([2, 3]);

  const dx = p2.point[0] - p1.point[0];
  const dy = p2.point[1] - p1.point[1];
  const m = dx !== 0 ? dy / dx : Infinity;
  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  // Line equation: y = m(x - x1) + y1
  const lineY = (x: number) =>
    dx !== 0
      ? m * (x - p1.point[0]) + p1.point[1]
      : NaN;

  return (
    <GraphContainer label="Coeficiente Angular — m = Δy / Δx">
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

        {/* Line through points */}
        {dx !== 0 && <Plot.OfX y={lineY} color="var(--mafs-blue)" weight={2} />}

        {/* Step triangle: horizontal then vertical */}
        <Line.Segment
          point1={p1.point}
          point2={[p2.point[0], p1.point[1]]}
          color="var(--mafs-green)"
          weight={2}
          opacity={0.7}
        />
        <Line.Segment
          point1={[p2.point[0], p1.point[1]]}
          point2={p2.point}
          color="var(--mafs-red)"
          weight={2}
          opacity={0.7}
        />

        {/* Labels for Δx and Δy */}
        <Text
          x={(p1.point[0] + p2.point[0]) / 2}
          y={p1.point[1] - 0.4}
          size={12}
          color="var(--mafs-green)"
        >
          Δx = {dx.toFixed(1)}
        </Text>
        <Text
          x={p2.point[0] + 0.4}
          y={(p1.point[1] + p2.point[1]) / 2}
          size={12}
          color="var(--mafs-red)"
        >
          Δy = {dy.toFixed(1)}
        </Text>

        {p1.element}
        {p2.element}
      </Mafs>

      <div className="mt-3 flex flex-wrap gap-2">
        <ValueDisplay label="P₁" value={`(${p1.point[0].toFixed(1)}, ${p1.point[1].toFixed(1)})`} />
        <ValueDisplay label="P₂" value={`(${p2.point[0].toFixed(1)}, ${p2.point[1].toFixed(1)})`} />
        <ValueDisplay label="m" value={isFinite(m) ? m.toFixed(3) : "∞"} />
        <ValueDisplay label="α" value={`${angleDeg.toFixed(1)}°`} />
      </div>
    </GraphContainer>
  );
}
