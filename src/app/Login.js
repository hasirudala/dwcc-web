import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'

import { AuthContext } from "../common/AuthContext"
import btnGoogleSignIn from '../media/btn_google_signin.png'


const btnStyle = {
    background: `url(${btnGoogleSignIn}) no-repeat center`,
    backgroundSize: 'contain',
    width: '256px',
    height: '64px',
    border: 0,
}

export default function Login() {
    const { signIn } = useContext(AuthContext)
    return (
        <Button onClick={ signIn } style={btnStyle}/>
    )
}
