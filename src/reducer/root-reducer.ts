import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import { questionReducer, QuestionStateType } from './question-reducer';
import { statisticReducer, StatisticStateType } from './statistic-reduser';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  questionState: QuestionStateType;
  statisticState: StatisticStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  questionState: questionReducer,
  statisticState: statisticReducer,
});

export default rootReducer;
