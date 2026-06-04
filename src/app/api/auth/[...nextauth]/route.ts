import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          if (!user || !user.password) return null;
          const valid = await bcrypt.compare(credentials.password, user.password);
          if (!valid) return null;
          return { id: user._id.toString(), name: user.name, email: user.email, image: user.image };
        } catch (err) {
          console.error('Auth error:', err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google') {
        try {
          await dbConnect();
          const existing = await User.findOne({ email: user.email });
          if (!existing) {
            await User.create({ name: user.name, email: user.email, provider: 'google', image: user.image });
          }
        } catch (err) {
          console.error('Google signIn DB error:', err);
        }
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) session.user.id = token.id;
      return session;
    },
  },
  pages:   { signIn: '/login', error: '/login' },
  session: { strategy: 'jwt' as const, maxAge: 30 * 24 * 60 * 60 },
  secret:  process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
