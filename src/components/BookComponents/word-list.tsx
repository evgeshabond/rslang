import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//  material ui
import { makeStyles } from '@material-ui/core/styles';

//  types and services

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

type PropsType = {
  page: number,
  group: number
}

const WordList = (props: PropsType) => {
  const currentState = useSelector((state: RootStateType) => state.wordState)  
  const user = useSelector( (state: RootStateType) => state.userState.user)
  const dispatch = useDispatch()


  const classes = useStyles()

  //  get words info according to page and group
  useEffect(() => {
    dispatch(fetchWordsList( {page: props.page, group: props.group}) )
  },[props])

  // useEffect(() => {
  //   const wordList = [...currentState.currentWordList]
  //   for (const wordItem of wordList) {
  //     const wordUserItem = userWords.find( (userWordItem: {id: string, difficulty: string, wordId: 'string'}) => 
  //       userWordItem.wordId === wordItem.id
  //     )
  //     console.log(wordUserItem)
  //   }
  // }, [userWords, currentState])
    

  const renderWords = () => (currentState.currentWordList.map( (word) => ( <WordItem key={word.id} word={word} /> )) )


  return <div className={classes.container} >{currentState.loading ? (<span>Loading</span>) : <>{renderWords()}</>}</div>;
}

export default WordList