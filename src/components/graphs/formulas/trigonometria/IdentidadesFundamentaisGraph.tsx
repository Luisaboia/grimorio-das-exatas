"use client";

import { Mafs, Coordinates, Circle, Line, Point, Polygon, Text, useMovablePoint } from "mafs";
import type { GraphProps } from "../../types";
import { GraphContainer } from "../../GraphContainer";
import { ValueDisplay } from "../../controls/ValueDisplay";

export default function IdentidadesFundamentaisGraph(_props: GraphProps) {
  const point = useMovablePoint([Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)], {
    constrain: (p) => {
      const a = Math.atan2(p[1], p[0]);
      return [Math.cos(a), Math.sin(a)];
    },
  });

  const angle = Math.atan2(point.point[1], point.point[0]);
  const sinVal = Math.sin(angle);
  const cosVal = Math.cos(angle);
  const sin2 = sinVal * sinVal;
  const cos2 = cosVal * cosVal;

  const barX = 1.5;
  const barW = 0.15;

  return (
    <GraphContainer label="Identidade Fundamental — sin²θ + cos²θ = 1">
      <Mafs
        width="auto"
        height={350}
        viewBox={{ x: [-1.6, 2.2], y: [-1.5, 1.5] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 0.5, labels: (n) => (n < 1.4 ? (n !== 0 ? String(n) : "") : "") }}
          yAxis={{ lines: 0.5, labels: (n) => (n !== 0 ? String(n) : "") }}
        />

        {/* Unit circle */}
        <Circle center={[0, 0]} radius={1} strokeStyle="dashed" />

        {/* Cos segment */}
        <Line.Segment point1={[0, 0]} point2={[cosVal, 0]} color="var(--mafs-blue)" weight={3} />
        {/* Sin segment */}
        <Line.Segment point1={[cosVal, 0]} point2={[cosVal, sinVal]} color="var(--mafs-red)" weight={3} />
        {/* Radius */}
        <Line.Segment point1={[0, 0]} point2={point.point} color="var(--mafs-violet)" weight={2} />

        {/* Stacked bar — cos² (bottom, blue) + sin² (top, red) = 1 */}
        <Polygon
          points={[
            [barX - barW, 0],
            [barX + barW, 0],
            [barX + barW, cos2],
            [barX - barW, cos2],
          ]}
          color="var(--mafs-blue)"
        />
        <Polygon
          points={[
            [barX - barW, cos2],
            [barX + barW, cos2],
            [barX + barW, cos2 + sin2],
            [barX - barW, cos2 + sin2],
          ]}
          color="var(--mafs-red)"
        />

        {/* Bar labels */}
        <Text x={barX + 0.3} y={cos2 / 2} size={11} color="var(--mafs-blue)">
          cos²
        </Text>
        <Text x={barX + 0.3} y={cos2 + sin2 / 2} size={11} color="var(--mafs-red)">
          sin²
        </Text>
        <Text x={barX} y={1.15} size={12}>
          = 1
        </Text>

        {/* Projection point */}
        <Point x={cosVal} y={0} color="var(--mafs-blue)" />

        {point.element}
      </Mafs>

      <div className="mt-3 flex flex-wrap gap-2">
        <ValueDisplay label="sin²θ" value={sin2.toFixed(4)} />
        <ValueDisplay label="cos²θ" value={cos2.toFixed(4)} />
        <ValueDisplay label="sin²θ + cos²θ" value={(sin2 + cos2).toFixed(4)} />
      </div>
    </GraphContainer>
  );
}
