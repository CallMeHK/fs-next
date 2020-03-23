import * as React from 'react'
import useRedirectOrEffect from '../hooks/useRedirectOrEffect'

const Home: React.FC = () => {
    useRedirectOrEffect(() => {}, [])
    return <h1>Home</h1>
}

export default Home
