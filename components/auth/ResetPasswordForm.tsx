"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";

interface ResetPasswordFormProps {
  token?: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token) {
      toast.error("This reset link is missing or invalid. Request a new one.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not reset your password.");
        return;
      }

      toast.success("Password updated. Please log in.");
      router.push("/login?passwordReset=true");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">This reset link is missing. Request a new password reset link to continue.</p>
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">Request a new link</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="new-password">New Password</Label>
        <PasswordInput
          id="new-password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          minLength={8}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          disabled={loading}
        />
      </div>
      <SubmitButton text="Update Password" loadingText="Updating password..." loading={loading} />
      <p className="text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">Back to Login</Link>
      </p>
    </form>
  );
}
