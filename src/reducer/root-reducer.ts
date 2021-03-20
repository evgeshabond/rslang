import { combineReducers } from 'redux';
import { wordReducer, WordStateType } from './word-reducer';

export type RootStateType = {
  wordState: WordStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
});

export default rootReducer;
