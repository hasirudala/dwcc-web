import React from 'react'

const shape = {
    initializedGoogleAuth: false,
    isSignedIn: false,
    userInfo: {},
    signIn: () => {},
    signOut: () => {}
}

export const AuthContext = React.createContext(shape)
