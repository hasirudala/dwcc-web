import isNil from 'lodash/isNil'

export const isDevEnv = process.env.NODE_ENV === "development"

export const googleIdentityClientId = process.env.REACT_APP_GOOGLE_IDENTITY_CLIENT_ID

export const allowedHostedDomain = process.env.REACT_APP_GOOGLE_IDENTITY_ALLOWED_HOSTED_DOMAIN

export const asAdmin = process.env.REACT_APP_FAKE_LOGIN_AS === "admin"
                        || isNil(process.env.REACT_APP_FAKE_LOGIN_AS)

export const dummyToken = asAdmin ? 'ADMIN' : 'USER'

const dummyAdmin = {
    email: "dummyadmin@dev.env",
    name: "Dummy Admin",
    isAdmin: true
}

const dummyNonAdmin = {
    email: "dummyuser@dev.env",
    name: "Dummy NonAdmin",
    isAdmin: false
}

export const devAuthState = {
    initializedGoogleAuth: true,
    isSignedIn: true,
    userInfo: asAdmin ? dummyAdmin : dummyNonAdmin,
    signIn: () => {},
    signOut: () => {}
}
