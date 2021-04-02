import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentWordListType } from '../../actions/word-actions';
import styles from './word-item-game.module.css';
import { RootStateType } from '../../reducer/root-reducer';


type Props = {
  word: CurrentWordListType,
  buttonClick: () => void;

};

const WordItem: React.FC<Props> = ({ word, buttonClick }) => {
  const dispatch = useDispatch();

  const wordWrong = useSelector((state: RootStateType) => state.audioGameState.wordWrong);
  const correctWord = useSelector((state: RootStateType) => state.audioGameState.wordRight);
  const isAnswer = useSelector((state: RootStateType) => state.audioGameState.isAnswerSelected);


  return (

    < button type='button' onClick={buttonClick} className={`${styles.word__item}  ${wordWrong !== correctWord.word && wordWrong === word.word ? styles.word__item__wrong : ''} ${(wordWrong === correctWord.word && wordWrong === word.word) ? styles.word__item__right : ''} `}>
      { word.wordTranslate}
    </button >



  )

}


export { WordItem };
