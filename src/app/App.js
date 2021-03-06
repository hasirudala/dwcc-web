import React from 'react'
import isNil from 'lodash/isNil'
import axios from 'axios'

import useAuth from './hooks'
import { AuthContext } from '../common/AuthContext'
import Routes from './Routes'
import SignInPage from './SignInPage'
import { isDevEnv, dummyToken } from "../common/constants"
import CenteredJumbo from '../common/components/CenteredJumbo'


///////////////////////////////// Axios setup //////////////////////////////////
axios.defaults.baseURL = '/api'
const setAuthHeader = googleUser => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${googleUser.getAuthResponse().id_token}`
}
const unsetAuthHeader = () => axios.defaults.headers.common['Authorization'] = ''
if (isDevEnv) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${dummyToken}`
}
////////////////////////////////////////////////////////////////////////////////


export default function App() {
    const authState = useAuth(setAuthHeader, unsetAuthHeader)

    if (!isDevEnv && isNil(window.googleAuth))
        return <CenteredJumbo>Starting...</CenteredJumbo>

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
