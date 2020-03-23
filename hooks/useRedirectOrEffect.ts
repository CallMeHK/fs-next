import * as React from 'react'
import { useRouter } from "next/router"
import { UserContext } from "../context/UserContext"


const useRedirectOrEffect = (fn: () => void, deps: any[]) => {
    const router = useRouter()
    const user = React.useContext(UserContext)

    React.useEffect(() => {
        if(!user.isLoggedIn){
            router.push('/login')
        } else {
            fn()
        }
    }, deps)


}

export default useRedirectOrEffect