import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import {
  CurrentWordListType,
  fetchWordsList,
  wordListLoaded,
} from '../../actions/word-actions';
import { RootStateType } from '../../reducer/root-reducer';
import { WordStateType } from '../../reducer/word-reducer';
import Spinner from '../Spinner/Spinner';
import { WordItem } from '../word-item/word-item-game';
import styles from './AudioGame.module.css';
import WordList from '../word-list/words-list';
import *as actions from '../../actions/audioGame-actions';
import { AudioGameState } from '../../reducer/audio-game-reducer'

type MapDispatchToProps = {
  audioGameStart: (value: boolean) => actions.AudioGameStartActionType;
}
type Props = WordStateType & ReturnType<typeof mapDispatchToProps> & AudioGameState;

const AudioGame: React.FC<Props> = ({ audioGameStart, currentWordList,
  loading,
  fetchList,
  fetchErr,
  pageNumber,
  groupNumber,
  listLoaded,
}) => {
  useEffect(() => {
    fetchList({ page: 0, group: 0 });
  }, [fetchList]);

  // console.log(audioGameStart);

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  const shuffle = (arr: Array<CurrentWordListType>) => {
    const result = [];
    if (arr) {
      const elem = arr.slice();
      while (elem.length > 0) {
        const random = getRandomInt(0, elem.length - 1);
        result.push(elem.splice(random, 1)[0]);
      }
    }
    return result;
  }

  const currentPlayList = shuffle(currentWordList).filter((item: Object, index: number) => index < 5);
  console.log(currentPlayList)

  console.log(shuffle(currentWordList))
  const renderWordCard = () => (

    <div className={styles.word__list}>
      {
        currentPlayList.map((word: CurrentWordListType, index: number) => (
          <WordItem key={word.id} word={word} />
        ))
      }

    </div>

  )


  return (
    <div className={styles.game__content}>
      <div className={styles.sound__btn} />
      {loading ? <Spinner /> : renderWordCard()}
      <div className={styles.playing__btn}>
        Не знаю
      </div>
    </div>
  )



  // return (
  //     <div className={styles.game__wrapper}>
  //         {/* <WordList /> */}
  //         <div className={styles.game__startSreen}>
  //             <div className={styles.game__title}>Аудиовызов</div>
  //             <div className={styles.game__decription}>Тренировка улучшает восприятие английской речи на слух.
  //             Выберите из предложенных вариантов ответа правильный перевод слова,
  // которое услышите</div>
  //             <div className={styles.game__start__btn} />
  //         </div>


  //     </div>
  // )
};

const mapStateToProps = (state: RootStateType) => state.wordState;
//   console.log(state.wordState);
//   return state.wordState, state.audioGameState
// }




const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators<any, any>(
    {
      fetchList: fetchWordsList,
      listLoaded: wordListLoaded,
      // audioGameStart: 

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AudioGame);

