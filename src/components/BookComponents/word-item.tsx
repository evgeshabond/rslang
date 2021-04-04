import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'


//  material ui
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//  actions and types
import { CurrentWordListType } from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { addUserWord, userWordDeleted, getUserWordList } from '../../actions/user-words-action'
import UserWordsService from '../../services/user-words-service';

//  icons
import deleteIcon from '../../assets/images/delete.svg';
import hardIcon from '../../assets/images/hardWord.svg';
import playIcon from '../../assets/images/play-big.svg';
import { difficulty } from '../../utils/constants';

const langUrl = 'https://rslang-app.herokuapp.com/';

const getColor = function(group: Number) {
  switch(group) {
    case 0: return '#d1f8fe'
    case 1: return '#fed1f6'
    case 2: return '#fed1d1'
    case 3: return '#fee9d1'
    case 4: return '#fdfed1'
    case 5: return '#d1fed1'
  }
  return '#62FC5F'
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: '900px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '10px',
    marginLeft: '1rem',
    padding: '1rem',
    borderRadius: '2rem',
    backgroundColor: (word: CurrentWordListType) => 
      getColor(word.group),
  },
  statusIcon: {
    // width: '2.5rem',
    // height: '2.5rem',
    // marginTop: '1.5rem',
    // marginLeft: '1rem',
    filter: 'contrast(10%)'
  },
  statusIconContainer: {
    width: '2.5rem',
    height: '2.5rem',
    marginTop: '1.5rem',
    marginLeft: '1rem',
  },
  wordImage: {
    width: '5rem',
    height: '5rem',
    flexShrink: 0,
    marginTop: '1rem',
    marginLeft: '1rem',
    backgroundImage: (word: CurrentWordListType) =>
      `url(${langUrl}${word.image})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  playButton: {
    width: '2.5rem',
    height: '2.5rem',
    marginTop: '1.5rem',
    marginLeft: '1rem',
    cursor: 'pointer',
    backgroundImage: `url(${playIcon})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  wordContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexBasis: '30rem',
    marginTop: '1.5rem',
    marginLeft: '1rem',
    gap: '2rem'
  },
  buttonIcon: {
    width: '2.5rem',
    height: '2.5rem',
    marginTop: '1.5rem',
    marginLeft: '1rem',
    cursor: 'pointer',
  },
  helperMarginRight: {
    marginRight: '1rem'
  }
});

// params:
// [group] - controls backgroundcolor
// [showTranslate]
// [showButtons]

type Props = {
  word: CurrentWordListType;
};

const WordItem: React.FC<Props> = ({ word }) => {
  const classes = useStyles(word);
  const user = useSelector( (state: RootStateType) => state.userState.user)
  const userWords = useSelector( (state: RootStateType) => state.userWordsState.userWordsList)  
  const [additionalInfo, setAdditionalInfo] = useState({difficulty: 'notAssigned'})
  const dispatch = useDispatch()  

  useEffect(() => {
    const userWord = userWords.find( (item: {id: string, difficulty: string, wordId: string}) => item.wordId === word.id)
    if (userWord) {
      setAdditionalInfo(userWord)
    }
  },
  [userWords, word])

  const handleClickAudio = () => {
    const audio = new Audio(`${langUrl}${word.audioMeaning}`);
    audio.play();
  };

  const handleClickAddHard = () => {
    const isAdded = additionalInfo.difficulty !== 'notAssigned';
    console.log('clicked add hard with id ', word.id)
    const params = {
      userId: user.userId,
      wordId: word.id,
      token: user.token,
      body: {
        difficulty: 'hard',
        optional: {
        }
      }
    }

    console.log('this word is added: ', isAdded)
    if (isAdded) {
      console.log('already added!')
      return
    }
    dispatch(addUserWord(params))       
    setTimeout(() => {
      console.log('before getting wordslist')
      dispatch(getUserWordList({userId: user.userId, token: user.token}))
    },200)

  }

  const handleClickDelete = () => {
    const isAdded = additionalInfo.difficulty !== 'notAssigned';
    console.log('clicked delete with id ', word.id)
    const params = {
      userId: user.userId,
      wordId: word.id,
      token: user.token,
      body: {
        difficulty: 'deleted',
        optional: {
        }
      }
    }
    if (isAdded) {
      console.log('delete already added!')
      dispatch(userWordDeleted(params))
    } else {
      console.log('delete not added')
      dispatch(addUserWord(params))
    }
    
    setTimeout(() => {
      console.log('before getting wordslist')
      dispatch(getUserWordList({userId: user.userId, token: user.token}))
    },200)
  }

  if (additionalInfo?.difficulty === 'deleted') return null

  return (
    <div className={classes.container}>
      <div className={classes.statusIconContainer}>
        {additionalInfo?.difficulty === 'hard' && <img
          className={classes.statusIcon}
          src={hardIcon}
          alt="Слово добавлено в сложные"
          aria-hidden="true"
        />}
      </div>
      <div className={classes.wordImage} />
      <div className={classes.playButton} onClick={handleClickAudio} aria-hidden={true} />
      <div className={classes.wordContainer}>
        <div>
          <Typography variant="h4" component="span" className={classes.helperMarginRight}>
            {word.word}
          </Typography>
          <Typography variant="h4" component="span">
            {word.transcription}
          </Typography>
        </div>
        <div>
          <Typography align ='left' variant="body1" component="p">
            {word.textMeaning}
          </Typography>
          <Typography align ='left' variant="body1" component="p">
            {word.textExample}
          </Typography>
        </div>
      </div>
      <div className={classes.wordContainer}>
        <div>
          <Typography align ='left' variant="h4" component="span">
            {word.wordTranslate}
          </Typography>
        </div>
        <div>
          <Typography align ='left' variant="body1" component="p">
            {word.textMeaningTranslate}
          </Typography>
          <Typography align ='left' variant="body1" component="p">
            {word.textExampleTranslate}
          </Typography>
        </div>
      </div>
      <div>
        <img
          className={classes.buttonIcon}
          onClick={handleClickAddHard}
          src={hardIcon}
          alt="Добавить в сложное"
          aria-hidden="true"
        />
        <img
          className={classes.buttonIcon}
          onClick={handleClickDelete}
          src={deleteIcon}
          alt="Добаить в сложное"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export { WordItem };
