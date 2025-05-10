import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectMongo from "../lib/mongoose";
import { Student } from "../models/student";

//import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        name: { label: "Name", type: "text" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const name = credentials.name as string | undefined;
        if (!email || !name) {
          throw new Error("Please provide both username and password.");
        }
        await connectMongo();

        const user = await Student.findOne({ email });
        if (!user || user.email !== email) {
          throw new Error("Invalid username or email.");
        }
        return {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          id: user._id,
          tel: user.tel,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.lastname = token.lastname;
        session.user.tel = token.tel;
      }
      console.log("Session callback - session:", session);
      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT callback - user:", user);
      if (user) {
        token.role = user.role;
        token.sub = user.id;
        token.name = user.name;
        token.lastname = user.lastname;
        token.email = user.email;
        token.tel = user.tel;
      }
      console.log("JWT callback - token:", token);
      return token;
    },
  },
});
