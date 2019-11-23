import React from 'react'
import isNil from 'lodash.isnil'
import axios from 'axios'

import useAuth from './hooks'
import { AuthContext } from '../common/AuthContext'
import Routes from './Routes'
import SignInPage from './SignInPage'

axios.defaults.baseURL = '/api'
const setAuthHeader = googleUser => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${googleUser.getAuthResponse().id_token}`
}
const unsetAuthHeader = () => axios.defaults.headers.common['Authorization'] = ''


export default function App() {
    const authState = useAuth(setAuthHeader, unsetAuthHeader)

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
