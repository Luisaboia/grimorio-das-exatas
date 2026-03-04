"use client";

import { useState } from "react";
import { DemonstrationModal } from "./DemonstrationModal";
import type { ReactNode } from "react";

interface DemonstrationButtonProps {
  title: string;
  type: "deducao" | "historia" | "mista";
  children: ReactNode; // pre-rendered MDX from server
}

export function DemonstrationButton({ title, type, children }: DemonstrationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-primary-700 bg-transparent px-5 py-2.5 text-sm font-medium text-primary-400 transition-all hover:bg-primary-950/60 hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-700/50"
      >
        <span aria-hidden="true">🔍</span>
        Ver Demonstração
      </button>

      <DemonstrationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        type={type}
      >
        {children}
      </DemonstrationModal>
    </>
  );
}
