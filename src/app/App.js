import React, { useContext } from 'react'

import './App.css'
import useAuth from './hooks'
import { AuthContext } from "../common/AuthContext"
import Routes from './routes'

function Login(props) {
    const { signIn } = useContext(AuthContext)
    const afterSignIn = (user) => {
        fetch("/api/yolo", {
            headers: {
                "Authorization": `Bearer ${user.getAuthResponse().id_token}`
            }
        })
        .then(data => data.text())
        .then(alert)
        .catch(console.error)
    }
    return (
        <button onClick={() => signIn(afterSignIn)}>Sign In</button>
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
