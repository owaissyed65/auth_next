"use client";

import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(1, {
    message: "Minimum 1 character required",
  }),
});
const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Minimum 2 character required",
  }),
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
});

export { LoginSchema, RegisterSchema };
