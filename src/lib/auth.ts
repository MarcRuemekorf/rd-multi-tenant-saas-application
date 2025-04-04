import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/db/queries";
import { compare } from "@/lib/bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await getUserByEmail(credentials!.email);
                if (!user) return null;

                const isValid = await compare(credentials!.password, user.password);
                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    tenantId: user.tenantId,
                };
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            // if (token.tenantId) {
            //     session.user.tenantId = token.tenantId as string
            // }

            console.log(session)
            return session;
        },
    },
    pages: {
        signIn: "/signIn",
    }
}