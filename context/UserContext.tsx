import * as React from 'react'

export interface IUserState {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
    iat: number
}

export interface IUserContext {
    userState: IUserState
    setUserState: (userState: IUserState) => void
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext)

const UserContextProvider: React.FC = ({ children }) => {
    const [userState, setUserState] = React.useState({} as IUserState)

    return <UserContext.Provider value={{ userState, setUserState }}>{children}</UserContext.Provider>
}

export default UserContextProvider