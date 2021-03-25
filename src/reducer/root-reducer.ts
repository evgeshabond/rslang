import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';
import { audioGameReducer, AudioGameState } from './audio-game-reducer'

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  audioGameState: AudioGameState;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  audioGameState: audioGameReducer
});

export default rootReducer;
