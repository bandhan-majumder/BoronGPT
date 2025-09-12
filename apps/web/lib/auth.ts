import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@repo/db/client";
import type { Adapter } from "next-auth/adapters";
import { SessionStrategy } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "mAchIne",
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          sub: user.id,
        };
      }
      return token;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async session({ session, token }: any) {
      if (token) {
        const user = await db.user.findUnique({
          where: {
            id: token.sub,
          },
        });

        session.user.id = token.sub;
        session.accessToken = token.accessToken;
        session.user.admin = user?.admin || false;
      }
      return session;
    },
  },
};
