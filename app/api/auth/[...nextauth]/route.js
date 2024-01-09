import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb } from "@utils/database";
import Admin from "@models/admin";
import bcrypt from 'bcrypt';

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {},

        async authorize(credentials) {
          try {
            await connectToDb();

            const admin = await Admin.findOne({
              email: credentials.email,
            })

            if (!admin) throw new Error('Wrong Credentials.');
            const isCorrect = await bcrypt.compare(credentials.password,admin.password);
            if (!isCorrect) throw new Error('Wrong Credentials.');
            return { ...admin.toObject(), id: admin._id.toString() };

          } catch (error) {
            console.error("Authentication error:", error);
            throw new Error('Something went wrong.');
          }
        },
      }),
    ],

    callbacks: {
        async session({ session, user }) {
        if (user) {
          session.user.email = user.email;
          session.user.id = user.id;
        }
        return session;
      }
    },

    pages: {
      signIn: "/",
    },
  };

  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };