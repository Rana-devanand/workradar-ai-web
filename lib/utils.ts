import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely with Tailwind CSS support.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

