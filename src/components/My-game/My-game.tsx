import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './My-game.module.css';
import { ReactComponent as Play } from '../../assets/images/video-player-mini.svg';
import { ReactComponent as CatSleeping } from '../../assets/images/cat-sleeping.svg';
import { ReactComponent as ExitButton } from '../../assets/images/exit-button-mini.svg';
import { RootStateType } from '../../reducer/root-reducer';
import * as actions from '../../actions/my-game-actions';
import { MyGameStartState } from '../../reducer/my-game-reducer';
import { WordStateType } from '../../reducer/word-reducer';

type MapDispatchToProps = {
  myGameStart: (value: boolean) => actions.MyGameStartActionType;
};

type Props = MapDispatchToProps & MyGameStartState & WordStateType;

const shuffle = (array: Array<string>) => array.sort(() => Math.random() - 0.5);

type WordObjectType = { [key: string]: string };

const MyGame: React.FC<Props> = ({ myGameStart, myGameIsStarted }) => {
  const word = 'planet';
  const wordArray = word.split('');

  const shuffledWordArray = shuffle(wordArray);

  const wordObject: WordObjectType = {};
  shuffledWordArray.forEach((char, index) => {
    wordObject[index.toString()] = char;
  });

  const charArray = Object.entries(wordObject);

  const [chars, updateCharsPosition] = useState(charArray);

  function updateCharsPositionHandler(result: any) {
    console.log(`update before ${chars}`);
    if (!result.destination) {
      return;
    }

    const items = Array.from(chars);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log(`update after ${items}`);
    updateCharsPosition(items);
  }

  return myGameIsStarted ? (
    <div className={styles['my-game']}>
      <div className={styles.word__container}>
        <p className={`${styles.text} ${styles.word}`}>Планета</p>
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
      <DragDropContext onDragEnd={updateCharsPositionHandler}>
        <Droppable droppableId="chars" direction="horizontal">
          {(provided: any) => (
            <ul
              className={`${styles.word__wrapper} chars`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {console.log(`Render array${chars}`)}
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

const mapStateToProps = (state: RootStateType) => ({
  ...state.myGameState,
  ...state.wordState,
});

export default connect(mapStateToProps, actions)(MyGame);
