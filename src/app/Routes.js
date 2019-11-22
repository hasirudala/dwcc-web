import React, { useContext } from 'react'
import { Route, Link, Switch } from "react-router-dom"

import DwccAdmin from "../admin"
import { AuthContext } from "../common/AuthContext"


function Home() {
    const { signOut, userInfo } = useContext(AuthContext)
    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-auto w-50 min-vh-100">
            <h6>Welcome <u>{userInfo.name}</u></h6>
            <br />
            <h1>Under Construction</h1>
            <br />
            <Link to="/admin/">React Admin</Link>
            <br />
            <Link to="/abc/">Another Page</Link>
            <br />
            <button onClick={signOut}>Sign out</button>
        </div>
    )
}

const AnotherPage = () => <div>Another Page</div>


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/admin" component={DwccAdmin} />
            <Route exact path="/abc" component={AnotherPage} />
        </Switch>
    )
}
