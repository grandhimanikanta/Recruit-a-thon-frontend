import React, { useContext } from 'react'
import { Route , Redirect } from 'react-router-dom';

import { UserContext } from "../contexts/user.status.context"


export const ProtectedRoute = ({ component: Component, ...rest}) => {
    const { user } = useContext(UserContext)
    console.log(user)
    if (rest.path === "/"){
        return (
            <Route {...rest} render={props =>
                user.userSignInStatus ? (
                    <Redirect to={"/app"} />
                ) : (
                    <Component {...props} />
                )
            }
            />
        )
    } else {
        return(
            <Route {...rest} render={props =>
                user.userSignInStatus ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={"/"} />
                )
            }
            />
        )
    }
}
