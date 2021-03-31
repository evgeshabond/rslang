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
import { userWordsReducer, UserWordsStateType } from './user-words-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  constructorGameState: ConstructorGameStartState;
  questionState: QuestionStateType;
  statisticState: StatisticStateType;
  userWordsState: UserWordsStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  constructorGameState: constructorGameReducer,
  questionState: questionReducer,
  statisticState: statisticReducer,
  userWordsState: userWordsReducer,
});

export default rootReducer;
