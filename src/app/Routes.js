import React from 'react'
import { Route, Switch } from "react-router-dom"

import DwccAdmin from "../admin"
import Home from '../home'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/admin" component={DwccAdmin} />
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}
