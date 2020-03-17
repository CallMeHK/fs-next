import * as React from 'react'

export interface IUserState {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
    iat: number
}

export interface IUserContext {
    isLoggedIn: boolean
    userState?: IUserState
    setUserState: (userState: IUserState) => void
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext)

const UserContextProvider: React.FC = ({ children }) => {
    const [userState, setUserState] = React.useState<IUserState>({} as IUserState)
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)

    return <UserContext.Provider value={{ isLoggedIn, userState, setUserState, setIsLoggedIn }}>{children}</UserContext.Provider>
}

export default UserContextProvider
