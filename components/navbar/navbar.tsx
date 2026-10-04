"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";
import { Button } from "../ui/button";
import SearchBar from "@/components/blog/SearchBar";
import ProfileDropdown from "../profile/ProfileDropdown";

export default function Navbar() {
  const { data: session } = useSession();
  return (
  <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

      <Link
        href="/"
        className="text-2xl font-bold tracking-tight"
      >
        AuthVerse
      </Link>

      
      <div className="mx-10 flex flex-1 justify-center">
        <div className="w-fit max-w-xl">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {session && (
          <Button>
            <Link href="/blog/create">
              Create Blog
            </Link>
          </Button>
        )}

        <ThemeToggle />

        {session ? (
          <ProfileDropdown />
        ) : (
          <Button>
            <Link href="/login">
              Login
            </Link>
          </Button>
        )}
      </div>
    </div>
  </header>
);
}
