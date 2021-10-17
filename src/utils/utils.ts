import { verify } from 'jsonwebtoken'
import { Context } from '../context'
import dotenv from "dotenv"

dotenv.config()

export const APP_SECRET = 'appsecret321'


export function isAdminFromHeader(context: Context) {
  const authToken = context.req.headers.authorization
  if (authToken) {
    //@ts-expect-error
    const verifiedToken = verify(authToken, process.env.JWT_BACKEND_SECRET)
    console.log("inside utils verified token",verifiedToken);
    //@ts-expect-error
    if(verifiedToken?.user?.role == "ADMIN"){
      return true
    }
    return false
    // return verifiedToken && Number(verifiedToken.userId)
  }
}
