import { AppProps } from 'next/app'
import AllContextsProvider from '../context/AllContextsProvider'
import AppLayout from '../components/app-layout/AppLayout'
import 'typeface-roboto'
import { ThemeProvider } from '@material-ui/core'
import DarkTheme from '../theme/theme'

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={DarkTheme}>
        <AllContextsProvider>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </AllContextsProvider>
    </ThemeProvider>
)

export default MyApp
