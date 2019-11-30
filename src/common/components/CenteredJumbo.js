import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default ({ children }) =>
    <Jumbotron
        children={children}
        className="d-flex flex-column justify-content-center align-items-center m-auto min-vh-100" />
