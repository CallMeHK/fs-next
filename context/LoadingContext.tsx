import * as React from 'react'

export interface ILoadingContext {
    isLoading: boolean
    message?: string
}

export const UserContext = React.createContext<ILoadingContext>({} as ILoadingContext)

