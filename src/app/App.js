import React from 'react'
import isNil from 'lodash.isnil'
import axios from 'axios'

import useAuth from './hooks'
import { AuthContext } from '../common/AuthContext'
import Routes from './Routes'
import SignInPage from './SignInPage'


const initAxios = googleUser => {
    axios.defaults.baseURL = '/api'
    axios.defaults.headers.common['Authorization'] = `Bearer ${googleUser.getAuthResponse().id_token}`
}

const resetAxios = () => axios.defaults.headers.common['Authorization'] = ''

function App() {
    const authState = useAuth(initAxios, resetAxios)

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
                    <SignInPage />
            }
        </AuthContext.Provider>
    )
}

export default App
