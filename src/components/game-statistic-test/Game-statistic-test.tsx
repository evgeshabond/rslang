import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatistics } from '../../actions/statistic-action';
import {
  addUserWord,
  getUserWord,
  getUserWordList,
  removeUserWord,
  updateUserWord,
} from '../../actions/user-words-action';
import { RootStateType } from '../../reducer/root-reducer';
import { difficulty, gameType } from '../../utils/constants';

export const GameTest: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState.user);
  const gameStatistic = useSelector(
    (state: RootStateType) => state.statisticState.optional.gameStatistic
  );
  const wordList = useSelector((state: RootStateType) => state.wordState);
  const userWordState = useSelector(
    (state: RootStateType) => state.userWordsState
  );
  const dispatch = useDispatch();
  const sendStat = () => {
    const param = {
      userId: user.userId,
      token: user.token,
      gameType: gameType.savanna,
      body: {
        date: Date.now(),
        level: user.level,
        know: 5,
        dont_know: 2,
      },
    };

    dispatch(setStatistics(param));
  };

  const addwordToState = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[0].id,
      token: user.token,
      body: {
        difficulty: difficulty.easy,
        optional: {
          isDeleted: false,
        },
      },
    };
    dispatch(addUserWord(params));
  };

  const getWordToState = () => {
    const param = {
      userId: user.userId,
      wordId: wordList.currentWordList[0].id,
      token: user.token,
    };

    dispatch(getUserWord(param));
  };

  const updateWordToState = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
      body: {
        difficulty: difficulty.easy,
        optional: {
          isDeleted: true,
        },
      },
    };
    dispatch(updateUserWord(params));
  };

  const deleteWordToState = () => {
    const param = {
      userId: user.userId,
      wordId: wordList.currentWordList[0].id,
      token: user.token,
    };

    dispatch(removeUserWord(param));
  };

  const getUserAllWord = () => {
    const param = {
      userId: user.userId,
      token: user.token,
    };

    dispatch(getUserWordList(param));
  };

  // const renderSavanaStatistic = () => {
  //   if (gameStatistic.savanna) {
  //     return gameStatistic.savanna.total.map((item) => (
  //       <div key={item.date}>
  //         <div>{item.know}</div>
  //         <div>{item.dont_know}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };
  // const renderAudiocallStatistic = () => {
  //   if (gameStatistic.audiocall) {
  //     return gameStatistic.audiocall.total.map((item) => (
  //       <div key={item.date}>
  //         <div>{item.know}</div>
  //         <div>{item.dont_know}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };

  // const renderConstructorsStatistic = () => {
  //   if (gameStatistic.constructors) {
  //     return gameStatistic.constructors.total.map((item) => (
  //       <div key={item.date}>
  //         <div>{item.know}</div>
  //         <div>{item.dont_know}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // };

  const renderSprintStatistic = () => {
    if (gameStatistic.sprint) {
      return gameStatistic.sprint.total.map((item) => (
        <div key={item.date}>
          <div>{item.know}</div>
          <div>{item.dont_know}</div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      <div>game test</div>
      <input type="button" value="send stat" onClick={sendStat} />
      <h3>savanna</h3>
      <input type="button" value="add word to back" onClick={addwordToState} />
      <input type="button" value="get word to state" onClick={getWordToState} />
      <input
        type="button"
        value="update word to state"
        onClick={updateWordToState}
      />
      <input
        type="button"
        value="delete word from back"
        onClick={deleteWordToState}
      />
      <input
        type="button"
        value="get userList words"
        onClick={getUserAllWord}
      />
      {/* <div>{renderSavanaStatistic()}</div>
      <h3>sprint</h3>
      <div>{renderSprintStatistic()}</div>
      <h3>audiocall</h3>
      <div>{renderAudiocallStatistic()}</div>
      <h3>constructors</h3>
      <div>{renderConstructorsStatistic()}</div> */}
    </div>
  );
};
