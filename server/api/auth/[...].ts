import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

const runtimeConfig = useRuntimeConfig()

// 打登入API
// const loginAPI = async () => {
//   const res = await $fetch("/api/login");
//   console.log(res);
// };

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: runtimeConfig.public.GOOGLE_CLIENT_ID,
            clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET
        }),
// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: "Credentials",
          credentials: {
            login: { label: "Login", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials: any) {
            try {



              return 'user';
            } catch (error) {
              // console.warn("Error logging in", error);
              return null;
            }
          },
        }),
    ],
    // callbacks: {
    //   jwt: ({ token, user }) => {
    //     const isSignIn = !!user
    //     token.isSignIn = isSignIn
    //     return Promise.resolve(token)
    //   },
    //   // 把token裡面添加的資料傳到session
    //   session: ({ session, token }) => {
    //     ;(session as any).isSignIn = token.test
    //     return Promise.resolve(session)
    //   },
    // },
})
