import React, { useEffect, useState } from "react"

import {Employer} from "./Employer/main"
import {Employee} from "./Employee/main"

export const AppView = () => {
    const [userData, setUserData] = useState({
        isRecruiter: true,
        data: {}
    })

    // const setState = () => {
    //     let localData = JSON.parse(localStorage.getItem('user'))

    //     const getResponse = async () => {
    //         await fetch(
    //             "http://localhost:8080/api/user/data",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     email: localData.email,
    //                     authorization: localData.token
    //                 }
    //             }
    //         ).then( res => res.json())
    //             .then( (data) => {
    //                 setUserData( (userdata) => {
    //                     userdata.isRecruiter = data.isRecruiter
    //                     userdata.data = data.data

    //                     return({...userdata})
    //                 })
    //             })
    //     }

    //     getResponse()
    // }

    // useEffect(() => {
    //     setState()
    // }, [])

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