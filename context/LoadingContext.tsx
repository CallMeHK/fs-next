import * as React from 'react'

export interface ILoadingContext {
    isLoading: boolean
    setIsLoading: (setLoadingTo: boolean) => void
}

export const LoadingContext = React.createContext<ILoadingContext>({} as ILoadingContext)

const LoadingContextProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>
}

export default LoadingContextProvider
