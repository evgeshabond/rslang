import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNotLearnedWord,
  constructorGameStart,
  setResultPageState,
  setRoundCount,
  setRoundEnd,
} from '../../../actions/constructor-game-actions';
import { setStatistics } from '../../../actions/statistic-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { gameConstants, gameType } from '../../../utils/constants';
import { removeTagsAndWordInside } from '../../../utils/removeTagsAndWordInside';
import { removeTagsFromString } from '../../../utils/removeTagsFromString';
import styles from './BottomBlock.module.css';

export const BottomBlock: React.FC = () => {
  const { amountOfRounds } = gameConstants;
  const dispatch = useDispatch();

  const isRoundEnd = useSelector(
    (state: RootStateType) => state.constructorGameState.constructorRoundStatus
  );

  const wordObj = useSelector(
    (state: RootStateType) => state.constructorGameState.wordObj
  );

  const roundCount = useSelector(
    (state: RootStateType) => state.constructorGameState.roundCount
  );
  const learned = useSelector(
    (state: RootStateType) => state.constructorGameState.learned
  );

  const user = useSelector((state: RootStateType) => state.userState.user);

  useEffect(() => {
    const dontKnow = amountOfRounds - learned;

    const param = {
      userId: user.userId,
      token: user.token,
      gameType: gameType.constructors,
      body: {
        date: new Date(),
        level: user.level,
        know: learned,
        dont_know: dontKnow,
      },
    };

    if (roundCount === amountOfRounds) {
      console.log('Know', param.body.know, 'Dont know', param.body.dont_know);
      dispatch(setStatistics(param));
    }
  }, [roundCount]);

  const nextRoundHandler = () => {
    if (roundCount === amountOfRounds) {
      dispatch(constructorGameStart(false));
      dispatch(setResultPageState(true));
    }

    dispatch(setRoundCount(roundCount + 1));
    dispatch(setRoundEnd(false));
  };

  const dontKnowHandler = () => {
    dispatch(addNotLearnedWord(wordObj));
    dispatch(setRoundEnd(true));
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
        {roundCount === amountOfRounds ? `Результаты` : `Далее`}
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
