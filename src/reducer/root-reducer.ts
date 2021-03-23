import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import { sprintGameReducer, SprintGameStateType } from './sprint-game-reducer';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  sprintGameState: SprintGameStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  sprintGameState: sprintGameReducer,
});

export default rootReducer;
