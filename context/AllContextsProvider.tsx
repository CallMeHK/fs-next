import * as React from 'react'

import LoadingContextProvider from './LoadingContext'
import UserContextProvider from './UserContext'

const AllContextsProvider: React.FC = ({ children }) => {
    return (
        <LoadingContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
        </LoadingContextProvider>
    )
}

export default AllContextsProvider
