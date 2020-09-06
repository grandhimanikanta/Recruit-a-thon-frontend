import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid"

import {RoundName} from "./Round"
import { useState } from 'react';
import { TextField } from '@material-ui/core';


export const DialogBox = (props) => {
    const [isAddRoundOpen, setAddRoundOpen] = useState(false)
    const [newRoundText, setNewRoundText] = useState("")
    const [open, setOpen] = useState(false);
    const [roundNames, setRoundNames] = useState(props.data.round_names)

    const handleClickOpen = () => { setOpen(true) }

    const handleClose = () => { 
        setOpen(false) 
        console.log(roundNames, props.modalIndex)
    }

    const changeName = (elementIndex, element) => {
        setRoundNames( (round) => {
            let newArray = []

            round.map( (ele, index) => {
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
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.data.name} Modal</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" component="h6"> Round Names</Typography>
                    {
                        roundNames.map( (round, index) => {
                            return(
                                <RoundName key={round} name={round} changeName={changeName} index={index} />
                            )
                        })
                    }
                    {
                        (isAddRoundOpen) ? (
                            <Grid container>
                                <Grid item>
                                    <TextField 
                                        variant="outlined" 
                                        value={newRoundText}
                                        onChange={ (e) => setNewRoundText(e.target.value)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary" onClick={ () => addRoundName(newRoundText)}> Save </Button>
                                </Grid>
                            </Grid>
                        ) : (
                            <Button color="secondary" variant="outlined" onClick={ () => setAddRoundOpen(true)}> Add Round</Button>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
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
