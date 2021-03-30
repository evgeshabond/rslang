import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  constructorGameStart,
  setLearnCount,
  setRoundCount,
  setRoundEnd,
} from '../../../actions/constructor-game-actions';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './BottomBlock.module.css';

export const BottomBlock: React.FC = () => {
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

  const nextRoundHandler = () => {
    if (roundCount === 10) {
      dispatch(constructorGameStart(false));
      dispatch(setLearnCount(0));
    }

    dispatch(setRoundCount(roundCount + 1));
    dispatch(setRoundEnd(false));
  };

  const removeTagsFromString = (originalString: string) =>
    originalString.replace(/(<([^>]+)>)/gi, '');

  const removeTagsAndContextWord = (originalString: string) =>
    originalString.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '...');

  return isRoundEnd ? (
    <>
      <p className={styles.description}>Пример</p>
      <p className={styles.word__transcription}>{`${
        wordObj.textExample ? removeTagsFromString(wordObj.textExample) : ''
      }`}</p>
      <button
        className={styles['btn-next']}
        type="button"
        onClick={() => nextRoundHandler()}
      >
        {roundCount === 10 ? `Выйти` : `Далее`}
      </button>
    </>
  ) : (
    <>
      <p className={styles.description}>Контекст</p>
      <p className={styles.word__transcription}>
        {`${
          wordObj.textMeaning
            ? removeTagsAndContextWord(wordObj.textMeaning)
            : ''
        }`}
      </p>
      <button
        className={styles['btn-next']}
        type="button"
        onClick={() => dispatch(setRoundEnd(true))}
      >
        Не знаю
      </button>
    </>
  );
};
