import React from 'react'

import './App.css'
import useAuth from './hooks'
import { AuthContext } from '../common/AuthContext'
import Routes from './routes'
import LandingPage from './LandingPage'

function App() {
    const authState = useAuth()
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
