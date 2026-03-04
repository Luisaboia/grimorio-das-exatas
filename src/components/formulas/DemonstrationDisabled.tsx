export function DemonstrationDisabled() {
  return (
    <button
      disabled
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-surface-700 bg-transparent px-5 py-2.5 text-sm font-medium text-surface-50/30 opacity-60"
      title="Demonstração em breve"
    >
      <span aria-hidden="true">🔍</span>
      Demonstração em breve
    </button>
  );
}
