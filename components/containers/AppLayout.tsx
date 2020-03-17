import { Layout } from 'antd'
import * as React from 'react'
import { Button } from 'antd';

import AppBar from '../common/AppBar'
import AppLayoutMenu from '../common/AppLayoutMenu'
import { UserContext } from '../../context/UserContext';

const SiderDemo: React.FC = ({children}) => {
    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false)
    const { isLoggedIn } = React.useContext(UserContext)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Layout className="site-layout">
                {isLoggedIn && <AppLayoutMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />}
                <Layout.Content style={{ margin: '16px' }}>
                {children}
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default SiderDemo
