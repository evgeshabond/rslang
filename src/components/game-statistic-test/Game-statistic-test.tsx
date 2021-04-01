import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatedWordsList } from '../../actions/aggregated-word-action';
import { setStatistics } from '../../actions/statistic-action';
import {
  addUserWord,
  getUserWord,
  getUserWordList,
  removeUserWord,
  userWordDeleted,
  userWordToEasy,
  userWordToHard,
  userWordToLearning,
  userWordToUnLearning,
  userWordUnDeleted,
} from '../../actions/user-words-action';
import { RootStateType } from '../../reducer/root-reducer';
import { filterQuery } from '../../services/word-aggregate-service';
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
      wordId: wordList.currentWordList[1].id,
      token: user.token,
      body: {
        difficulty: difficulty.easy,
        optional: {
          learning: false,
        },
      },
    };
    dispatch(addUserWord(params));
  };

  const getWordToState = () => {
    const param = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };

    dispatch(getUserWord(param));
  };

  const deleteWordToState = () => {
    const param = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
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

  // /----------------
  // update user word word
  //  -----------------

  const toDeleted = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    dispatch(userWordDeleted(params));
  };

  const toUnDeleted = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    dispatch(userWordUnDeleted(params));
  };

  const toHard = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    dispatch(userWordToHard(params));
  };

  const toEasy = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    dispatch(userWordToEasy(params));
  };

  const toLearning = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    dispatch(userWordToLearning(params));
  };

  const toUnLearning = () => {
    const params = {
      userId: user.userId,
      wordId: wordList.currentWordList[1].id,
      token: user.token,
    };
    dispatch(userWordToUnLearning(params));
  };

  // aggregate buttons
  //  const filterQuery = {
  //   deletedWord: 'deleted',
  //   allWords: 'all',
  //   hardWords: 'hard',
  //   easyAndWithoutTypesWords: 'easy',
  //   learnedWordsAndHardWords: 'learned',
  // };

  const getAggregateAll = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(getAggregatedWordsList(params, filterQuery.allWords));
  };

  const getAggregatedelete = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(getAggregatedWordsList(params, filterQuery.deletedWord));
  };

  const getAggregateEasy = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(
      getAggregatedWordsList(params, filterQuery.easyAndWithoutTypesWords)
    );
  };

  const getAggregateHard = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(getAggregatedWordsList(params, filterQuery.hardWords));
  };

  const getAggregateLearning = () => {
    const params = {
      userId: user.userId,
      token: user.token,
      page: 0,
      group: 0, // не обязательное поле по умолчанию будет 0
      wordsPerPage: 20,
    };
    dispatch(
      getAggregatedWordsList(params, filterQuery.learnedWordsAndHardWords)
    );
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
        value="delete word from back"
        onClick={deleteWordToState}
      />
      <input
        type="button"
        value="get userList words"
        onClick={getUserAllWord}
      />
      <h3>update word</h3>
      <input type="button" value="update delete" onClick={toDeleted} />
      <input type="button" value="update unDelete" onClick={toUnDeleted} />
      <input type="button" value="update toHard" onClick={toHard} />
      <input type="button" value="update toEasy" onClick={toEasy} />
      <input type="button" value="update toLearning" onClick={toLearning} />
      <input type="button" value="update toUnLearning" onClick={toUnLearning} />
      <h3>Aggregate</h3>
      <div>
        <input type="button" value="get all" onClick={getAggregateAll} />
      </div>
      <div>
        <input type="button" value="get delete" onClick={getAggregatedelete} />
      </div>

      <div>
        <input type="button" value="get easy" onClick={getAggregateEasy} />
      </div>

      <div>
        <input type="button" value="get hard" onClick={getAggregateHard} />
      </div>

      <div>
        <input
          type="button"
          value="get learning"
          onClick={getAggregateLearning}
        />
      </div>

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
