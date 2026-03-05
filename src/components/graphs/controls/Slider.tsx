"use client";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  unit,
}: SliderProps) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-surface-200">
          {label}
        </label>
        <span className="font-mono text-primary-300">
          {value.toFixed(step < 1 ? 1 : 0)}
          {unit && <span className="ml-0.5 text-surface-200/60">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-graph h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-800 outline-none"
        aria-label={`${label}: ${value.toFixed(step < 1 ? 1 : 0)}${unit ?? ""}`}
      />
    </div>
  );
}
