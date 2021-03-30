import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import { RootStateType } from '../../../reducer/root-reducer';
import styles from './TopBlock.module.css';
import { ReactComponent as ExitButton } from '../../../assets/images/exit-button-mini.svg';
import { ReactComponent as AudioOn } from '../../../assets/images/audioOn.svg';
import { mainPath } from '../../../utils/constants';
import { constructorGameStart } from '../../../actions/constructor-game-actions';

export const TopBlock: React.FC = () => {
  const dispatch = useDispatch();

  const wordObj = useSelector(
    (state: RootStateType) => state.constructorGameState.wordObj
  );

  const isRoundEnd = useSelector(
    (state: RootStateType) => state.constructorGameState.constructorRoundStatus
  );

  const roundCount = useSelector(
    (state: RootStateType) => state.constructorGameState.roundCount
  );

  const [wordSound] = useSound(
    `${mainPath.langUrl}${wordObj === undefined ? '' : wordObj.audio}`,
    {
      interrupt: true,
    }
  );

  const endGameHandler = () => {
    dispatch(constructorGameStart(false));
  };

  return (
    <>
      <div className={styles.word__container}>
        <div className={styles.word__empty} />
        <div className={styles.word__inner}>
          <p className={`${styles.text} ${styles.word}`}>
            {wordObj.wordTranslate}
          </p>
          {isRoundEnd ? (
            <p className={styles.word__transcription}>
              {wordObj.transcription}
            </p>
          ) : (
            <p className={styles.description}>Собери слово из букв.</p>
          )}
        </div>
        <div className={styles.counter}>{`${roundCount}/10`}</div>
      </div>
      <button
        type="button"
        className={styles['audio-button']}
        onClick={() => (isRoundEnd ? wordSound() : null)}
      >
        <AudioOn />
      </button>
      <button
        type="button"
        className={styles['exit-button']}
        onClick={endGameHandler}
      >
        <ExitButton />
      </button>
    </>
  );
};
