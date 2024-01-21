"use client";
import React, { useTransition } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

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
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [isPending, setTransition] = useTransition();
  const [errorMessage, setError] = React.useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >("");
  const [isText, setIsText] = React.useState<Boolean>(false);

  const errorProviderMessage =
    useSearchParams().get("error") === "OAuthAccountNotLinked"
      ? "Email already exists, please login with your email and password"
      : "";

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
                      disabled={isPending}
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
                  <div className="flex items-center relative">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type={isText ? "text" : "password"}
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsText(!isText);
                      }}
                    >
                      {isText ? (
                        <IoEyeOffOutline
                          className=" cursor-pointer"
                          size={18}
                        />
                      ) : (
                        <IoEyeOutline size={20} className="cursor-pointer" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {(errorMessage || errorProviderMessage) && (
            <FormError message={errorMessage || errorProviderMessage} />
          )}
          {successMessage && <FormSuccess message={successMessage} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export { LoginForm };
