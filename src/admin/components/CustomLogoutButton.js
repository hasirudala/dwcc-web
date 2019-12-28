import React, { forwardRef } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'

import { AuthContext} from "../../common/AuthContext"


const CustomLogoutButton = forwardRef((props, ref) => {
    const { signOut } = React.useContext(AuthContext)

    const handleClick = () => {
        signOut()
        window.location.replace('/')
    }

    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
        >
            <ExitIcon /> Logout
        </MenuItem>
    )
})

export default CustomLogoutButton