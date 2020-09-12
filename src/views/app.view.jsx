import React, { useEffect, useState } from "react"

import {Employer} from "./Employer/main"
import {Employee} from "./Employee/main"

export const AppView = () => {
    const [userData, setUserData] = useState({
        isRecruiter: true,
        // data: {}
    })

    const setState = () => {
        let localData = JSON.parse(localStorage.getItem('user'))
        console.log("APp.view", localData)
        if(localData != null){
            const getResponse = async () => {
                await fetch(
                    "https://cors-anywhere.herokuapp.com/https://recrtuit-a-thon.herokuapp.com/isrecruiter/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify({
                            username: localData.email
                        })
                    }
                ).then( res => res.json())
                    .then( (data) => {
                        console.log(data)
                        setUserData( (userdata) => {
                            userdata.isRecruiter = data.isrecruiter
                            // userdata.data = data.isrecruiter

                            return({...userdata})
                        })
                    })
            }

            getResponse()
        }
    }

    useEffect(() => {
        // setState()
    }, [])
    
    return(
        <div>
            {
                (userData.isRecruiter) ?  (
                    <div>
                        <Employer />
                    </div>
                ) : (
                    <div>
                        <Employee />
                    </div>
                )
            }
        </div>
    )
}