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
import classes from './AudioGame.module.css';
import WordList from '../words-list';
import *as actions from '../../actions/audioGame-actions';
import { AudioGameStartState } from '../../reducer/audio-game-reducer'

type MapDispatchToProps = {
  audioGameStart: (value: boolean) => actions.AudioGameStartActionType;
}
type Props = WordStateType & ReturnType<typeof mapDispatchToProps>;

const AudioGame: React.FC<Props> = ({ audioGameStart, currentWordList,
  loading,
  fetchErr,
  pageNumber,
  groupNumber,
  fetchList,
  listLoaded }) => {
  useEffect(() => {
    fetchList({ page: 0, group: 0 });
  }, [fetchList]);
  console.log(currentWordList)

  const getRandomInt = (min: number, max: number) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  )

  const shuffle = (arr: Array<CurrentWordListType>) => {
    const result = [];
    const elem = arr.slice()
    while (elem.length > 0) {
      const random = getRandomInt(0, elem.length - 1);
      result.push(elem.splice(random, 1)[0]);
    }
    return result;
  }


  console.log(shuffle(currentWordList))
  const renderWordCard = () => (
    <div className={classes.game__content}>
      <div>
        <div className={classes.word__list}>
          {/* console.log(word.id) */}
          {
            currentWordList.filter((item: Object, index: number) => index < 5).map((word: CurrentWordListType, index: number) => (
              <WordItem key={word.id} word={word} />

            ))
          }

        </div>
      </div>

    </div>

  )


  return <>{loading ? <Spinner /> : <div>{renderWordCard()}</div>}</>;


  // return (
  //     <div className={classes.game__wrapper}>
  //         {/* <WordList /> */}
  //         <div className={classes.game__content}>
  //             <div className={classes.game__title}>Аудиовызов</div>
  //             <div className={classes.game__decription}>Тренировка улучшает восприятие английской речи на слух.
  //             Выберите из предложенных вариантов ответа правильный перевод слова,
  // которое услышите</div>
  //             <div className={classes.game__btn} />
  //         </div>


  //     </div>
  // )
};

const mapStateToProps = (state: RootStateType) => state.wordState;

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators<any, any>(
    {
      fetchList: fetchWordsList,
      listLoaded: wordListLoaded,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AudioGame);

