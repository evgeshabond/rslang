import React, { useEffect, useState } from 'react';
import clsx from 'clsx'

//  material ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

//  redux
import { useDispatch, useSelector } from 'react-redux'

//  types
import { RootStateType } from '../../reducer/root-reducer';
import { WordStateType } from '../../reducer/word-reducer';

//  herlpers and services
import AggregateService from '../../services/word-aggregate-service'

//  icons
import learningIcon from '../../assets/images/learning.svg'
import hardIcon from '../../assets/images/hardWord.svg';
import deletedIcon from '../../assets/images/delete.svg'

// update theme object of material ui
const primaryColor = '#FDEBFF';
const secondaryColor = '#5B2467';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '80vh',
    width: '95vw',
    minHeight: '550px',
    maxWidth: 1250,
    margin: '1rem auto',
    paddingTop: '1rem',
    borderRadius: '3rem',
    color: secondaryColor,
    backgroundColor: primaryColor
  },
  difficultyContainer: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: 0
  },
  difficultyButton: {
    display: 'block',
    cursor: 'pointer',
    marginLeft: '2rem',
    border: '2px solid transparent',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginTop: '0.5rem'
  },
  activeButton: {
    border: '2px solid blue',
  },
  difficultyIcon: {
    display: 'inline-block',
    width: '3rem',
    height: '3rem',
    marginTop: '0.5rem'
  },
  difficultyText: {
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '1.6rem',
    width: '10rem',
    marginLeft: '1rem'
  },
  buttonsContainer: {
    position: 'absolute',
    top: '10px',
    right: '15px'
  },
  container: {
    display: 'flex',
    marginTop: '2rem',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden'
  },
  levels: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    marginLeft: '15px',
    alignSelf: 'center',
  },
  level: {
    display: 'flex',
    padding: '2rem 2rem',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid transparent',
    outline: 'none'
  },
  levelName: {
    fontSize: '2rem',
    color: secondaryColor,    
  },
  levelName__a1: {
    backgroundColor: '#61E9FC',
    borderRadius: '10px 10px 0px 0px',
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
    borderRadius: '0px 0px 10px 10px',
  },
  activeLevelName: {
    border: '2px solid blue'
  },
})

const DictionaryPage: React.FC = () => {
  const user = useSelector( (state: RootStateType) => state.userState.user)
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false)
  const [difficulty, setDifficulty] = useState('hard')
  const [group, setGroup] = useState(0);
  const currentState = useSelector( (state: RootStateType) => state)
  const [allWords, setAllWords] = useState([])
  const [allWordsCount, setAllWordsCount] = useState(0)
  const [wordsToRender, setWordsToRender] = useState([])
  console.log(difficulty)
  const service = new AggregateService;

  // export type AggregateParamsType = {
  //   userId: string;
  //   token: string;
  //   page: number;
  //   group?: number;
  //   wordsPerPage: number;
  // };


  useEffect(() => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group,
      wordsPerPage: 3600
    }
    console.log('before sending request')
    service.getAggregatedWordsList(params, 'all')
      .then( (data: any) => {
        const newWords: any = data[0].paginatedResults.flat()
        const newCount: any = data[0]?.totalCount[0]?.count
        if (newWords.length === allWords.length || newCount === allWordsCount) return
        setAllWords(newWords)
        setAllWordsCount(newCount)
        setIsLoaded(true)
      })
      .catch( (e: any) => console.log(e))
  }, [difficulty, group])

  useEffect(() => {
    console.log('words or count changed')
    console.log(allWords)
  }, [allWords, allWordsCount])

  const handleGroupChange = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = e.target as Element;
    console.log(target.textContent);
    switch (target.textContent) {
      case 'A1':
        setGroup(0);
        break;
      case 'A2':
        setGroup(1);
        break;
      case 'A2+':
        setGroup(2);
        break;
      case 'B1':
        setGroup(3);
        break;
      case 'B2':
        setGroup(4);
        break;
      case 'B2+':
        setGroup(5);
    }
  };

  if (!isLoaded) return (<CircularProgress />)
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h3">
        Словарь
      </Typography>
      <Box className={classes.difficultyContainer}>
        <div 
        className={clsx({[classes.difficultyButton]: true, [classes.activeButton]: difficulty === 'learning'})}
        onClick={() => setDifficulty('learning')}
        aria-hidden={true}
        >
          <img
            className={classes.difficultyIcon}
            src={learningIcon}
            alt="Иконка"
            aria-hidden="true"
          />
          <div className={classes.difficultyText}>Изучаемые слова</div>
        </div>
        <div 
        className={clsx({[classes.difficultyButton]: true, [classes.activeButton]: difficulty === 'hard'})}
        onClick={() => setDifficulty('hard')}
        aria-hidden={true}
        >
          <img
            className={classes.difficultyIcon}
            src={hardIcon}
            alt="Иконка"
            aria-hidden="true"
          />
          <div className={classes.difficultyText}>Сложные слова</div>
        </div>
        <div 
        className={clsx({[classes.difficultyButton]: true, [classes.activeButton]: difficulty === 'deleted'})}
        onClick={() => setDifficulty('deleted')}
        aria-hidden={true}
        >
          <img
            className={classes.difficultyIcon}
            src={deletedIcon}
            alt="Иконка"
            aria-hidden="true"
          />
          <div className={classes.difficultyText}>Удаленные слова</div>
        </div>        
      </Box>
      <Box className={classes.buttonsContainer}>Buttons</Box>
      <div className={classes.container}>
      <Box className={classes.levels} role="menu">
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__a1]: true,
              [classes.activeLevelName]: group === 0,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>A1</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__a2]: true,
              [classes.activeLevelName]: group === 1,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>A2</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__a2plus]: true,
              [classes.activeLevelName]: group === 2,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>A2+</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__b1]: true,
              [classes.activeLevelName]: group === 3,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>B1</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__b2]: true,
              [classes.activeLevelName]: group === 4,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>B2</span>
          </div>
          <div
            className={clsx({
              [classes.level]: true,
              [classes.levelName__b2plus]: true,
              [classes.activeLevelName]: group === 5,
            })}
            role="button"
            tabIndex={0}
            onClick={(e) => handleGroupChange(e)}
            aria-hidden="true"
          >
            <span className={classes.levelName}>B2+</span>
          </div>
        </Box>
        <div>Words</div>
      </div>
    </Paper>
  )
}

export default DictionaryPage