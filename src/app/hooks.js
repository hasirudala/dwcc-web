import { useState, useEffect, useCallback } from 'react'
import isNil from 'lodash.isnil'
import axios from 'axios'

import { googleIdentityClientId, allowedHostedDomain } from "../common/constants"


export default function useAuth(setAuthHeaderFn, unsetAuthHeaderFn) {
    const [state, setState] = useState({
        initializedGoogleAuth: false,
        isSignedIn: false,
        userInfo: {},
    })

    const setInitializedGoogleAuth = useCallback(() => {
        setState(prevState => ({ ...prevState, initializedGoogleAuth: true }))
    }, [setState])

    const setSignedOut = useCallback(() => {
        unsetAuthHeaderFn()
        setState(prevState => ({ ...prevState, userInfo: {}, isSignedIn: false }))
    }, [setState, unsetAuthHeaderFn])

    const signOut = useCallback(() => {
        window.googleAuth
        &&
        window.googleAuth.signOut().then(setSignedOut)
    }, [setSignedOut])

    const setUserInfoAndSignedIn = useCallback(userInfo => {
        // set all state together to prevent re-renders
        setState({ initializedGoogleAuth: true, userInfo, isSignedIn: true })
    }, [setState])

    const onSuccessfulSignIn = useCallback((gAuthUser, onSuccessfulFetch) => {
        setAuthHeaderFn(gAuthUser)
        fetchUserInfo(onSuccessfulFetch).catch(signOut)
    }, [setAuthHeaderFn, signOut])

    const signIn = () => {
        window.googleAuth
        &&
        window.googleAuth
        .signIn({ prompt: 'select_account' })
        .then(user => onSuccessfulSignIn(user, setUserInfoAndSignedIn))
    }

    const onInitAuthApi = useCallback(auth => {
        ////////////////////////
        window.googleAuth = auth
        ///////////////////////
        if (auth.isSignedIn.get()) {
            onSuccessfulSignIn(auth.currentUser.get(), setUserInfoAndSignedIn)
        }
        else {
            setInitializedGoogleAuth()
            // so that App re-renders and then renders LandingPage
        }
    }, [onSuccessfulSignIn, setUserInfoAndSignedIn, setInitializedGoogleAuth])

    useEffect(() => {
        if (!isNil(window.gapi) && isNil(window.googleAuth)) {
            initAuthApi(onInitAuthApi)
        }
    }, [onInitAuthApi])

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
        .then(onInit, error => alert(error.message || JSON.stringify(error)))
    })
}

function handleNonOk(response) {
    switch (response.status) {
        case 401:
        case 403:
            throw Error("You do not have permissions to access this application. "
                + "Contact your organisation's administrator")
        case 504:
            alert("An external service didn't respond. Try again or hit REFRESH on your browser")
            break;
        default:
            console.error(JSON.stringify(response))
            throw Error("Unable to validate credentials")
    }
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
        throw error
    })

