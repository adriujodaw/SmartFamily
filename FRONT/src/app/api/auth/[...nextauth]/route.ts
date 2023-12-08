import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "correo", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              correo: credentials?.correo,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();


        if (user.message) throw user;

        else{
          return user['userCookie'];
        }
        
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if(trigger === "update") {
        return {...token, ...session.user};
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },

  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };

