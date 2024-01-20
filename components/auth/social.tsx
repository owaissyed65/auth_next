"use client";
import { FaGithub } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <FcGoogle className="text-lg" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {}}
      >
        <FaGithub className="text-lg" />
      </Button>
    </div>
  );
};