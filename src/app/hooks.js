import { useState, useEffect } from 'react'
import isNil from "lodash.isnil"

import { googleIdentityClientId, allowedHostedDomain } from "../common/constants"

const checkAuthorization = (idToken) =>
    fetch("/api/checkAuthorization", {
        headers: {
            "Authorization": `Bearer ${idToken}`
        }
    })

const handleNonOk = response => {
    if (response.status === 401 || response.status === 403)
        throw Error("You do not have permissions to access this application. " +
            "Contact your organisation's administrator")
    else if (!response.ok)
        throw Error("Unable to validate credentials")
    return response
}

export default function useAuth() {
    const [googleAuthApi, setGoogleAuthApi] = useState(null)
    const [isSignedIn, setSignedIn] = useState(false)

    const signIn = () => {
        googleAuthApi.signIn().then(user => {
            checkAuthorization(user.getAuthResponse().id_token)
            .then(handleNonOk)
            .then(() => setSignedIn(true))
            .catch(e => {
                googleAuthApi.signOut()
                alert(e)
            })
        })
    }

    const signOut = () => {
        googleAuthApi.signOut().then(() => setSignedIn(false))
    }

    useEffect(() => {
        if (isNil(googleAuthApi)) {
            window.gapi.load('auth2', () => {
                window
                .gapi
                .auth2
                .init({
                    client_id: googleIdentityClientId,
                    hosted_domain: allowedHostedDomain
                })
                .then(auth => {
                    setGoogleAuthApi(auth)
                    if (auth.isSignedIn.get()) setSignedIn(true)
                })
            })
        }
    })

    return {
        isSignedIn,
        signIn,
        signOut,
        googleAuthApi
    }
}