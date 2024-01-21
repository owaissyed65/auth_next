"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Login = async (values: z.infer<typeof LoginSchema>) => {
  if ([values.email, values.password].some((value) => value.trim() === "")) {
    return { error: "Field is required" };
  }
  
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credentials are invalid!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export default Login;
