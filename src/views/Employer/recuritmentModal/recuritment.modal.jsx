import React from "react"
import Grid from '@material-ui/core/Grid';

import {NewModal} from "./new.modal"
import {ShowModals} from "./show.modals"
import { ModalContext } from "../../../contexts/modal.context"
import { useContext, useEffect } from "react";

export const RecuritmentModal = () => {
    const modalStatus = useContext(ModalContext)

    const setState = () => {
    // let localData = JSON.parse(localStorage.getItem('user'))

        const getResponse = async () => {
            await fetch(
                "https://api.npoint.io/dd280a79f9e3c174b28f",
                {
                    method: "GET",
                    // headers: {
                    //     email: localData.email,
                    //     authorization: localData.token
                    // }
                }
            ).then( res => res.json())
                .then( (data) => {
                    // let listModalName = []

                    // data.data.map( (val) => {
                    //     if (modalStatus.modals.indexOf(val.name) === -1) {
                    //         listModalName.push(val.name)
                    //     }
                    // })

                    modalStatus.setModals(data.data)
                })
            }

        getResponse()
    }

    useEffect(() => {
        setState()

        // eslint-disable-next-line
    }, [])

    return(
        <Grid container>
            <Grid item xs={9}>
                List of Available Recuritment Modals
            </Grid>
            <Grid item xs={3}>
                <NewModal />
            </Grid>
            <Grid item xs={12}>
                <ShowModals data={modalStatus.modals} />
            </Grid>
        </Grid>
    )
}