import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Divider from "@/components/auth/Divider";
import LoginForm from "@/components/auth/LoginForm";
import OAuthButtons from "@/components/auth/OAuthButtons";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function LoginPage() {
  const session = await auth();

  if(session) redirect("/");
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to continue to AuthVerse"
        />

        <LoginForm />

        <Divider />

        <OAuthButtons />
      </AuthCard>
    </main>
  );
}