// components/Search.tsx
"use client";
import { Input } from "@/components/ui/input";

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ placeholder, value, onChange }: SearchProps) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 max-w-sm"
    />
  );
}
