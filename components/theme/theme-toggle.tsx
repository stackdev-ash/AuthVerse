"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  );
}