import React, {useState, useEffect}  from "react"
import { Button } from "@material-ui/core"

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
                    console.log(data)
                    setmodals([...data.data.modals])
                })
        }

        getResponse()
    }

    useEffect(() => {
        setState()
    }, [])

    return(
        <div>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">Select Position</InputLabel>
                <Select
                    // value={state.age}
                    // onChange={handleChange}
                    fullWidth
                    label="Select Position"
                    inputProps={{
                        name: 'Select Position',
                        id: 'outlined-age-native-simple',
                    }}
                >
            {
                modals.map( (val) => {
                    return(
                        <MenuItem value={val.id}>{val.position}</MenuItem>
                    )
                })
            }
                </Select>
            </FormControl>

        </div>
    )
}