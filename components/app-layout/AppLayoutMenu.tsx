import * as AppLayout from './AppLayout'
import * as React from 'react'
import { Hidden, Drawer, useTheme } from '@material-ui/core'
import MenuContent from './MenuContent'

interface Props {
    container?: any
    mobileOpen: boolean
    handleDrawerToggle: () => void
}

const AppLayoutMenu: React.FC<Props> = ({ container, mobileOpen, handleDrawerToggle }) => {
    const classes = AppLayout.useStyles()
    const theme = useTheme()

    return (
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    <MenuContent />
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    <MenuContent />
                </Drawer>
            </Hidden>
        </nav>
    )

    // return (
    //     <Layout.Sider trigger={null} breakpoint="sm" collapsedWidth="0" collapsible collapsed={isCollapsed} onCollapse={() => setIsCollapsed(c => !c)}>
    //         <div className="logo" />
    //         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
    //             <Menu.Item key="1">
    //                 <PieChartOutlined />
    //                 <span>Option 1</span>
    //             </Menu.Item>
    //             <Menu.Item key="2">
    //                 <DesktopOutlined />
    //                 <span>Option 2</span>
    //             </Menu.Item>
    //             <Menu.SubMenu
    //                 key="sub1"
    //                 title={
    //                     <span>
    //                         <UserOutlined />
    //                         <span>User</span>
    //                     </span>
    //                 }
    //             >
    //                 <Menu.Item key="3">Tom</Menu.Item>
    //                 <Menu.Item key="4">Bill</Menu.Item>
    //                 <Menu.Item key="5">Alex</Menu.Item>
    //             </Menu.SubMenu>
    //             <Menu.SubMenu
    //                 key="sub2"
    //                 title={
    //                     <span>
    //                         <TeamOutlined />
    //                         <span>Team</span>
    //                     </span>
    //                 }
    //             >
    //                 <Menu.Item key="6">Team 1</Menu.Item>
    //                 <Menu.Item key="8">Team 2</Menu.Item>
    //             </Menu.SubMenu>
    //             <Menu.Item key="9">
    //                 <FileOutlined />
    //             </Menu.Item>
    //         </Menu>
    //     </Layout.Sider>
    // )
}

export default AppLayoutMenu
