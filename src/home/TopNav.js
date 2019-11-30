import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Dropdown from "react-bootstrap/Dropdown"

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
                    <Dropdown.Toggle variant="outline-info"
                                     id="userMenu"
                                     style={{ borderRadius: '4px' }}
                    >
                        {userInfo.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ borderRadius: '4px' }}>
                        <Dropdown.Item onClick={signOut}>
                            <span className="oi oi-account-logout"
                                  title="account logout"
                                  aria-hidden="true"/>&nbsp;&nbsp;
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav.Item>
        </Nav>
    )
}
