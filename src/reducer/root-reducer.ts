import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import {
  constructorGameReducer,
  ConstructorGameStartState,
} from './constructor-game-reducer';
import { questionReducer, QuestionStateType } from './question-reducer';
import { statisticReducer, StatisticStateType } from './statistic-reduser';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';
import { audioGameReducer, AudioGameState } from './audio-game-reducer'
import { userWordsReducer, UserWordsStateType } from './user-words-reducer';
import {
  aggregatedWordsReducer,
  AggregatedWordsStateType,
} from './words-aggregated-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  audioGameState: AudioGameState;
  constructorGameState: ConstructorGameStartState;
  questionState: QuestionStateType;
  statisticState: StatisticStateType;
  userWordsState: UserWordsStateType;
  aggregatedWordsState: AggregatedWordsStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  audioGameState: audioGameReducer,
  constructorGameState: constructorGameReducer,
  questionState: questionReducer,
  statisticState: statisticReducer,
  userWordsState: userWordsReducer,
  aggregatedWordsState: aggregatedWordsReducer,
});

export default rootReducer;
