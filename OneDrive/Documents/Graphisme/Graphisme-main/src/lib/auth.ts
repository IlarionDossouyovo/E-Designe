import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { users } from '@/lib/db/json-db'
import bcrypt from 'bcryptjs'

// Get OAuth credentials from environment
const googleClientId = process.env.GOOGLE_CLIENT_ID || ''
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || ''
const facebookClientId = process.env.FACEBOOK_APP_ID || ''
const facebookClientSecret = process.env.FACEBOOK_APP_SECRET || ''

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials (email/password) - Always available
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis')
        }

        const user = users.getByEmail(credentials.email)

        if (!user || !user.password) {
          throw new Error('Email ou mot de passe incorrect')
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Email ou mot de passe incorrect')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    }),
    
    // Google OAuth - Only if credentials are configured
    ...(googleClientId && googleClientSecret ? [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      })
    ] : []),
    
    // Facebook OAuth - Only if credentials are configured
    ...(facebookClientId && facebookClientSecret ? [
      FacebookProvider({
        clientId: facebookClientId,
        clientSecret: facebookClientSecret,
      })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Handle OAuth sign-in - create/update user in database
      if (account && profile) {
        const email = profile.email
        if (email) {
          let dbUser = users.getByEmail(email)
          
          if (!dbUser) {
            // Create new user from OAuth
            const newUser = {
              id: `oauth-${Date.now()}`,
              email,
              name: profile.name || profile.email?.split('@')[0],
              role: 'client',
              password: undefined, // OAuth users don't have passwords
              provider: account.provider, // 'google' or 'facebook'
              providerId: account.providerAccountId,
              emailVerified: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
            users.create(newUser)
            dbUser = newUser
          } else {
            // Update existing user with OAuth info
            // Cast profile to any to handle different provider profile shapes
            const profileAny = profile as any
            users.update(dbUser.id, {
              provider: account.provider,
              providerId: account.providerAccountId,
              emailVerified: profileAny.email_verified ? new Date().toISOString() : dbUser.emailVerified
            })
          }
          
          token.id = dbUser.id
          token.role = dbUser.role
        }
      }
      
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string
        (session.user as any).id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
