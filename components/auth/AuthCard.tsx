import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="mx-auto w-full max-w-md rounded-2xl border shadow-sm">
      <div className="space-y-6 p-8">
        {children}
      </div>
    </Card>
  );
}