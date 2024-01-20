"use server";
import * as z from "zod";

import { LoginSchema } from "@/schemas";

const Login = async (value: z.infer<typeof LoginSchema>) => {
  try {
    // const validatedFields = loginSchema.parse(value);
    // // if (validatedFields.success) {
    // // }
    // console.log(validatedFields);
    return { success: "Email Sent" };
  } catch (error) {
    return { error: "Field is required" };
  }
};

export default Login;
