import React, { useContext } from 'react'

import './App.css'
import useAuth from './hooks'
import { AuthContext } from "../common/AuthContext"
import Routes from './routes'

function Login(props) {
    const { signIn } = useContext(AuthContext)
    return (
        <button onClick={ signIn }>Sign In</button>
    )
}

function App() {
    const authState = useAuth()
    return (
        <AuthContext.Provider value={authState}>
            {
                authState.isSignedIn ?
                    <Routes />
                    :
                    <Login />
            }
        </AuthContext.Provider>
    )
}

export default App
