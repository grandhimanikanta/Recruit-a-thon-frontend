import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {RecuritmentModal} from "./recuritmentModal/recuritment.modal";
import {ListCandidate} from './listCandidates/list.candidate';
import {ProcessManagement} from './processManagement/process.management';
import {ModalContextProvider} from "../../contexts/modal.context"


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `2px solid ${theme.palette.divider}`,
    marginTop: "12%"
  },
  rightTab: {
    width: "80%",
  },
  singleTab: {
    padding: "16px",
    marginTop: "24px"
  }
}));

export const Employer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Recuritment Modals" {...a11yProps(0)} className={classes.singleTab} />
        <Tab label="List of Candidates" {...a11yProps(1)} className={classes.singleTab}/>
        <Tab label="Ongoing Process" {...a11yProps(2)} className={classes.singleTab}/>
      </Tabs>

      <TabPanel value={value} index={0} className={classes.rightTab}>
        <ModalContextProvider>
          <RecuritmentModal />
        </ModalContextProvider>
      </TabPanel>
      
      <TabPanel value={value} index={1} className={classes.rightTab}>
        <ListCandidate />
      </TabPanel>
      
      <TabPanel value={value} index={2} className={classes.rightTab}>
        <ProcessManagement />
      </TabPanel>

    </div>
  );
}

// RecuritmentModal
// ListCandidate
// ProcessManagement