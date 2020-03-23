import { request } from './fetch.service'
import { LoginApiPost } from '../pages/api/auth/login'

const UserApiServiceFactory = () => {
    const login = async (email: string, password: string): Promise<LoginApiPost> => {
        try {
            const loginUserResponse = await request.post<LoginApiPost>('/api/auth/login', { email, password })
            return loginUserResponse
        } catch (e) {
            return {
                success: false,
                error: 'Service unavailable, please try again later.'
            }
        }
    }

    const userApiService = { login }

    return userApiService
}

const UserApiService = UserApiServiceFactory()

export { UserApiService }
