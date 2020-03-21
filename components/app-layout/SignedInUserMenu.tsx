import * as React from 'react'
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import { UserContext } from '../../context/UserContext'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const SignedInUserMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        setIsLoggedIn(false)
    }

    return (
        <>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleClick}>
                <AccountCircleIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default SignedInUserMenu
