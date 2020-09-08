import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const ShowRounds = (props) => {
    const [open, setOpen] = React.useState(false);
    const [rounds, setRounds] = React.useState(props.roundData)
    const [text, setText] = React.useState("")
    const [status, setStatus] = React.useState("NA")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setRounds( (value) => {
            let newArray = []
            
            value.forEach( (round, index) => {
                if(props.currentRound === index){
                    newArray.push({
                        "remark": text,
                        "round_name": round.round_name,
                        "status": status
                        })
                } else {
                    newArray.push({
                        "remark": round.remark,
                        "round_name": round.round_name,
                        "status": round.status
                        })
                }
            })
            
            console.log("Array", newArray, props.name)
            return([...newArray])
        })
        setOpen(false);
        
    };

    
    return (
    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Status of Candidate</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography>Round Name</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Remarks</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>Status</Typography>
                    </Grid>
                </Grid>
                {
                    rounds.map( (round, index) => {
                        return(
                        <Grid container key={index}>
                            <Grid item xs={5}>
                                <TextField
                                    variant="outlined"
                                    disabled
                                    margin="dense"
                                    value={round.round_name}
                                    type="text"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    required
                                    variant="outlined"
                                    disabled = {(props.currentRound===index) ? false : true}
                                    margin="dense"
                                    type="text"
                                    fullWidth
                                    value= {(props.currentRound===index) ? text : round.remark}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                {
                                    (props.currentRound === index) ? (
                                        <Select
                                            variant="outlined"
                                            disabled = {(props.currentRound === index) ? false: true}
                                            fullWidth
                                            value={(round.status === "pass" && round.status === "") ? "YES" : status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            required
                                            >
                                            <MenuItem value={"NA"}>NA</MenuItem>
                                            <MenuItem value={"Yes"}>Yes</MenuItem>
                                            <MenuItem value={"No"}>No</MenuItem>
                                        </Select>
                                    ): (
                                        <TextField
                                            disabled
                                            value={ (round.status === "pass") ? "YES" : "NA"}
                                            variant="outlined"
                                        />
                                    )
                                }
                            </Grid>
                        </Grid>
                        )
                    })
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">save</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
