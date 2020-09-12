import React, {useState, cloneElement} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {RoundName} from "./Round"

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

export const NewModal = (props) => {
  const [isError, setIsError] = useState(false)
  const [open, setOpen] = useState(false);
  const [isAddRoundOpen, setAddRoundOpen] = useState(false)
  const [newRoundText, setNewRoundText] = useState("")
  const [newModalRounds, setNewModalRounds] = useState([])
  const [newModalName, setNewModalName] = useState("")
  const classes = useStyle()
  
  const handleClickOpen = () => {
        setOpen(true);
    };

  const handleCancel = () => {setOpen(false)}

  const handleClose = () => { 
    let localData = JSON.parse(localStorage.getItem('user'))

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
                    "role_name": newModalName,
                    "rounds": newModalRounds
                })
            }
        ).then( res => res.json())
        .then((data) => {
          console.log(data)
            if (data.message === "Data Inserted"){
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
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> <b>Add New Recuritment Modal </b></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component="div">
              <Grid container>
                    <Grid item xs={12} style={{ padding: "0px 12px 8px 12px"}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Modal Name" 
                            variant="outlined"
                            value={newModalName}
                            onChange={(e) => setNewModalName(e.target.value)}
                            fullWidth
                            margin="dense"
                        /> 
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{paddingBottom: "8px"}}> Rounds</Typography>
                        {
                            newModalRounds.map( (round, index) => {
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
                                        <Button 
                                          variant="outlined" 
                                          color="primary" 
                                          onClick={ () => addRoundName(newRoundText)} 
                                          fullWidth> 
                                          Save 
                                        </Button>
                                    </Grid>
                                    <Grid item xs={2} style={{padding: "0px 12px 0px 12px"}}>
                                        <Button 
                                          variant="outlined" 
                                          color="secondary" 
                                          onClick={ () => setAddRoundOpen(false)} 
                                          fullWidth> 
                                          cancel 
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (
                              <div style={{padding: "0px 12px 0px 12px"}}>
                                <Button 
                                  color="secondary" 
                                  variant="outlined" 
                                  onClick={ () => setAddRoundOpen(true)} 
                                  fullWidth
                                  > Add Round</Button>
                              </div>
                            )
                        }
                    </Grid>
              </Grid>
          </DialogContentText>
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
          <Button onClick={handleClose} color="primary" >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
