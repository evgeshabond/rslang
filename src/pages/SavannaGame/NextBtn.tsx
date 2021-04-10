import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import Spinner from '../../components/Spinner/Spinner';
import { WordItem } from '../../components/word-item/word-item-game';
import styles from './SavannaGame.module.css';
import { mainPath } from '../../utils/constants';
import { PlayButton } from '../../components/button-icons/playBig-button/playBig-button';
import { audioGameStart, wordUserAnswer, wordRight, isAnswerSelected, currentPlayWords } from '../../actions/audioGame-actions';
import { shuffle } from '../../utils/shuffle';


const NextBtn: React.FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWordsList({ page: 0, group: 0 }))
  }, []);

  const isPlaying = useSelector((state: RootStateType) => state.savannaGameState.savannaGameStart);
  const wordList = useSelector((state: RootStateType) => state.wordState.currentWordList);
  const userAnswer = useSelector((state: RootStateType) => state.savannaGameState.wordUserAnswer);
  const rightWord = useSelector((state: RootStateType) => state.savannaGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.savannaGameState.isAnswerSelected);
  const currentWords = useSelector((state: RootStateType) => state.savannaGameState.currentPlayWords);
  const stepCounter = useSelector((state: RootStateType) => state.savannaGameState.stepCounter);


  const playGame = () => {
    // dispatch(wordUserAnswer(''));
    dispatch(isAnswerSelected(false));
    if (wordList === undefined) {
      return;
    }
    const currentPlayList = shuffle(wordList)
      .filter((item: Object, index: number) => index < 4);
    dispatch(currentPlayWords(currentPlayList))
  }

  return isAnswer ? (
    <div>
      {(stepCounter === 10) ? (<div>
        Показать результат
      </div>) :
        (<button aria-label='word-btn' type="button" className={styles.add__aswer} onClick={() => {
          playGame()
        }} />)
      }
    </div>
  ) : (
    <button onClick={() => { dispatch(isAnswerSelected(true)); }} type='button' className={styles.playing__btn}>
      Не знаю
    </button >
  )

}

export default NextBtn;