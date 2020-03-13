import { PasswordService } from './password.service'
import { tryCatchP, tryCatch } from '../utils/try-catch'
import { SuccessWrapper } from '../utils/common.interface'
import { config } from '../app.config'
import * as jwt from 'jsonwebtoken'

export interface JwtPayload {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
}

const AuthServiceFactory = (secret: string) => {
    // sign token
    // verify token

    const signToken = tryCatch(
        (jwtPayload: JwtPayload): SuccessWrapper<{ token: string }> => {
            const token = jwt.sign(jwtPayload, secret)
            return {
                success: true,
                data: { token }
            }})

    const verifyToken = tryCatch((token: string): SuccessWrapper<JwtPayload> => {
        const decodedToken = jwt.verify(token, secret) as JwtPayload
        return {
            success: true,
            data: decodedToken
        }})

    const authService = {
        signToken,
        verifyToken
    }

    return authService
}

const AuthService = AuthServiceFactory(config.auth.secret)

export { AuthService }
