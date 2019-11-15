import React, { useContext } from 'react'
import { Route, Link, Switch } from "react-router-dom"

import DwccAdmin from "../admin/DwccAdmin"
import logo from '../logo.png'
import { AuthContext } from "../common/AuthContext"


function Home() {
    const { signOut } = useContext(AuthContext)
    return (
        <div className="App">
            <header className="App-header">
                <h2 className="App-title">Hasirudala DWCC</h2>
                <br />
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <Link to="/admin/"><span className="App-link">React Admin</span></Link>
                <br />
                <Link to="/abc/"><span className="App-link">Another Page</span></Link>
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
