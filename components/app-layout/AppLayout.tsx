// import { Layout } from 'antd'
// import * as React from 'react'
// import { Affix } from 'antd'

// import AppBar from '../common/AppBar'
// import AppLayoutMenu from '../common/AppLayoutMenu'
// import { UserContext } from '../../context/UserContext'

// const AppLayout: React.FC = ({ children }) => {
//     const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false)
//     const { isLoggedIn } = React.useContext(UserContext)

//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//             <AppBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
//             <Layout className="site-layout">
//                 {isLoggedIn && <AppLayoutMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
//                 <Affix offsetTop={10}>
//                     <Layout.Content style={{ margin: '16px' }}>{children}</Layout.Content>
//                 </Affix>
//             </Layout>
//         </Layout>
//     )
// }

import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
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
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
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
