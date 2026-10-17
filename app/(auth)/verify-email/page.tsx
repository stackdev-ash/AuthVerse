import { Suspense } from "react";
import VerifyEmailContent from "./VerifyEmailContent";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}