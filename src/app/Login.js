import React, { useContext } from 'react'
import LoaderButton from 'react-bootstrap-button-loader'

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
    const { signIn, isSigningIn } = useContext(AuthContext)
    return (
        <LoaderButton onClick={signIn}
                      loading={isSigningIn}
                      style={btnStyle}
        />
    )
}
