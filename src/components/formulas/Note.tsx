import type { ReactNode } from "react";

interface NoteProps {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}

const noteStyles = {
  info: {
    container: "border-primary-700 bg-primary-950/30",
    icon: "ℹ️",
    title: "Informação",
    titleColor: "text-primary-300",
  },
  warning: {
    container: "border-yellow-700 bg-yellow-950/30",
    icon: "⚠️",
    title: "Atenção",
    titleColor: "text-yellow-300",
  },
  tip: {
    container: "border-emerald-700 bg-emerald-950/30",
    icon: "💡",
    title: "Dica",
    titleColor: "text-emerald-300",
  },
};

export function Note({ type = "info", children }: NoteProps) {
  const style = noteStyles[type];

  return (
    <div
      className={`my-4 rounded-lg border-l-4 p-4 ${style.container}`}
      role="note"
    >
      <div className="mb-2 flex items-center gap-2">
        <span>{style.icon}</span>
        <span className={`text-sm font-semibold ${style.titleColor}`}>
          {style.title}
        </span>
      </div>

      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
