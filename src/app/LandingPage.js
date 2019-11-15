import React from 'react'

import logo from '../img/logo.png'
import Login from './Login'


export default function LandingPage() {
    return (
        <div className="App">
            <header className="App-header">
                <h2 className="App-title">DWCC MIS</h2>
                <br />
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <Login />
            </header>
        </div>
    )
}
