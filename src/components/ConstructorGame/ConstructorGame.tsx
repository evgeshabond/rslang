import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './ConstructorGame.module.css';
import { ReactComponent as Play } from '../../assets/images/video-player-mini.svg';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';
import { ReactComponent as ExitButton } from '../../assets/images/exit-button-mini.svg';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/my-game-actions';
import { MyGameStartState } from '../../reducer/my-game-reducer';
import { WordStateType } from '../../reducer/word-reducer';
import { CurrentWordListType } from '../../actions/word-actions';
import { mainPath } from '../../utils/constants';

type MapDispatchToProps = {
  myGameStart: (value: boolean) => actions.MyGameStartActionType;
};

type Props = MapDispatchToProps & MyGameStartState & WordStateType;

const shuffle = (array: Array<string>) => {
  const arrCopy = [...array];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
};
const getRandomWord = (items: any) =>
  items[Math.floor(Math.random() * items.length)];

type WordObjectType = { [key: string]: string };

const MyGame: React.FC<Props> = ({
  myGameStart,
  myGameIsStarted,
  currentWordList,
}) => {
  const [wordObj, setWord] = useState<CurrentWordListType>(
    {} as CurrentWordListType
  );

  const [isRoundEnd, setRoundEnd] = useState(false);

  const [chars, updateCharsPosition] = useState([['', '']]);

  useEffect(() => {
    setWord(getRandomWord(currentWordList));
  }, [currentWordList]);

  useEffect(() => {
    if (wordObj.word === undefined) {
      return;
    }
    const wordArray = wordObj.word.split('');

    const shuffledWordArray = shuffle(wordArray);

    const wordObject: WordObjectType = {};
    shuffledWordArray.forEach((char, index) => {
      wordObject[index.toString()] = char;
    });

    const charArray = Object.entries(wordObject);

    updateCharsPosition(charArray);

    if (isRoundEnd) {
      const startWordObject: WordObjectType = {};
      wordArray.forEach((char, index) => {
        startWordObject[index.toString()] = char;
      });

      const resultArray = Object.entries(startWordObject);
      updateCharsPosition(resultArray);
    }
  }, [wordObj, isRoundEnd, wordObj.word]);

  useEffect(() => {
    const currentChars = chars.map((char) => char[1]).join('');
    if (wordObj.word === currentChars) {
      setRoundEnd(true);
    }
  }, [wordObj.word, chars]);

  function updateCharsPositionHandler(result: any) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(chars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharsPosition(items);
  }

  const nextRoundHandler = () => {
    setWord(getRandomWord(currentWordList));
    setRoundEnd(false);
  };

  const removeTagsFromString = (originalString: string) =>
    originalString.replace(/(<([^>]+)>)/gi, '');

  const removeTagsAndContextWord = (originalString: string) =>
    originalString.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '...');

  return myGameIsStarted ? (
    <div className={styles['my-game']}>
      <div className={styles.word__container}>
        <p className={`${styles.text} ${styles.word}`}>
          {wordObj.wordTranslate}
        </p>
      </div>

      {isRoundEnd ? (
        <p className={styles.word__transcription}>{wordObj.transcription}</p>
      ) : (
        <p className={styles.description}>Собери слово из букв.</p>
      )}

      <button
        type="button"
        className={styles['exit-button']}
        onClick={() => myGameStart(false)}
      >
        <ExitButton />
      </button>
      {chars.length > 1 ? (
        <DragDropContext onDragEnd={updateCharsPositionHandler}>
          <Droppable droppableId="chars" direction="horizontal">
            {(provided: any) => (
              <ul
                className={`${styles.word__wrapper} chars`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {chars.map((char, index) => (
                  <Draggable key={char[0]} draggableId={char[0]} index={index}>
                    {(providedInner: any) => (
                      <li
                        key={char[0]}
                        className={styles.word__char}
                        ref={providedInner.innerRef}
                        {...providedInner.draggableProps}
                        {...providedInner.dragHandleProps}
                      >
                        {char[1]}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}

      <img src={`${mainPath.langUrl}${wordObj.image}`} alt={wordObj.word} />
      {isRoundEnd ? (
        <>
          <p className={styles.description}>Контекст</p>
          <p className={styles.word__transcription}>{`${
            wordObj.textMeaning
              ? `${removeTagsFromString(wordObj.textMeaning)} ${
                  wordObj.textExample
                }`
              : ''
          }`}</p>
          <button
            className={styles['btn-next']}
            type="button"
            onClick={() => nextRoundHandler()}
          >
            Далее
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
            onClick={() => setRoundEnd(true)}
          >
            Не знаю
          </button>
        </>
      )}
      <CatSleeping className={styles.cat_sleeping} />
    </div>
  ) : (
    <div className={styles['my-game']}>
      <h2 className={styles.title}>конструктор слов</h2>
      <p className={styles.text}>
        Составление оригинального слова по переводу.
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

const mapStateToProps = (state: RootStateType) => ({
  ...state.myGameState,
  ...state.wordState,
});

export default connect(mapStateToProps, actions)(MyGame);
