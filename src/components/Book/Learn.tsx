import React from 'react'

//  Router

//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

import WordList from './WordList'

// update theme object of material ui
const primaryColor = '#FDEBFF'
const secondaryColor = '#5B2467'

// assumed, that vertical centering will be added in App Component
const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    minHeight: '85vh',
    maxWidth: 1200,
    color: secondaryColor,
    backgroundColor: primaryColor,
    margin: '1rem auto',
    paddingTop: '1rem',
    borderRadius: '3rem'    
  },
  settings: {
    position: 'absolute',
    right: '3rem',
    top: '1rem'
  },
  container: {
    display: 'flex',
    marginTop: '2rem' 
  },
  levels: {
    display: 'flex',
    flexDirection: 'column',
    width: '84px',
    heigth: '456px',
    marginLeft: '15px'
  },
  level: {
    width: '84px',
    height: '76px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  levelName: {
    fontSize: '2rem',
    color: secondaryColor,    
  },
  levelName__a1: {
    backgroundColor: '#61E9FC',
    borderRadius: '10px 10px 0px 0px'
  },
  levelName__a2: {
    backgroundColor: '#FC5FE3',
  },
  levelName__a2plus: {
    backgroundColor: '#FC5F5F',
  },
  levelName__b1: {
    backgroundColor: '#FCB45F',
  },
  levelName__b2: {
    backgroundColor: '#F9FC5F',
  },
  levelName__b2plus: {
    backgroundColor: '#62FC5F',
    borderRadius: '0px 0px 10px 10px'
  },
  wordList: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%'    
  }
})

const Learn:React.FC = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
          Электронный учебник
      </Typography>
      <Box className={classes.settings}>Settings</Box>
      <Box className={classes.container}>
        <Box className={classes.levels}>
          <div className={clsx(classes.level, classes.levelName__a1)}>
            <span className={classes.levelName} role='button'>A1</span>
          </div>
          <div className={clsx(classes.level, classes.levelName__a2)}>
            <span className={classes.levelName}>A2</span>
          </div>
          <div className={clsx(classes.level, classes.levelName__a2plus)}>
            <span className={classes.levelName}>A2+</span>
          </div>
          <div className={clsx(classes.level, classes.levelName__b1)}>
            <span className={classes.levelName}>B1</span>
          </div>
          <div className={clsx(classes.level, classes.levelName__b2)}>
            <span className={classes.levelName}>B2</span>
          </div>
          <div className={clsx(classes.level, classes.levelName__b2plus)}>
            <span className={classes.levelName}>B2+</span>
          </div>
        </Box>
        <Box className={classes.wordList}>
          <WordList />
        </Box>
      </Box>
    </Paper>
  )
}

export default Learn