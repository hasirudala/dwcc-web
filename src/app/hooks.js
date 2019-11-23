import { useState, useEffect, useCallback } from 'react'
import isNil from 'lodash.isnil'
import axios from 'axios'

import { googleIdentityClientId, allowedHostedDomain } from "../common/constants"


export default function useAuth(setAuthHeaderFn, unsetAuthHeaderFn) {
    const [state, setState] = useState({
        googleAuthApi: null,
        isSignedIn: false,
        userInfo: {},
    })

    const gAuthApi = state.googleAuthApi

    const setGoogleAuthApi = useCallback(authObj => {
        setState(prevState => ({ ...prevState, googleAuthApi: authObj }))
    }, [setState])

    const setSignedOut = useCallback(() => {
        setState(prevState => ({ ...prevState, userInfo: {}, isSignedIn: false }))
        unsetAuthHeaderFn()
    }, [setState, unsetAuthHeaderFn])

    const signOut = () => {
        gAuthApi.signOut().then(setSignedOut)
    }

    const setUserInfoAndSignedIn = useCallback(userInfo => {
        setState(prevState => ({ ...prevState, userInfo, isSignedIn: true }))
    }, [setState])

    const setAllStateOnSignIn = useCallback(googleAuthApi =>
            userInfo => setState({ googleAuthApi, userInfo, isSignedIn: true })
        , [setState])

    const onSuccessfulSignIn = useCallback((gAuthUser, onFetchUserInfo) => {
        setAuthHeaderFn(gAuthUser)
        fetchUserInfo(onFetchUserInfo)
    }, [setAuthHeaderFn])

    const signIn = () => {
        gAuthApi
        .signIn({ prompt: 'select_account' })
        .then(user => onSuccessfulSignIn(user, setUserInfoAndSignedIn))
    }

    const onInitAuthApi = useCallback(auth => {
        if (auth.isSignedIn.get()) {
            onSuccessfulSignIn(auth.currentUser.get(), setAllStateOnSignIn(auth))
        }
        // so that App re-renders and then renders LandingPage
        else setGoogleAuthApi(auth)
    }, [onSuccessfulSignIn, setAllStateOnSignIn, setGoogleAuthApi])

    useEffect(() => {
        if (!isNil(window.gapi) && isNil(gAuthApi)) {
            initAuthApi(onInitAuthApi)
        }
    }, [gAuthApi, onInitAuthApi])

    return { ...state, signIn, signOut }
}

function initAuthApi(onInit) {
    window.gapi.load('auth2', () => {
        window
        .gapi
        .auth2
        .init({
            client_id: googleIdentityClientId,
            hosted_domain: allowedHostedDomain
        })
        .then(onInit, /* onError */alert)
    })
}

function handleNonOk(response) {
    if (response.status === 401 || response.status === 403)
        throw Error("You do not have permissions to access this application. " +
            "Contact your organisation's administrator")
    throw Error("Unable to validate credentials")
}


const fetchUserInfo = (onSuccess) =>
    axios.get('/users/self')
    .then(({ data }) => onSuccess(data))
    .catch(error => {
        if (error.response) handleNonOk(error.response)
        else throw error
    })
    .catch(error => {
        alert(error.message)
    })

