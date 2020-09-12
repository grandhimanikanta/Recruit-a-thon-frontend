import React, {useState} from 'react'
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles({
    heading: {
        // padding: "12px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
  })

export const RoundName = (props) => {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [name, setName] = useState(props.name)
    const classes = useStyle()

    const onSave = (ind, ele) => {
        props.changeName(ind, ele)
        setIsEditOpen(false)
    }
    
    return (
        <div >
            {
                (isEditOpen) ? (
                    <Grid container>
                        <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}} className={classes.heading}>
                            <TextField 
                                variant="outlined"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={2} style={{padding: "0px 12px 0px 12px"}} className={classes.heading}>
                            <Button variant="outlined" color="primary" onClick={() => onSave(props.index, name)} fullWidth>
                                save
                            </Button>
                        </Grid>
                        <Grid item xs={2} style={{padding: "0px 12px 0px 12px"}} className={classes.heading}>
                            <Button variant="outlined" color="primary" onClick={() => setIsEditOpen(false)} fullWidth>
                                cancel
                            </Button>
                        </Grid>
                    </Grid>
                    ) : (
                    <Grid container>
                        <Grid item xs={8} style={{padding: "0px 12px 0px 12px"}}>
                            <Typography style={{paddingTop: "6px"}}>{name}</Typography>
                        </Grid>
                        <Grid item xs={4} style={{padding: "0px 12px 0px 12px"}}>
                            <Button variant="outlined" color="primary" onClick={() => setIsEditOpen(true)} fullWidth className={classes.heading}>
                                Edit
                            </Button>
                        </Grid>

                    </Grid>
                    )
            }
        </div>
    )
}