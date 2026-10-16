"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message ?? "Could not process your request.");
        return;
      }

      setSubmitted(true);
      toast.success("If the account can reset a password, an email will arrive shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="space-y-5 text-center">
        <p className="text-sm text-muted-foreground">
          If an account with that email exists and can reset a password, a reset link will be sent shortly. Check your inbox and spam folder.
        </p>
        <Link href="/login" className="text-sm text-primary hover:underline">Back to Login</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="Enter your account email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={loading}
        />
      </div>
      <SubmitButton text="Send Reset Link" loadingText="Sending link..." loading={loading} />
      <p className="text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">Back to Login</Link>
      </p>
    </form>
  );
}
