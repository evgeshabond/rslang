import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import { myGameReducer, MyGameStartState } from './my-game-reducer';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  myGameState: MyGameStartState;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  myGameState: myGameReducer,
});

export default rootReducer;
