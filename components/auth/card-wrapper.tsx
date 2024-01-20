"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./header";
import { Social } from "./social";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonText: string;
  backButtonHref: string;
  showSocialButton: boolean;
}
export const CardWrapper = ({
  backButtonHref,
  backButtonText,
  children,
  headerLabel,
  showSocialButton,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialButton && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonText} />
      </CardFooter>
    </Card>
  );
};
