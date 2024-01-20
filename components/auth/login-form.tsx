"use client";
import React, { useTransition } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginSchema } from "@/schemas";
import {
  FormError,
  FormMessage as FormSuccess,
} from "@/components/auth/form-message";
import Login from "@/actions/login";

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

const LoginForm = () => {
  const [isPendition, setTransition] = useTransition();
  const [errorMessage, setError] = React.useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccessMessage("");
    setTransition(() => {
      Login(values).then((res) => {
        setError(res.error);
        setSuccessMessage(res.success);
      });
    });
  }
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonText="Dont have an account?"
      backButtonHref="/auth/register"
      showSocialButton
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export { LoginForm };
