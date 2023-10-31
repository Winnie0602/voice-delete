import { getServerSession } from '#auth'

// users資料庫


export default eventHandler(async (event: any) => {
  // console.log(event)
  const session = await getServerSession(event)
  // 沒登入即顯示此訊息
  if (!session) {
    return { status: 'unauthenticated!' }
  }

  const user = await $fetch('https://api-v2-test.mirrorvoice.com.tw/oauth/requestToken', {
    query: {
      'client-id': '920ad8df-b0f3-4c13-ad96-889e1e5c92d8',
      'client-secret':'VsyHHqSoVz1FSCJZXhXEdvzGptomZC5gd6uaGZ6E',
      login: 'winniechang@mirrormedia.mg',
      password: 'Winnie6622'
    }
  })

  return user
})
