import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllCount } from '../../../actions/game-result-actions';
import {
  clearWords,
  sprintGameBallsCounter,
  sprintGameCheckPoints,
  sprintGameCurrentPoints,
  sprintGameRandomArray,
  sprintGameShuffledArray,
  sprintGameStatusChange,
  sprintGameTotalPoints,
  sprintGameWordCounter,
} from '../../../actions/sprint-game-action';
import {
  CurrentWordListType,
  fetchWordsList,
} from '../../../actions/word-actions';
import { ReactComponent as Cat2 } from '../../../assets/images/cat2.svg';
import playIcon from '../../../assets/images/play-big.svg';
import { RootStateType } from '../../../reducer/root-reducer';
import ControlledSelect from '../../ControlledSelect/ControlledSelect';
import styles from './title-game-page.module.css';

export const TitleGamePage: React.FC = () => {
  const dispatch = useDispatch();

  const wordList = useSelector(
    (state: RootStateType) => state.wordState.currentWordList
  );

  // useEffect(() => {
  //   if (wordList.length === 0) {
  //     console.log('fetching');
  //     dispatch(fetchWordsList({ page: 0, group: 0 }));
  //   }
  // }, []);

  const getRandomNumber = (num: number) => Math.floor(Math.random() * num);

  const createRandomArray = (wordListArray: CurrentWordListType[]) => {
    const array = [];
    for (let i = 0; i < wordListArray.length; i++) {
      array.push(getRandomNumber(wordListArray.length));
    }
    console.log(array, 'random');
    return array;
  };

  useEffect(()=>{

    dispatch(sprintGameStatusChange('play'));
    dispatch(sprintGameWordCounter(0));
    dispatch(clearWords());
    dispatch(sprintGameTotalPoints(0));
    dispatch(sprintGameBallsCounter(0));
    dispatch(sprintGameCheckPoints(0));
    dispatch(sprintGameCurrentPoints(50));
    dispatch(clearAllCount());
  }, []);

  const isLevelVisible = useSelector(
    (state: RootStateType) => state.menuState.isLevelVisible
  );

  const startGameHandler = () => {
    dispatch(sprintGameWordCounter(0));
    dispatch(sprintGameStatusChange('timer'));
    dispatch(
      sprintGameShuffledArray(wordList.slice().sort(() => Math.random() - 0.5))
    );
    dispatch(sprintGameRandomArray(createRandomArray(wordList)));

    console.log('shuffledArray !');
  };

  return (
    <div className={styles.game__wrapper}>
      <div className={styles['start-game-content']}>
        <h2>СПРИНТ</h2>
        <p>
          Это тренировка для повторения заученных слов из вашего словаря.
          Выберите соответствует ли перевод предложенному слову.
        </p>
        <div className={styles.cat__img1}>
          <Cat2 />
        </div>

        <button
          type="button"
          onClick={startGameHandler}
          className={styles['play-button']}
        >
          {' '}
          <img src={playIcon} alt="play" />
        </button>
        {isLevelVisible ? <ControlledSelect /> : null}
      </div>
    </div>
  );
};
