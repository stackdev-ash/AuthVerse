import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Divider from "@/components/auth/Divider";
import OAuthButtons from "@/components/auth/OAuthButtons";
import SignupForm from "@/components/auth/SignupForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function SignupPage() {
  const session = await auth();
  if(session) redirect("/");
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard>
        <AuthHeader
          title="Create your account"
          subtitle="Start sharing blogs today."
        />

        <SignupForm />

        <Divider />

        <OAuthButtons />
      </AuthCard>
    </main>
  );
}