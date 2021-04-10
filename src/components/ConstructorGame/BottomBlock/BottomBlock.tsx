import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNotLearnedWord,
  clearWordsIds,
  constructorGameStart,
  resetCombo,
  resetComboCounter,
  setComboArray,
  setResultPageState,
  setRoundCount,
  setRoundEnd,
  setUsedWordsIds,
  setWordCorrectness,
} from '../../../actions/constructor-game-actions';
import { setStatistics } from '../../../actions/statistic-action';
import { userWordToLearnResult } from '../../../actions/user-words-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { gameConstants, gameType } from '../../../utils/constants';
import { removeTagsAndWordInside } from '../../../utils/removeTagsAndWordInside';
import { removeTagsFromString } from '../../../utils/removeTagsFromString';
import styles from './BottomBlock.module.css';

export const BottomBlock: React.FC = () => {
  const { amountOfRounds } = gameConstants;
  const dispatch = useDispatch();

  const currentWordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );
  const totalRounds =
    currentWordList.length < 10 ? currentWordList.length : amountOfRounds;

  const {
    constructorRoundStatus: isRoundEnd,
    wordObj,
    roundCount,
    learned,
    comboCounter,
    comboArray,
    isWinning,
    usedWordsIds,
  } = useSelector((state: RootStateType) => state.constructorGameState);

  const user = useSelector((state: RootStateType) => state.userState.user);
  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );

  useEffect(() => {
    const dontKnow = totalRounds - learned;

    const param = {
      userId: user.userId,
      token: user.token,
    };
    const gameStatistic = {
      gameType: gameType.constructors,
      level: user.level || 1,
      know: learned,
      dont_know: dontKnow,
      combo: Math.max(...comboArray),
      wordsId: usedWordsIds,
    };

    if (roundCount === totalRounds) {
      dispatch(clearWordsIds());
      dispatch(resetCombo());

      if (
        isLevelVisible ||
        currentWordList[0].userWord?.difficulty === 'deleted'
      ) {
        return;
      }
      console.log('Sending end of game');
      dispatch(setStatistics(param, gameStatistic));
    }
  }, [roundCount]);

  const nextRoundHandler = () => {
    if (roundCount === totalRounds) {
      dispatch(constructorGameStart(false));
      dispatch(setResultPageState(true));
    }

    dispatch(setUsedWordsIds(wordObj.id));
    dispatch(setRoundCount(roundCount + 1));
    dispatch(setRoundEnd(false));
    dispatch(setComboArray(comboCounter));

    const params = {
      userId: user.userId,
      wordId: wordObj.id,
      token: user.token,
    };

    const roundResult = {
      isCorrect: isWinning,
    };

    if (
      isLevelVisible ||
      currentWordList[0].userWord?.difficulty === 'deleted'
    ) {
      return;
    }
    console.log('Sending end of round');
    dispatch(userWordToLearnResult(params, roundResult));
  };

  const dontKnowHandler = () => {
    dispatch(resetComboCounter());
    dispatch(addNotLearnedWord(wordObj));
    dispatch(setRoundEnd(true));
    dispatch(setWordCorrectness(false));
  };

  return isRoundEnd ? (
    <>
      <p className={styles.description}>Пример</p>
      <p className={styles.word__transcription}>
        {wordObj
          ? `${
              wordObj.textExample
                ? removeTagsFromString(wordObj.textExample)
                : ''
            }`
          : ''}
      </p>
      <button
        className={styles['btn-next']}
        type="button"
        onClick={() => nextRoundHandler()}
      >
        {roundCount === totalRounds ? `Результаты` : `Далее`}
      </button>
    </>
  ) : (
    <>
      <p className={styles.description}>Контекст</p>
      <p className={styles.word__transcription}>
        {wordObj
          ? `${
              wordObj.textMeaning
                ? removeTagsAndWordInside(wordObj.textMeaning)
                : ''
            }`
          : ''}
      </p>
      <button
        className={styles['btn-next']}
        type="button"
        onClick={() => dontKnowHandler()}
      >
        Не знаю
      </button>
    </>
  );
};
