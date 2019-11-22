import React from 'react'

const shape = {
    isSignedIn: false,
    signIn: () => {},
    signOut: () => {},
    googleAuthApi: {},
    userInfo: {}
}

export const AuthContext = React.createContext(shape)
