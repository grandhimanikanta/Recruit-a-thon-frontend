import React, {useEffect} from 'react'
import { useState } from 'react'

export const UserContext = React.createContext()

export const UserContextProvider = (props) => {
    const [userState, setUserState] = useState({
        isUserSignIn: false,
        userData: []
    })

    const setState = () =>    {
        let localData = JSON.parse(localStorage.getItem('user'))
        console.log("sdfghjhtfdfgh")
        if(localData != null) {
            const getResponse = async () => {
                await fetch(
                    "http://localhost:8080/",
                    {
                        method: "GET",
                        headers: {
                            email: localData.email,
                            authorization: localData.token
                        }
                    }
                ).then(res => res.json())
                    .then(data => {
                        
                        if (data.status === "TokenExpiredError") {
                            setUserState((userdata) => {
                                userdata.isUserSignIn = false
                                userdata.userData = {}
                                return ({...userdata})
                            })
                        } else {
                            setUserState((userdata) => {
                                userdata.isUserSignIn = true
                                userdata.userData = data.todoList
                                return ({...userdata})
                            })
                        }
                    })
            }
            getResponse()
        } else {
            setUserState( (userdata) => {
                userdata.isUserSignIn = false
                userdata.userData= {}
                return ({...userdata})
            })
        }
    }

    useEffect(() => {
        setState()
    }, [])

    const signIn = (username, password) => {
        const getResponse = async () => {
            await fetch(
                "http://localhost:8080/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: username,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if(data.status === "UserDoesntExits"){
                        setUserState( (userdata) => {
                            userdata.isUserSignIn = false
                            userdata.userData= {}
                            return ({...userdata})
                        })
                    } else {
                        localStorage.setItem('user', JSON.stringify({
                            email: data.email,
                            token: data.token
                        }))
                        setUserState( (userdata) => {
                            userdata.isUserSignIn = true
                            userdata.userData= {}
                            return ({...userdata})
                        })
                    }
                })
        }
        getResponse()
    }

    const signOut = () => {
        localStorage.setItem('user', JSON.stringify({
            email: "",
            token: ""
        }))
        setUserState( (userdata) => {
            userdata.isUserSignIn = false
            userdata.userData= {}
            return ({...userdata})
        })
    }

    return(
        <UserContext.Provider
            value={{
                user: {
                    userSignInStatus: userState.isUserSignIn,
                    signIn: signIn,
                    signOut: signOut,
                    data: userState.userData,
                    state : setState
                }
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
