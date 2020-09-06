import React, {useState, useEffect}  from "react"
import { Button } from "@material-ui/core"

export const ChooseModal = () => {
    const [modals, setmodals] = useState([])

    const setState = () => {
        // let localData = JSON.parse(localStorage.getItem('user'))

        const getResponse = async () => {
            await fetch(
                "https://api.npoint.io/b193d8223deb9497a4e3",
                {
                    method: "GET",
                    // headers: {
                    //     email: localData.email,
                    //     authorization: localData.token
                    // }
                }
            ).then( res => res.json())
                .then( (data) => {
                    setmodals([...data.data.modals])
                })
        }

        getResponse()
    }

    useEffect(() => {
        setState()
    })

    return(
        <div>
            {
                modals.map( (val) => {
                    console.log(val)
                    return(
                        <Button variant="outlined"> Hi </Button>
                    )
                })
            }
        </div>
    )
}