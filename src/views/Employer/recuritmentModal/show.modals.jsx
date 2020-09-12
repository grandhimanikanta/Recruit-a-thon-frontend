import React from "react"
import {Paper, Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import {DialogBox} from "./dialog.list"

const useStyle = makeStyles({
    heading: {
        textAlign: "center",
        fontWeight: "600",
        padding: "12px",
        marginBottom: "12px"
    },
    fields: {
        padding: "8px",
        marginBottom: "12px",
    },
    text: {
        display:"flex", 
        alignItems:"center", 
        justifyContent: "center"
    }
})

export const ShowModals = (props) => {
    const classes = useStyle()

    return(
        <div>
            <Paper elevation={2} className={classes.heading}>
                <Grid container>
                    <Grid item xs={4}>
                        Modal Name
                    </Grid>
                    <Grid item xs={4}>
                        No Of Rounds
                    </Grid>
                </Grid>
            </Paper>
            {
                props.data.map( (val, index) => {
                    return(
                        <Paper key={index} elevation={2} className={classes.fields} >
                            <Grid container>
                                <Grid item xs={4} className={classes.text}>
                                    {val.role_name}
                                </Grid>
                                <Grid item xs={4} className={classes.text}>
                                    {val.rounds}
                                </Grid>
                                <Grid item xs={4} className={classes.text}>
                                    <DialogBox data={val} modalIndex={index} modalFunction={props.modalFunction}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })
            }
        </div>
    )
}