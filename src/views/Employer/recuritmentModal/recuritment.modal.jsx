import React from "react"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {NewModal} from "./new.modal"
import {ShowModals} from "./show.modals"
import { ModalContext } from "../../../contexts/modal.context"
import { useContext, useEffect } from "react";

const useStyle = makeStyles({
    row1: {
        padding: "14px"
    },
})

export const RecuritmentModal = () => {
    const modalStatus = useContext(ModalContext)
    const classes = useStyle()

    const setState = () => {
    let localData = JSON.parse(localStorage.getItem('user'))

        const getResponse = async () => {
            await fetch(
                // "https://api.npoint.io/dd280a79f9e3c174b28f",
                "https://cors-anywhere.herokuapp.com/https://recrtuit-a-thon.herokuapp.com/roleinfo/",
                {
                    method: "GET",
                    headers: {
                        email: localData.email,
                        token: localData.token,
                        "Content-Type": "application/json"
                    }
                }
            ).then( res => res.json())
                .then( (data) => {                    
                    modalStatus.setModals(data)
                })
            }
            
        getResponse()
    }

    useEffect(() => {
        setState()
        console.log("recrutmanet")
        // eslint-disable-next-line
    }, [])

    return(
        <Grid container>
            <Grid container className={classes.row1}>
                <Grid item xs={9} style={{fontSize: "20px"}}>
                    List of Available Recuritment Modals
                </Grid>
                <Grid item xs={3}>
                    <NewModal modalFunction={setState} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <ShowModals data={modalStatus.modals} modalFunction={setState}/>
            </Grid>
        </Grid>
    )
}