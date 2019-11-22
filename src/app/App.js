import React from 'react'
import isNil from 'lodash.isnil'
import axios from 'axios'

import './App.css'
import useAuth from './hooks'
import { AuthContext } from '../common/AuthContext'
import Routes from './Routes'
import LandingPage from './LandingPage'


const initAxios = googleUser => {
    axios.defaults.baseURL = '/api'
    axios.defaults.headers.common['Authorization'] = `Bearer ${googleUser.getAuthResponse().id_token}`
}

function App() {
    const authState = useAuth(initAxios)

    if(isNil(authState.googleAuthApi)) // another way of saying isInitializing
        return <div className="App-header">Starting...</div>
    else
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
