import bcrypt from 'bcrypt'
import { tryCatchP } from '../utils/try-catch'
import { SuccessWrapper } from '../utils/common.interface'

interface HashedPassword {
    hash: string
}

const PasswordServiceFactory = (saltRounds: number) => {

    const hash = tryCatchP(
        async (password: string): Promise<SuccessWrapper<HashedPassword>> => {
            const hash = await bcrypt.hash(password, saltRounds)
            return {
                success: true,
                data: {
                    hash
                }
            }})

     const compare = tryCatchP(
        async (password: string, hashFromDb: string): Promise<SuccessWrapper<{}>> => {
            const isPasswordValid = await bcrypt.compare(password, hashFromDb)
            return {
                success: isPasswordValid
            }})


    
    return {
        hash,
        compare
    }

}

const PasswordService = PasswordServiceFactory(10)

export {
    PasswordService
}
