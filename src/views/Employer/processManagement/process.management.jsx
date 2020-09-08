import React, {useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"

import {ShowRounds} from "./show.rounds"

export const ProcessManagement = () => {
    const [candData, setCandData] = useState([])

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

        // eslint-disable-next-line
    }, [])


    return(
        <div>
            <Paper elevation={3}>
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
                        <Paper elevation={3} key={cand.modal}>
                            <Grid container>
                                <Grid item xs={3}> {cand.name} </Grid>
                                <Grid item xs={3}> {cand.modal} </Grid>
                                <Grid item xs={2}> {cand.current_round} </Grid>
                                <Grid item xs={2}> {cand.total_rounds} </Grid>
                                <Grid item xs={2}> 
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