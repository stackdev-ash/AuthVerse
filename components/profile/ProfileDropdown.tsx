"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function ProfileDropdown() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image ?? ""} />

          <AvatarFallback>{session?.user?.email?.substring(0,2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <div className="space-y-1 px-3 py-2">
          <p className="font-medium">{session?.user?.name}</p>

          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-500"
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
