import { combineReducers } from 'redux';
import { menuReducer, MenuState } from './menu-reducer';
import { sprintGameReducer, SprintGameStateType } from './sprint-game-reducer';
import {
  constructorGameReducer,
  ConstructorGameStartState,
} from './constructor-game-reducer';
import { questionReducer, QuestionStateType } from './question-reducer';
import { statisticReducer, StatisticStateType } from './statistic-reduser';

import { userReducer, UserState } from './user-reducer';
import { wordReducer, WordStateType } from './word-reducer';
import { audioGameReducer, AudioGameState } from './audio-game-reducer';
import { savannaGameReducer, SavannaGameState } from './savanna-game-reducer'
import { userWordsReducer, UserWordsStateType } from './user-words-reducer';
import {
  aggregatedWordsReducer,
  AggregatedWordsStateType,
} from './words-aggregated-reducer';
// import { SavannaGameActionType } from '../actions/savanna-game-actions';

export type RootStateType = {
  wordState: WordStateType;
  userState: UserState;
  menuState: MenuState;
<<<<<<< HEAD
  audioGameState: AudioGameState;
  savannaGameState: SavannaGameState;
=======
  sprintGameState: SprintGameStateType;
>>>>>>> e9648678e6b913cdbef042b7c66f44e1223ae2b0
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
<<<<<<< HEAD
  audioGameState: audioGameReducer,
  savannaGameState: savannaGameReducer,
=======
  sprintGameState: sprintGameReducer,
>>>>>>> e9648678e6b913cdbef042b7c66f44e1223ae2b0
  constructorGameState: constructorGameReducer,
  questionState: questionReducer,
  statisticState: statisticReducer,
  userWordsState: userWordsReducer,
  aggregatedWordsState: aggregatedWordsReducer,
});

export default rootReducer;
