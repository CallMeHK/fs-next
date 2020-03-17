import * as React from 'react'
import { Layout } from 'antd'
import { Button } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { UserContext } from '../../context/UserContext'

interface Props {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const AppBar: React.FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
    const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext)

    return (
        <div>
            <Layout.Header  style={{ padding: 0 }}>
                <div className="scoped-app-bar">
                    {isLoggedIn ? (
                        <>
                            <div onClick={() => setIsCollapsed(c => !c)}>{isCollapsed ? <MenuUnfoldOutlined className="scoped-menu-icon" /> : <MenuFoldOutlined className="scoped-menu-icon" />}</div>
                            <Button onClick={() => setIsLoggedIn(false)} className="scoped-login-button" type="primary">
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <div />
                            <Button className="scoped-login-button" type="primary" onClick={() => setIsLoggedIn(true)}>
                                Sign in
                            </Button>
                        </>
                    )}
                </div>
                {}
            </Layout.Header>
            <style jsx global>{`
                .scoped-menu-icon {
                    color: white;
                    font-size: 40px;
                    margin: 8px;
                    cursor: pointer;
                }
                .scoped-app-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 100%;
                }
                .scoped-login-button {
                    margin: 10px;
                }
            `}</style>
        </div>
    )
}

export default AppBar
