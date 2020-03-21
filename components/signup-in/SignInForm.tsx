import * as React from 'react'
import * as LoginPage from '../../pages/login'
import { TextField, Button, Grid, Link } from '@material-ui/core'

const SignInForm: React.FC = () => {
    const classes = LoginPage.useStyles()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleSubmit = React.useCallback((e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        

    },[email, password])

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
