import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";


const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-600">
      <div className="space-y-6">
        <h1
          className={cn(
            poppins.className,
            "text-6xl font-semibold text-white drop-shadow-md"
          )}
        >
          🔐Auth
        </h1>
        <p className="text-lg text-white">Simple Authentication Service</p>
        <div className="flex items-center justify-center flex-col">
          <LoginButton>
            <Button variant={"outline"}>Sign-In Now</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
