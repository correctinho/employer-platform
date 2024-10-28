import { NextAuthConfig } from "next-auth"
import { NextResponse } from "next/server";


export const authConfig = {
    providers: [],
    pages: {
        signIn: '/'
    },
    callbacks: {

        jwt: async ({ token, user, trigger, session }) => {
            if (trigger === "signIn") {
                user && (token.user = user)

                return token

            }
            if (trigger === "update" && session) {
                token.user = session.user
                return { ...token, ...session.user }
            }
            return token
        },
        session: async ({ session, token }: any) => {
            session.user = token.user
            return session
        },
        authorized: async ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            if (!isLoggedIn) return false

            const session = auth?.user

            const isOnLoginPage = nextUrl.pathname.startsWith("/");
            const isOnHomePage = nextUrl.pathname.startsWith('/dashboard');
            const isOnProfilePage = nextUrl.pathname === ('/dashboard/settings/profile')

            if (isOnLoginPage && isLoggedIn && !isOnHomePage) {
                return NextResponse.redirect(new URL("/dashboard", nextUrl));
            }

            if(isLoggedIn && session.status === 'pending_password' && !isOnProfilePage){
                return NextResponse.redirect(new URL("/dashboard/settings/profile", nextUrl));
            }

            return true
        },

    }
} satisfies NextAuthConfig;
