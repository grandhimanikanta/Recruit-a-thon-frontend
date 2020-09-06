import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper';
import { Grid, Button, TextField, Typography } from '@material-ui/core';

export const RoundName = (props) => {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [name, setName] = useState(props.name)

    const onSave = (ind, ele) => {
        props.changeName(ind, ele)
        setIsEditOpen(false)
    }
    
    return (
        <Paper elevation={3}> 
            {
                (isEditOpen) ? (
                <Grid container>
                    <Grid item xs={9}>
                        <TextField 
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="outlined" color="primary" onClick={() => onSave(props.index, name)}>
                            save
                        </Button>
                    </Grid>
                </Grid>
                ) : (
                <Grid container>
                    <Grid item xs={9}>
                        <Typography>{name}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="outlined" color="primary" onClick={() => setIsEditOpen(true)}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                )
            }
        </Paper>
    )
}