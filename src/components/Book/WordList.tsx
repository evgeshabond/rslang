import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {WordStateType} from '../../reducer/word-reducer';
import { RootStateType } from '../../reducer/root-reducer';

import {
  CurrentWordListType,
  fetchWordsList,
  wordListLoaded,
} from '../../actions/word-actions';

import {WordItem} from './WordItem'

const WordList = () => {
  const currentState = useSelector((state: RootStateType) => state.wordState)  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWordsList( {page: 0, group: 0}) )
  },[])

  const renderWords = () => (currentState.currentWordList.map( (word) => <WordItem key={word.id} word={word} />) )

  console.log(currentState.currentWordList)
  return <>{currentState.loading ? (<span>Loading</span>) : <>{renderWords()}</>}</>;
}

export default WordList