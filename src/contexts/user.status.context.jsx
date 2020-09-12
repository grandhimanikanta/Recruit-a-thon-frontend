import React, {useEffect} from 'react'
import { useState } from 'react'

export const UserContext = React.createContext()


export const UserContextProvider = (props) => {
    const [userState, setUserState] = useState({
        email: "",
        isUserSignIn: false    // change this during testing
    })

    const setState = () =>    {
        let localData = JSON.parse(localStorage.getItem('user'))
        console.log("Local", localData)
        if(localData != null) {
            const getResponse = async () => {
                await fetch(
                    "https://cors-anywhere.herokuapp.com/https://recrtuit-a-thon.herokuapp.com/users/verify_login/",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: localData.email,
                            token: localData.token,
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => res.json())
                    .then(data => {
                        console.log("verify data", data)

                        if (data.message === "No user found") {
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
        console.log("user context")
    }, [])

    const signIn = (username, password) => {
        const getResponse = async () => {
            // Request
            console.log(username, password)
            await fetch(
                "https://cors-anywhere.herokuapp.com/https://recrtuit-a-thon.herokuapp.com/users/login/",
                {
                    method: "POST",
                    body: JSON.stringify({
                        "username" : username,
                        "password" : password
                    }),
                    headers: {
                        "Content-Type" : "application/json"
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
                            email: data.username,
                            token: data.Token.auth_token
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
