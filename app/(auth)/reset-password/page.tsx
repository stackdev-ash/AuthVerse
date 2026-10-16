import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          subtitle="Choose a new password for your AuthVerse account."
        />
        <ResetPasswordForm token={token} />
      </AuthCard>
    </main>
  );
}
