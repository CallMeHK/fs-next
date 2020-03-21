import * as React from 'react'
import { UserContext } from '../../context/UserContext'
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import * as AppLayout from './AppLayout'
import Button from '@material-ui/core/Button'
import SignedInUserMenu from './SignedInUserMenu'
import { useRouter } from 'next/router'

interface Props {
    handleDrawerToggle: () => void
}

const AppLayoutBar: React.FC<Props> = ({ handleDrawerToggle }) => {
    const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext)
    const router = useRouter()
    const classes = AppLayout.useStyles()

    const goToLoginPage = React.useCallback(() => {
        router.push('/login')
    }, [router])

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Character Generator
                    </Typography>
                </Toolbar>
                <Toolbar>
                    {isLoggedIn ? (
                        <SignedInUserMenu />
                    ) : (
                        <Button variant="contained" onClick={goToLoginPage}>
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </Grid>
        </AppBar>
    )

    // return (
    //     <div>
    //         <Layout.Header  style={{ padding: 0 }}>
    //             <div className="scoped-app-bar">
    //                 {isLoggedIn ? (
    //                     <>
    //                         <div onClick={() => setIsCollapsed(c => !c)}>{isCollapsed ? <MenuUnfoldOutlined className="scoped-menu-icon" /> : <MenuFoldOutlined className="scoped-menu-icon" />}</div>
    //                         <Button onClick={() => setIsLoggedIn(false)} className="scoped-login-button" type="primary">
    //                             Log out
    //                         </Button>
    //                     </>
    //                 ) : (
    //                     <>
    //                         <div />
    //                         <Button className="scoped-login-button" type="primary" onClick={() => setIsLoggedIn(true)}>
    //                             Sign in
    //                         </Button>
    //                     </>
    //                 )}
    //             </div>
    //             {}
    //         </Layout.Header>
    //         <style jsx global>{`
    //             .scoped-menu-icon {
    //                 color: white;
    //                 font-size: 40px;
    //                 margin: 8px;
    //                 cursor: pointer;
    //             }
    //             .scoped-app-bar {
    //                 display: flex;
    //                 align-items: center;
    //                 justify-content: space-between;
    //                 width: 100%;
    //                 height: 100%;
    //             }
    //             .scoped-login-button {
    //                 margin: 10px;
    //             }
    //         `}</style>
    //     </div>
    // )
}

export default AppLayoutBar
