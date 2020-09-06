import React, {useEffect} from 'react'
import { useState } from 'react'

export const UserContext = React.createContext()


export const UserContextProvider = (props) => {
    const [userState, setUserState] = useState({
        email: "",
        isUserSignIn: true    // change this during testing
    })

    const setState = () =>    {
        let localData = JSON.parse(localStorage.getItem('user'))
        
        if(localData != null) {
            const getResponse = async () => {
                await fetch(
                    "http://localhost:8080/api/userstatus",
                    {
                        method: "GET",
                        headers: {
                            email: localData.email,
                            authorization: localData.token
                        }
                    }
                ).then(res => res.json())
                    .then(data => {
                        
                        if (data.message === "TokenExpiredError") {
                            setUserState((userdata) => {
                                userdata.email = ""
                                userdata.isUserSignIn = false
    
                                return ({...userdata})
                            })
                        } else {
                            setUserState((userdata) => {
                                userdata.email = data.email
                                userdata.isUserSignIn = true
    
                                return ({...userdata})
                            })
                        }
                    })
            }
            getResponse()
        } else {
            setUserState( (userdata) => {
                userdata.email = ""
                userdata.isUserSignIn = false

                return ({...userdata})
            })
        }
    }

    useEffect(() => {
        setState()
    }, [])

    const signIn = (username, password) => {
        const getResponse = async () => {
            // Request
            await fetch(
                "http://localhost:8080/api/login",
                {
                    method: "GET",
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

                    // if user doesnt exit
                    if(data.message === "UserDoesntExits"){
                        setUserState( (userdata) => {
                            userdata.email = ""
                            userdata.isUserSignIn = false

                            return ({...userdata})
                        })
                    } else {

                        // storing data to local storage
                        localStorage.setItem('user', JSON.stringify({
                            email: data.email,
                            token: data.token
                        }))

                        setUserState( (userdata) => {
                            userdata.email = data.username
                            userdata.isUserSignIn = true

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
            userdata.email= ""

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
