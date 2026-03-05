"use client";

import { Mafs, Coordinates, Line, Text, useMovablePoint } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function DistanciaDoisPontosGraph(_props: GraphProps) {
  const p1 = useMovablePoint([-2, -1]);
  const p2 = useMovablePoint([3, 2]);

  const dx = p2.point[0] - p1.point[0];
  const dy = p2.point[1] - p1.point[1];
  const distance = Math.sqrt(dx * dx + dy * dy);

  return (
    <GraphContainer label="Distância entre Dois Pontos">
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

        {/* Main segment */}
        <Line.Segment
          point1={p1.point}
          point2={p2.point}
          color="var(--mafs-blue)"
          weight={2.5}
        />

        {/* Right triangle dashed lines */}
        <Line.Segment
          point1={p1.point}
          point2={[p2.point[0], p1.point[1]]}
          color="var(--mafs-green)"
          weight={1.5}
          opacity={0.5}
        />
        <Line.Segment
          point1={[p2.point[0], p1.point[1]]}
          point2={p2.point}
          color="var(--mafs-red)"
          weight={1.5}
          opacity={0.5}
        />

        {/* Distance label at midpoint */}
        <Text
          x={(p1.point[0] + p2.point[0]) / 2 + 0.3}
          y={(p1.point[1] + p2.point[1]) / 2 + 0.3}
          size={13}
          color="var(--mafs-yellow)"
        >
          d = {distance.toFixed(2)}
        </Text>

        {/* Delta labels */}
        <Text
          x={(p1.point[0] + p2.point[0]) / 2}
          y={p1.point[1] - 0.4}
          size={11}
          color="var(--mafs-green)"
        >
          Δx = {Math.abs(dx).toFixed(1)}
        </Text>
        <Text
          x={p2.point[0] + 0.4}
          y={(p1.point[1] + p2.point[1]) / 2}
          size={11}
          color="var(--mafs-red)"
        >
          Δy = {Math.abs(dy).toFixed(1)}
        </Text>

        {p1.element}
        {p2.element}
      </Mafs>

      <div className="mt-3 flex flex-wrap gap-2">
        <ValueDisplay label="P₁" value={`(${p1.point[0].toFixed(1)}, ${p1.point[1].toFixed(1)})`} />
        <ValueDisplay label="P₂" value={`(${p2.point[0].toFixed(1)}, ${p2.point[1].toFixed(1)})`} />
        <ValueDisplay label="d" value={distance.toFixed(4)} />
      </div>
    </GraphContainer>
  );
}
