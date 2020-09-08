import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import { Typography } from '@material-ui/core';

import {RoundName} from "./Round"

export const NewModal = () => {
  const [open, setOpen] = useState(false);
  const [isAddRoundOpen, setAddRoundOpen] = useState(false)
  const [newRoundText, setNewRoundText] = useState("")
  const [newModalRounds, setNewModalRounds] = useState([])
  const [newModalName, setNewModalName] = useState("")

  const handleClickOpen = () => {
        setOpen(true);
    };

  const handleClose = () => {
        setOpen(false);
    };

    const changeName = (elementIndex, element) => {
        setNewModalRounds( (round) => {
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
        setNewModalRounds([...newModalRounds, roundText])
        setAddRoundOpen(false)
        setNewRoundText("")
    }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Modal
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add New Recuritment Modal </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component="div">
              <Grid container>
                    <Grid item xs={12}>
                        <TextField 
                            id="outlined-basic" 
                            label="Modal Name" 
                            variant="outlined"
                            value={newModalName}
                            onChange={(e) => setNewModalName(e.target.value)}
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <Typography> Add Rounds</Typography>
                        {
                            newModalRounds.map( (round, index) => {
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
                    </Grid>
              </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
