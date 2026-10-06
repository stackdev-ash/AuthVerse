"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  text: string;
  loadingText?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function SubmitButton({
  text,
  loadingText = "Please wait...",
  loading = false,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}