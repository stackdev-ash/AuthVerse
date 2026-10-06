"use client";

import { Button } from "@/components/ui/button";
import {FaGithub} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import { signIn } from "next-auth/react";

export default function OAuthButtons() {
  return (
    <div className="space-y-3">

      <Button
        variant="outline"
        className="w-full gap-3"
        onClick={() =>
    signIn("google", {
        callbackUrl: "/",
    })
}
      >
        <FcGoogle/>
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full gap-3"
        onClick={() =>
    signIn("github", {
        callbackUrl: "/",
    })
}
      >
        <FaGithub/>
        Continue with GitHub
      </Button>

    </div>
  );
}