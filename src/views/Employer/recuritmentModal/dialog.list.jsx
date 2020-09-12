import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';

import {RoundName} from "./Round"
import { useState } from 'react';
import { TextField } from '@material-ui/core';


const useStyle = makeStyles({
    container: {
        width: "100%",
    },
    centerData: {
      display:"flex", 
      alignItems:"center", 
      justifyContent: "center"
  }
  })


export const DialogBox = (props) => {
    const [isError, setIsError] = useState(false)
    const [isAddRoundOpen, setAddRoundOpen] = useState(false)
    const [newRoundText, setNewRoundText] = useState("")
    const [open, setOpen] = useState(false);
    const [roundNames, setRoundNames] = useState(props.data.round_details)
    const classes = useStyle()

    const handleClickOpen = () => { setOpen(true) }

    const handleCancel = () => {setOpen(false)}

    const handleClose = () => { 
        let localData = JSON.parse(localStorage.getItem('user'))

        if(localData != null){
            const getResponse = async () => {
                await fetch(
                    "https://cors-anywhere.herokuapp.com/https://recrtuit-a-thon.herokuapp.com/editrole/",
                    {
                        method: "POST",
                        headers: {
                            email: localData.email,
                            token: localData.token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "role_id": props.data.role_id,
                            "role_name": props.data.role_name,
                            "rounds": roundNames
                        })
                    }
                ).then( res => res.json())
                .then((data) => {
                    if (data.message === "Data Updated"){
                        setOpen(false) 
                        props.modalFunction()
                    } else {
                        setIsError(true)
                        props.modalFunction()
                    }
                })
            }
            getResponse()
        }
    }

    const changeName = (elementIndex, element) => {
        setRoundNames( (round) => {
            let newArray = []

            round.forEach( (ele, index) => {
                if (elementIndex === index){
                    newArray.push(element)
                } else {
                    newArray.push(ele)
                }
            })

            return([...newArray])
        })
    }

    const addRoundName = (roundText) => {
        setRoundNames([...roundNames, roundText])
        setAddRoundOpen(false)
    }

  return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><b>{props.data.role_name} Modal</b></DialogTitle>
                <DialogContent>
                    <Typography style={{paddingBottom: "12px"}}> Round Names</Typography>
                    {
                        roundNames.map( (round, index) => {
                            return(
                                <RoundName key={round} name={round} changeName={changeName} index={index} />
                            )
                        })
                    }
                    {
                        (isAddRoundOpen) ? (
                            <Grid container className={classes.centerData}>
                                <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}}>
                                    <TextField 
                                        variant="outlined" 
                                        value={newRoundText}
                                        onChange={ (e) => setNewRoundText(e.target.value)}
                                        fullWidth
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item xs={2} style={{padding: "0px 12px 0px 12px"}}>
                                    <Button variant="outlined" color="secondary" onClick={ () => addRoundName(newRoundText)} fullWidth> Save </Button>
                                </Grid>
                                <Grid item xs={2} style={{padding: "0px 12px 0px 12px"}}>
                                    <Button variant="outlined" color="secondary" onClick={ () => setAddRoundOpen(false)} fullWidth> Cancel </Button>
                                </Grid>
                            </Grid>
                        ) : (
                            <Button color="secondary" variant="outlined" onClick={ () => setAddRoundOpen(true)} fullWidth> Add Round</Button>
                        )
                    }
                    {
                        (isError) ? (
                            <div style={{width: "100%", backgroundColor: "red", color: "white", textAlign: "center", borderRadius: "8px"}}>
                                <Typography > Unable to handle data</Typography>
                            </div>
                        ): ( <div></div>)
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    }
