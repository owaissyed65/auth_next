"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const LoginButton = ({
  children,
  asChild,
  mode = "redirect",
}: LoginButtonProps) => {
  const router = useRouter();
  
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === `modal`) {
    return (
      <div onClick={onClick} className="cursor-pointer">
        TODO TASK
      </div>
    );
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
