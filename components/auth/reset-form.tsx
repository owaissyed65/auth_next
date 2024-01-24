"use client";
import React, { useTransition } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ResetSchema } from "@/schemas";
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

const ResetForm = () => {
  const [isPending, setTransition] = useTransition();
  const [errorMessage, setError] = React.useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setError("");
    setSuccessMessage("");
    setTransition(() => {
      reset(values).then((res) => {
        setError(res.error);
        setSuccessMessage(res.success);
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
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
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
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export { ResetForm };
