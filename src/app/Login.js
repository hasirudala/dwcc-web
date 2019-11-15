import React, { useContext } from 'react'

import { AuthContext } from "../common/AuthContext"

export default function Login() {
    const { signIn } = useContext(AuthContext)
    return (
        <button onClick={ signIn }>Sign In</button>
    )
}
