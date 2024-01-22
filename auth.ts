import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";

import { db } from "@/lib/db";
import nextAuth from "@/auth.config";
import { getUserById } from "@/data/get-user";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ account, user }) {
      // allow oAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user?.id!);
      // prevent signin if email is not verified
      if (!existingUser || !existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },

    // @ts-ignore
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub as UserRole;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...nextAuth,
});
