import React from 'react'

const shape = {
    isSignedIn: false,
    signIn: () => {},
    signOut: () => {},
    googleAuthApi: {},
}

export const AuthContext = React.createContext(shape)
