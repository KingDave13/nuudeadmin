import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@utils/database";
import Admin from "@models/admin";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        await connectToDb();
        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) throw new Error("Wrong Credentials.");

        const isCorrect = await bcrypt.compare(credentials.password, admin.password);
        if (!isCorrect) throw new Error("Wrong Credentials.");

        return { ...admin.toObject(), id: admin._id.toString() };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };