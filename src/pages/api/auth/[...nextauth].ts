import { addUser } from '@/services/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { DefaultSession, Session } from 'next-auth/core/types';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) return false;

      addUser({
        id,
        name: name || '',
        email,
        username: email.split('@')[0],
        image,
      });

      return true;
    },
    async session({ session }) {
      const user = session.user;

      if (user) {
        const username = session.user.email?.split('@')[0];
        session.user = { ...user, username: username || '' };
      }

      return session;
    },
  },
};
export default NextAuth(authOptions);
