import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from './AuthOptions'
import "../App.css"

export default function Header() {
    return (
        <header className="site-header">
            <Link to="/">
                <h1>311 Home</h1>
            </Link>
            <AuthOptions />
        </header>
    )
}
