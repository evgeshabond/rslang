import { combineReducers } from 'redux';
import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
});

export default rootReducer;
