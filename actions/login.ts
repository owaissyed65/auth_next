"use server";
import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/get-user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

const Login = async (values: z.infer<typeof LoginSchema>) => {
  if ([values.email, values.password].some((value) => value.trim() === "")) {
    return { error: "Field is required" };
  }
  const existingUser = await getUserByEmail(values.email);

  if (!existingUser || !existingUser?.password || !existingUser?.email) {
    return { error: "Email does not exist" };
  }
  if (!existingUser?.emailVerified) {
    // generate a new verification token and send it to the user
    const vToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(vToken?.email!, vToken?.token!);
    return {
      error:
        "Email not verified! Check Your email that we had sending you an email",
    };
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
        case "AuthorizedCallbackError":
          return {
            error:
              "We can't Allow you because you haven't verified email or you had sign in with oAuth!",
          };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export default Login;
