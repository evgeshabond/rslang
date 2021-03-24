import React from 'react';
import { connect } from 'react-redux';
import styles from './My-game.module.css';
import { ReactComponent as Play } from '../../assets/images/video-player-mini.svg';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';
import { ReactComponent as ExitButton } from '../../assets/images/exit-button-mini.svg';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/my-game-actions';
import { MyGameStartState } from '../../reducer/my-game-reducer';

type MapDispatchToProps = {
  myGameStart: (value: boolean) => actions.MyGameStartActionType;
};

type Props = MapDispatchToProps & MyGameStartState;

const shuffle = (array: Array<string>) => array.sort(() => Math.random() - 0.5);

type WordObjectType = { [key: string]: string };

const MyGame: React.FC<Props> = ({ myGameStart, myGameIsStarted }) => {
  console.log(myGameIsStarted);
  const word = 'planet';
  const wordArray = word.split('');

  const shuffledWordArray = shuffle([...wordArray]);

  const wordObject: WordObjectType = {};
  shuffledWordArray.forEach((char, index) => {
    wordObject[index.toString()] = char;
  });

  const charArray = Object.entries(wordObject);

  return myGameIsStarted ? (
    <div className={styles['my-game']}>
      <div className={styles.word}>
        <p className={`${styles.text}`}>Планета</p>
      </div>

      <h3 className={`${styles.text} ${styles.description}`}>
        Собери слово из букв.
      </h3>
      <button
        type="button"
        className={styles['exit-button']}
        onClick={() => myGameStart(false)}
      >
        <ExitButton />
      </button>
      <ul className={styles.word__wrapper}>
        {charArray.map((char) => (
          <li key={char[0]} className={styles.word__char}>
            {char[1]}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className={styles['my-game']}>
      <h2 className={styles.title}>cвоя игра</h2>
      <p className={styles.text}>
        Это тренировка для повторения заученных слов из вашего словаря.
      </p>
      <p className={styles.text}>
        Выберите соответствует ли перевод предложенному слову.
      </p>
      <button
        type="button"
        className={styles['play-button']}
        onClick={() => myGameStart(true)}
      >
        <Play className={styles.play} />
      </button>
      <CatSleeping className={styles.cat_sleeping} />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => state.myGameState;

export default connect(mapStateToProps, actions)(MyGame);
