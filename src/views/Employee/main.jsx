import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export function Employee() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({})

  const setState = () => {
        const getResponse = async () => {
            await fetch(
                "https://api.npoint.io/da8a20274a51b88c1f85",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then( res => res.json())
                .then( (data) => {              
                    setData(data)
                })
            }
            
        getResponse()
    }

    useEffect(() => {
      setState()
        // eslint-disable-next-line
    }, [])

  return (
    <div className={classes.root}>
      {
          (!(Object.keys(data).length === 0 && data.constructor === Object)) ? (
            <Grid container style={{marginTop:"8%"}}>
              <Grid item xs={12}>
                  <Typography style={{fontSize: "32px", textAlign: "center", fontWeight: "700", padding: "12px"}}>Hi, {data.candidate_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <Typography style={{fontSize: "18px", textAlign: "center", padding: "12px"}}>Applied Position: {data.modal_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                  <Stepper activeStep={data.current_round-1} alternativeLabel>
                  {data.rounds.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label.round_name}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{fontSize: "16px", textAlign: "center", padding: "14px"}}> Congratulations your current round is {data.current_round}</Typography>
              </Grid>
            </Grid>
          ) : (<div>Hi</div>)
        }
    </div>
  );
}
