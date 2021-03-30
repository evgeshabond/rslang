import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import {
  constructorGameReducer,
  ConstructorGameStartState,
} from './constructor-game-reducer';
import { questionReducer, QuestionStateType } from './question-reducer';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  constructorGameState: ConstructorGameStartState;
  questionState: QuestionStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  constructorGameState: constructorGameReducer,
  questionState: questionReducer,
});

export default rootReducer;
