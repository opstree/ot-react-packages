import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  const baseUrl = typeof process !== "undefined" && process.env ? process.env.NEXT_PUBLIC_APP_URL || "https://cult-ui.com" : "https://cult-ui.com";
  return `${baseUrl}${path}`
}