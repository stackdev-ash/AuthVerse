interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
