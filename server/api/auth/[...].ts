import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'

const runtimeConfig = useRuntimeConfig()

type APIResult = {
  token_type?: string,
  expires_in? : string
  access_token? : string
  refresh_token? : string
  result?: "error",
  message?: "Unauthorized"
}

// 打登入API
const loginAPI = async (credentials: any) => {
  const res: APIResult = await $fetch(`${process.env.APIURL}/oauth/requestToken`, {
    query: {
      'client-id': process.env.PASSWORD_CLIENT_ID,
      'client-secret': process.env.PASSWORD_CLIENT_SECRET,
      login: credentials.login,
      password: credentials.password
    }
  })

  return res
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

              // 打登入API
              const res = await loginAPI(credentials)

              // 判斷api回傳失敗or成功
              if (res.access_token) {
                return {'access_token': res.access_token, "refresh_token": res.refresh_token, "1230": 123}
              } else {
                throw new Error('錯誤的帳密')
              }

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
