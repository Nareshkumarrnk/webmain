import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from 'lib/dbConnect';
import User from 'models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({ 
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({ 
      clientId: process.env.GITHUB_ID || '', 
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: { 
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' }, 
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' } 
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error('No user found with this email');

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error('Incorrect password');

          return user;
        } catch (error) {
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || '',
};

export default NextAuth(authOptions);
