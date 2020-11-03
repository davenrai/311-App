import React, {useContext} from 'react'
import { useHistory, Link } from 'react-router-dom'
import UserContext from './context/UserContext'

export default function AuthOptions() {

    const {userData: {token}, setUserData} = useContext(UserContext)

    const logout = () => {
        setUserData({
            token: undefined, 
            user: undefined
        })
        localStorage.setItem("auth-token", "")
    }

    return (
        // <div>
        //     <button>Sign In</button>
        //     <button>Register</button>
        // </div>
        <div>{
            token !== undefined ? (
              <button onClick={logout}>Log out</button>  
            ) :
            (
                <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
                </div>
            )
        }</div>
    )
}
