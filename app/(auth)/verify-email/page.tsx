"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

import AuthCard from "@/components/auth/AuthCard";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const error = searchParams.get("error");

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <AuthCard>
          <div className="flex flex-col items-center gap-5 text-center">

            <CheckCircle2 className="h-20 w-20 text-green-500" />

            <h1 className="text-3xl font-bold">
              Email Verified
            </h1>

            <p className="text-muted-foreground">
              Your account has been verified successfully.
            </p>

            <p className="text-sm">
              You can now login.
            </p>

          </div>
        </AuthCard>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard>
        <div className="flex flex-col items-center gap-5 text-center">

          <XCircle className="h-20 w-20 text-red-500" />

          <h1 className="text-3xl font-bold">
            Verification Failed
          </h1>

          <p className="text-muted-foreground">
            {error}
          </p>

        </div>
      </AuthCard>
    </main>
  );
}