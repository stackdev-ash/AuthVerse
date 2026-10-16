import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard>
        <AuthHeader
          title="Forgot Password"
          subtitle="Enter your email to receive a password reset link."
        />

        <ForgotPasswordForm />
      </AuthCard>
    </main>
  );
}