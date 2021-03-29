import React from 'react'

//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

//  Router
import { Link as RouterLink } from 'react-router-dom';

// update theme object of material ui
const primaryColor = '#FDEBFF'
const secondaryColor = '#5B2467'

// assumed, that vertical centering will be added in App Component
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 420,
    maxWidth: 820,
    color: secondaryColor,
    backgroundColor: primaryColor,
    margin: '0 auto',    
    transform: 'translateY(33%)',
    paddingTop: '1rem',
    borderRadius: '3rem'    
  },
  button: {
    height: 130,
    width: 260,
    backgroundColor: primaryColor,
    color: secondaryColor,
    textDecoration: "none",    
    cursor: 'pointer',
    borderRadius: '2rem',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    filter: 'drop-shadow(0 4px 4px black)',
    margin: "1.5rem"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem'
  }
})

const Book:React.FC = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h2">
        Электронный учебник
      </Typography>
      <Box className={classes.container}>
        <RouterLink to="/book/learn" className={classes.button}>Изучение</RouterLink>
        <RouterLink to="/book/dict" className={classes.button}>Словарь</RouterLink>
      </Box>
    </Paper>
  )
}

export default Book