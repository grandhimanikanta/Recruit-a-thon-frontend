import React from 'react'
import { Grid, TextField, Button, makeStyles } from "@material-ui/core"
import { useContext } from 'react'
import { UserContext } from '../contexts/user.status.context'
import { useState } from 'react'


const useStyle = makeStyles({
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
        <Grid container className={classes.container}>
            <Grid item>
                <form>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        variant="outlined"
                        onChange={(val) => setUsername(val.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={(val) => setPassword(val.target.value)}
                    />
                    <Button
                        variant="outlined"
                        size="large"
                        className={classes.loginButton}
                        onClick={() => user.signIn(username, password)}
                    >
                        Login
                    </Button>
                </form>
            </Grid>
        </Grid>
    )
}
