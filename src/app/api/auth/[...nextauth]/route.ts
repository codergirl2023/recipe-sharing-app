import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        await connectToDB();

        if (!credentials?.email || !credentials.password) {
          console.log("Failed to get email or password");
          return null;
        }

        const user = await User.findOne({ email: credentials.email }).select(
          "+hashedPassword",
        );

        if (!user) {
          console.log("User not found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!passwordsMatch) {
          console.log("Passwords do no match");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      await connectToDB();
      const userExists = await User.findOne({ email: session.user.email });
      if (userExists) {
        session.user.id = userExists._id.toString();
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
