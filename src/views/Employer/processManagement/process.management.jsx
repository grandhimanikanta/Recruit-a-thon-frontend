import React, {useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

import {ShowRounds} from "./show.rounds"

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

export const ProcessManagement = () => {
    const [candData, setCandData] = useState([])
    const classes = useStyle()

    const setState = () => {
        // let localData = JSON.parse(localStorage.getItem('user'))
    
            const getResponse = async () => {
                await fetch(
                    "https://api.npoint.io/82313876d0c3417c226b",
                    {
                        method: "GET",
                        // headers: {
                        //     email: localData.email,
                        //     authorization: localData.token
                        // }
                    }
                ).then( res => res.json())
                    .then( (data) => {
                        let candNames = []
                        candNames = [...data.data]
                        setCandData(candNames)
                    })
                }
    
            getResponse()
        }
    
    useEffect(() => {
        setState()
        console.log("process.management")
        // eslint-disable-next-line
    }, [])


    return(
        <div>
            <Paper elevation={2} className={classes.heading}>
                <Grid container>
                    <Grid item xs={3}> Candidate Name </Grid>
                    <Grid item xs={3}> Attached Modal </Grid>
                    <Grid item xs={2}> Current Round </Grid>
                    <Grid item xs={2}> Total Rounds </Grid>
                </Grid>
            </Paper>
            {
                candData.map( (cand) => {
                    
                    return(
                        <Paper elevation={2} key={cand.modal} className={classes.fields}>
                            <Grid container>
                                <Grid item xs={3} className={classes.text}> {cand.name} </Grid>
                                <Grid item xs={3} className={classes.text}> {cand.modal} </Grid>
                                <Grid item xs={2} className={classes.text}> {cand.current_round} </Grid>
                                <Grid item xs={2} className={classes.text}> {cand.total_rounds} </Grid>
                                <Grid item xs={2} className={classes.text}> 
                                    <ShowRounds roundData={cand.round_details} currentRound={cand.current_round} name={cand.name}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                })
            }
        </div>
    )
}