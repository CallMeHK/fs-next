import * as React from 'react'
import { useRouter } from 'next/router'

export interface IUserState {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
    token: string
}

export interface IUserContext {
    isLoggedIn: boolean
    userState?: IUserState
    setUserState: (userState: IUserState) => void
    setIsLoggedIn: (isLoggedIn: boolean) => void
    logInUser: (user: IUserState) => void
    logOutUser: () => void
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext)

const UserContextProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const [userState, setUserState] = React.useState<IUserState>({} as IUserState)
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)

    const logInUser = React.useCallback(
        (user: IUserState) => {
            localStorage.setItem('token', user.token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(user)
            setIsLoggedIn(true)
            router.push('/home')
        },
        [setUserState, setIsLoggedIn, router]
    )

    const logOutUser = React.useCallback(() => {
        localStorage.removeItem('token')
        setUserState({} as IUserState)
        setIsLoggedIn(false)
        router.push('/')
    }, [setUserState, setIsLoggedIn, router])

    return (
        <UserContext.Provider value={{ isLoggedIn, userState, setUserState, setIsLoggedIn, logInUser, logOutUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
