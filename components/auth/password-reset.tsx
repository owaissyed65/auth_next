"use client";
import React, { useTransition } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ResetPasswordSchema } from "@/schemas";
import {
  FormError,
  FormMessage as FormSuccess,
} from "@/components/auth/form-message";

import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { reset } from "@/actions/reset";
import { useSearchParams } from "next/navigation";
import { newPasswordVerification } from "@/actions/new-password";

const PasswordResetForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, setTransition] = useTransition();
  const [errorMessage, setError] = React.useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setError("");
    setSuccessMessage("");

    setTransition(() => {
      newPasswordVerification(values, token!)
        .then((res) => {
          setError(res.error);
          setSuccessMessage(res.success);
        })
        .catch((err) => {
          setError(err.error || "Something went wrong!");
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonText="Back to login!"
      backButtonHref="/auth/login"
      showSocialButton={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*******"
                      type="password"
                      disabled={isPending}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export { PasswordResetForm };
