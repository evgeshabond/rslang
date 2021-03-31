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

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
  audioGameState: AudioGameState;
  constructorGameState: ConstructorGameStartState;
  questionState: QuestionStateType;
  statisticState: StatisticStateType;
};

const rootReducer = combineReducers({
  wordState: wordReducer,
  userState: userReducer,
  menuState: menuReducer,
  audioGameState: audioGameReducer,
  constructorGameState: constructorGameReducer,
  questionState: questionReducer,
  statisticState: statisticReducer,
});

export default rootReducer;
