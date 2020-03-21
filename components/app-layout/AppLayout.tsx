import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import AppLayoutBar from './AppLayoutBar'
import AppLayoutMenu from './AppLayoutMenu'

const drawerWidth = 240

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0
            }
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none'
            }
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
)

interface ResponsiveDrawerProps {
   container?: any
}

const AppLayout: React.FC<ResponsiveDrawerProps> = ({ container, children }) => {
    const classes = useStyles()
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppLayoutBar handleDrawerToggle={handleDrawerToggle} />
            <AppLayoutMenu container={container} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
           <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
}

export default AppLayout
