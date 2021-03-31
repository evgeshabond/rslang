import React, {useState} from 'react'

//  Pagination
import ReactPaginate from 'react-paginate';

//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
// import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

import WordList from '../../components/BookComponents/word-list'

// update theme object of material ui
const primaryColor = '#FDEBFF'
const secondaryColor = '#5B2467'

// assumed, that vertical centering will be added in App Component
const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '80vh',
    maxWidth: 1200,
    margin: '1rem auto',
    paddingTop: '1rem',
    borderRadius: '3rem',
    color: secondaryColor,
    backgroundColor: primaryColor,
    overflow: 'hidden'
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
    flexShrink: 1,
    marginLeft: '15px',
    alignSelf: 'center'
  },
  level: {
    display: 'flex',
    padding: '2rem 2rem',
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
    maxHeight: '65vh',
    margin: '1rem',
    overflowY: 'scroll',
    willChange: 'transform'
  },
  pagination: {
    height: '70px',
    width: '600px',
    margin: '1rem auto',
    marginBottom: '3rem',
    fontSize: '2rem',
    listStyle: 'none',

    '& li': { 
      display: 'inline-block',
      marginLeft: '0.5rem', 
    },

    '& a': {
      width: '3rem',
      height: '3rem',
      cursor: 'pointer',
      paddingLeft: '0.9rem',   
      paddingRight: '1rem'
    }
  },
  activePage: {
    color: 'white' ,
    backgroundColor: secondaryColor,
    borderRadius: '2rem'  
  },
  disabled: {
    color: 'grey',

    '& a': {
      display: 'none'
    }    
  },
  activeLink: {
    outline: 'none'
  }
})

const Learn:React.FC = () => {
  const classes = useStyles()
  const [page, setPage] = useState(5)
  
  const handlePageChange = (data: any) => {
    console.log(data.selected + 1) // actual page exuals selected + 1
    setPage(data.selected + 1)
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h3">
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
          <WordList page={page} />
        </Box>
      </Box>
      <ReactPaginate
          previousLabel='<'
          nextLabel='>'
          breakLabel='...'
          breakClassName='breakMe'
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={classes.pagination}
          activeClassName={classes.activePage}
          initialPage={page-1} //  choose 5th page (selected - 1)
          disabledClassName={classes.disabled}
          activeLinkClassName={classes.activeLink}
        />
    </Paper>
  )
}

export default Learn