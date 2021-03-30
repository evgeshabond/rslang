import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//  material ui
import { makeStyles } from '@material-ui/core/styles';

import {WordStateType} from '../../reducer/word-reducer';
import { RootStateType } from '../../reducer/root-reducer';

import {
  CurrentWordListType,
  fetchWordsList,
  wordListLoaded,
} from '../../actions/word-actions';

import {WordItem} from './word-item'

const useStyles = makeStyles({
  container: {
    
  }
})

const WordList = () => {
  const currentState = useSelector((state: RootStateType) => state.wordState)  
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(fetchWordsList( {page: 0, group: 0}) )
  },[])

  const renderWords = () => (currentState.currentWordList.map( (word) => ( <WordItem key={word.id} word={word} /> )) )

  console.log(currentState.currentWordList)
  return <div className={classes.container} >{currentState.loading ? (<span>Loading</span>) : <>{renderWords()}</>}</div>;
}

export default WordList