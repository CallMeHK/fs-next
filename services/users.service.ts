import { CrudServiceFactory } from './crud.service'
import { PasswordService } from './password.service'
import { tryCatchP } from '../utils/try-catch'
import { SuccessWrapper } from '../utils/common.interface'

export interface UsersTable {
    id?: number
    username: string
    email: string
    password: string
    role: 'user' | 'admin'
    active?: boolean
    created_at?: string
}

const UsersServiceFactory = () => {
    const usersCrudService = CrudServiceFactory<UsersTable>('users')

    const createUser = tryCatchP(
        async (username: string, email: string, password: string): Promise<SuccessWrapper<Omit<UsersTable, 'password'>>> => {
            const isUserValid = username && email && password
            if (!isUserValid) {
                return {
                    success: false,
                    error: new Error('All user parameters not provided')
                }
            }

            const userExistsResponse = await usersService.find({username, email}, 'OR')

            if(userExistsResponse.success){
                return {
                    success: false,
                    error: new Error('User already exists')
                }
            }

            const hash = await PasswordService.hash(password)
            if (!hash.success) {
                return {
                    success: false,
                    error: hash.error
                }
            }
            const response = await usersService.create({ username, email, password: hash.data?.hash, role: 'user' })
            if (!response.success) {
                return {
                    success: false,
                    error: response.error
                }
            }

            const newUser = {
                ...response.data,
                password: undefined
            }

            return {
                success: true,
                data: newUser
            }
        }
    )

    const findUserNoPassword = async (searchParams: Partial<UsersTable>) => {
        const findUserResponse = await usersService.findOne(searchParams)

        const { success, data, error } = findUserResponse

        if(!success){
            return {
                success: false,
                error
            }
        }

        const responseNoPassword = {
            ...data,
            password: undefined
        }

        return {
            success: true,
            data: responseNoPassword
        }
    }

    const usersService = { ...usersCrudService, createUser, findUserNoPassword }

    return usersService
}

const UsersService = UsersServiceFactory()

export { UsersService }
