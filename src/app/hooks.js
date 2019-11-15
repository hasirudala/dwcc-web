import { useState, useEffect } from 'react'
import isNil from "lodash.isnil"

import { googleIdentityClientId } from "../common/constants"


export default function useAuth() {
    const [googleAuthApi, setGoogleAuthApi] = useState(null)
    const [isSignedIn, setSignedIn] = useState(false)

    function signIn(onSuccessCb) {
        googleAuthApi.signIn().then(user => {
            onSuccessCb(user)
            setSignedIn(true)
        })
    }

    function signOut() {
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