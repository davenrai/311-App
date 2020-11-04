import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from './AuthOptions'
import logo from '../toronto_logo.png'
import "../App.css"

export default function Header() {
    return (
        <header className="site-header">
            <img src={logo} alt="311" width='85px'></img>
            <Link to="/">
                <h1>311 - Your City at Your Service</h1>
            </Link>
            <AuthOptions />
        </header>
    )
}
