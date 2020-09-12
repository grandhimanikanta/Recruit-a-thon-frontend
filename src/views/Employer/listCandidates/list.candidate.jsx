import React, {useState, useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

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

export const ListCandidate = () => {
    const [candData, setCandData] = useState([])
    const classes = useStyle()

    const setState = () => {
        // let localData = JSON.parse(localStorage.getItem('user'))
    
            const getResponse = async () => {
                await fetch(
                    "https://cors-anywhere.herokuapp.com/https://recrtuit-a-thon.herokuapp.com/listofusers/",
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
        console.log("list conadidates")
        // eslint-disable-next-line
    }, [])

    return(
        <div>
            <Paper elevation={2} className={classes.heading}>
                <Grid container>
                    <Grid item xs={4}> Candidate Name </Grid>
                    <Grid item xs={4}> Applied Position </Grid>
                    <Grid item xs={4}> Years of Experience </Grid>
                </Grid>
            </Paper>
            {
                candData.map( (cand, index) => {
                    
                    return(
                        <Paper elevation={2} key={index} className={classes.fields}>
                            <Grid container>
                                <Grid item xs={4} className={classes.text}> {cand.name} </Grid>
                                <Grid item xs={4} className={classes.text}> {cand.position} </Grid>
                                <Grid item xs={4} className={classes.text}> {cand.experience} </Grid>                                
                            </Grid>
                        </Paper>
                    )
                })
            }
        </div>
    )
}