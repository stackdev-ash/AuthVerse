import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center">

      <h1 className="text-5xl font-bold">
        Blog Not Found
      </h1>

      <p className="mt-3 text-muted-foreground">
        The requested blog doesn't exist.
      </p>

      <Button
        className="mt-6"
      >
        <Link href="/">
          Back Home
        </Link>
      </Button>

    </main>
  );
}