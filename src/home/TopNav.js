import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Dropdown from "react-bootstrap/Dropdown"
import PersonIcon from '@material-ui/icons/Person'
import SignOutIcon from '@material-ui/icons/ExitToApp'


import links from "../common/links"
import { AuthContext } from "../common/AuthContext"
import './TopNav.css'

export default function TopNav() {
    const { userInfo, signOut } = useContext(AuthContext)
    const navStyle = "d-flex justify-content-end align-items-center"
    return (
        <Nav className={navStyle}>
            {
                userInfo.isAdmin &&
                <Nav.Item>
                    <Link to={links.admin}>Admin</Link>
                </Nav.Item>
            }
            <Nav.Item>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-light"
                                     id="userMenu"
                                     className="d-flex align-items-center"
                    >
                        <PersonIcon className="mr-2" />
                        {userInfo.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={signOut} className="d-flex align-items-end">
                            <SignOutIcon className="mr-2" />
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav.Item>
        </Nav>
    )
}
