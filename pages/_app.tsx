import { AppProps } from 'next/app'
import AllContextsProvider from '../context/AllContextsProvider'
import AppLayout from '../components/containers/AppLayout'
import '../less/antd-custom.less'

const MyApp = ({ Component, pageProps }: AppProps) => (
    <AllContextsProvider>
        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>
    </AllContextsProvider>
)

export default MyApp
