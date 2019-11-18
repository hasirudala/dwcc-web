import React, { useContext } from 'react'
import { Route, Link, Switch } from "react-router-dom"

import DwccAdmin from "../admin"
import { AuthContext } from "../common/AuthContext"


function Home() {
    const { googleAuthApi, signOut } = useContext(AuthContext)
    const nameOfUser = googleAuthApi.currentUser.get().getBasicProfile().getName()
    return (
        <div className="App">
            <header className="App-header">
                <h6 className="App-title" style={{ fontWeight: 'lighter', marginBottom: "-1.5em" }}>Welcome</h6>
                <h5 className="App-title">{nameOfUser}</h5>
                <br />
                <h3>This app is hatching!</h3>
                <br />
                <Link to="/admin/"><span className="App-link">React Admin</span></Link>
                <br />
                <Link to="/abc/"><span className="App-link">Another Page</span></Link>
                <br />
                <button onClick={signOut}>Sign out</button>
            </header>
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
