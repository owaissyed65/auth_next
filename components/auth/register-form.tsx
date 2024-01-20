"use client";
import React, { useState, useTransition } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { RegisterSchema } from "@/schemas";
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

const RegisterForm = () => {
  const [isPendition, setTransition] = useTransition();
  const [errorMessage, setError] = React.useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >("");
  const [isText, setIsText] = useState<Boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError("");
    setSuccessMessage("");
    // setTransition(() => {
    //   Login(values).then((res) => {
    //     setError(res.error);
    //     setSuccessMessage(res.success);
    //   });
    // });
  }
  return (
    <CardWrapper
      headerLabel="Create An Account"
      backButtonText="Already have an account?"
      backButtonHref="/auth/login"
      showSocialButton
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John" type="text"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <div className="flex items-center relative">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type={isText ? "text" : "password"}
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
          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}
          <Button type="submit" className="w-full">
            Create An Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export { RegisterForm };
