import React from 'react'
import { Grid, TextField, Button, makeStyles, Paper } from "@material-ui/core"
import { useContext } from 'react'
import { UserContext } from '../contexts/user.status.context'
import { useState } from 'react'
import Typography from "@material-ui/core/Typography"
import logo from "./logo.svg"

const useStyle = makeStyles({
    holder: {
        marginTop: "8%",
        margin: "auto",
        width: "28%", 
        padding: "32px",
        borderRadius: "16px"
    },
    container: {
        textAlign: "center"
    },
    loginButton: {
        width: "70%",
        margin: "12px 0px 8px 0px",
        color: "white",
        backgroundColor: "orange",
        '&:hover': {
            backgroundColor: "white",
            color: "orange",
            border: "2px solid orange"
        },
    }
})

export const Login = () => {
    const classes = useStyle()

    const {user} = useContext(UserContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return(
        <Paper 
            elevation={2}
            className={classes.holder}
        >
            <Grid container className={classes.container}>
            <Grid item xs={12}>
                    <img src={logo} alt="Logo"/>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{fontSize: "36px", paddingBottom: "30px"}}> Recruit-a-thon </Typography>
            </Grid>
            <Grid item xs={12}>
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: "100%"}}
                                margin="dense"
                                label="Username"
                                variant="outlined"
                                onChange={(val) => setUsername(val.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: "100%"}}
                                margin="dense"
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={(val) => setPassword(val.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            style={{width: "50%"}}
                            variant="outlined"
                            size="medium"
                            className={classes.loginButton}
                            onClick={() => user.signIn(username, password)}
                        >
                            Login
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
        </Paper>
        )
}
