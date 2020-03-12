import { CrudServiceFactory } from './crud.service'
import { PasswordService } from './password.service'
import { tryCatchP } from '../utils/try-catch'
import { SuccessWrapper } from '../utils/common.interface'

interface UsersTable {
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
            const hash = await PasswordService.hash(password)
            if (!hash.success) {
                return {
                    success: false,
                    error: hash.error
                }
            }
            const response = await usersCrudService.create({ username, email, password: hash.data?.hash, role: 'user' })
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

    const usersService = { ...usersCrudService, createUser }

    return usersService
}

const UsersService = UsersServiceFactory()

export { UsersService }
