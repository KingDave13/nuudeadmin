import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb } from "@utils/database";
import Admin from "@models/admin";

const handler = NextAuth({
    providers: [
      Providers.Credentials({
        async authorize(credentials) {
          try {
            await connectToDb();
            const admin = await Admin.findOne({
              email: credentials.email,
              password: credentials.password,
            });
  
            if (admin) {
              return Promise.resolve({ id: admin.userId, email: admin.email });
            } else {
              return Promise.resolve(null);
            }
          } catch (error) {
            console.error("Authentication error:", error);
            return Promise.resolve(null);
          }
        },
      }),
    ],
    callbacks: {
      session: async (session, user) => {
        return Promise.resolve({ ...session, user: { id: user.id, email: user.email } });
      },
    },
    pages: {
      signIn: "/login",
    },
  });