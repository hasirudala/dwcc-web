import React from 'react'

import './App.css'
import useAuth from './hooks'
import { AuthContext } from '../common/AuthContext'
import Routes from './Routes'
import LandingPage from './LandingPage'

function App() {
    const authState = useAuth()
    window.googleAuthApi = authState.googleAuthApi
    return (
        <AuthContext.Provider value={authState}>
            {
                authState.isSignedIn ?
                    <Routes />
                    :
                    <LandingPage />
            }
        </AuthContext.Provider>
    )
}

export default App
