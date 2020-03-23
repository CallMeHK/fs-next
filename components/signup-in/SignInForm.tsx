import * as React from 'react'
import * as LoginPage from '../../pages/login'
import { TextField, Button, Grid, Link, Typography } from '@material-ui/core'
import { UserApiService } from '../../frontend-services/user.api.service'
import { useRouter } from 'next/router'

const SignInForm: React.FC = () => {
    const classes = LoginPage.useStyles()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const router = useRouter()

    const handleSubmit = React.useCallback(
        async (e: React.BaseSyntheticEvent) => {
            e.preventDefault()
            const userApiResponse = await UserApiService.login(email, password)
            if (!userApiResponse.success) {
                return setErrorMessage(userApiResponse.error)
            }

            const token = userApiResponse.data?.token
            localStorage.setItem('token', token)
            router.push('/home')
        },
        [email, password, router]
    )

    const isSignInDisabled = email !== '' && password !== ''

    return (
        <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div style={{ height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
                {errorMessage !== '' && <Typography variant="subtitle2">{errorMessage}</Typography>}
            </div>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!isSignInDisabled} onClick={handleSubmit}>
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </form>
    )
}

export default SignInForm
