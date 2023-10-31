import { getServerSession } from '#auth'

// users資料庫


export default eventHandler(async (event: any) => {
  // console.log(event)
  const session = await getServerSession(event)
  // 沒登入即顯示此訊息
  if (!session) {
    return { status: 'unauthenticated!' }
  }



  return user
})
