"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  category?: string;
}

export interface AccordionCardProps {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const AccordionCard: React.FC<AccordionCardProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-outline-variant/70 bg-surface-container-lowest transition-all duration-200 shadow-xs hover:border-primary/40",
        isOpen ? "shadow-md border-primary ring-1 ring-primary/15" : "",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between text-left gap-4 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none group"
      >
        <span className="text-sm sm:text-[15px] font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">
          {question}
        </span>
        <div
          className={cn(
            "w-7 h-7 rounded-full border border-outline-variant/80 flex items-center justify-center text-secondary shrink-0 transition-transform duration-200 group-hover:border-primary group-hover:text-primary bg-surface-container-low",
            isOpen && "rotate-45 border-primary text-primary bg-primary/10"
          )}
        >
          <Plus className="w-4 h-4 stroke-[2.2]" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6 text-sm text-secondary leading-relaxed border-t border-outline-variant/30 animate-in fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};

export interface AccordionProps {
  items: AccordionItemData[];
  columns?: 1 | 2;
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  columns = 2,
  allowMultiple = false,
  defaultOpenId,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  if (columns === 2) {
    const mid = Math.ceil(items.length / 2);
    const leftCol = items.slice(0, mid);
    const rightCol = items.slice(mid);

    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 w-full items-start", className)}>
        {/* Left Column */}
        <div className="space-y-4 lg:space-y-5">
          {leftCol.map((item) => (
            <AccordionCard
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openIds.includes(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-5">
          {rightCol.map((item) => (
            <AccordionCard
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openIds.includes(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3 w-full", className)}>
      {items.map((item) => (
        <AccordionCard
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
};
