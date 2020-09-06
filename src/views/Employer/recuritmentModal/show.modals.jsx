import React from "react"
import {Paper, Grid } from "@material-ui/core"

import {DialogBox} from "./dialog.list"

export const ShowModals = (props) => {

    return(
        <div>
            <Paper elevation={3}>
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
                        <Paper key={index} elevation={3}>
                            <Grid container>
                                <Grid item xs={4}>
                                    {val.name}
                                </Grid>
                                <Grid item xs={4}>
                                    {val.no_of_rounds}
                                </Grid>
                                <Grid item xs={4}>
                                    <DialogBox data={val} modalIndex={index}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })
            }
        </div>
    )
}