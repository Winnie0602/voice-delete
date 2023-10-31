import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

const runtimeConfig = useRuntimeConfig()

// 打登入API
const loginAPI = async (credentials: any) => {
  return await $fetch('https://api-v2-test.mirrorvoice.com.tw/oauth/requestToken', {
    query: {
      'client-id': process.env.PASSWORD_CLIENT_ID,
      'client-secret': process.env.PASSWORD_CLIENT_SECRET,
      login: credentials.login,
      password: credentials.password
    }
  })
}

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

              const res = await loginAPI(credentials)

              console.log(res)

              return {'access_token': res.access_token, "refresh_token": res.refresh_token};

            } catch (error) {
              console.log(error)
              return null;
            }
          },
        }),
    ],
    callbacks: {
      jwt: ({ token }) => {
        console.log(token)
        token.isSignIn = 123
        return Promise.resolve(token)
      },
      // 把token裡面添加的資料傳到session
      session: ({ session, token }) => {
        ;(session as any).isSignIn = token
        return Promise.resolve(session)
      },
    },
})
