import {
  SprintGameStatusChangeActionType,
  SPRINT_GAME_CURRENT_POINTS,
  SPRINT_GAME_RANDOM_ARRAY,
  SPRINT_GAME_SHUFFLED_ARRAY,
  SPRINT_GAME_STATUS_CHANGE,
  SPRINT_GAME_TOTAL_POINTS,
  SPRINT_GAME_CHECK_POINTS,
  SPRINT_GAME_BALLS_COUNTER,
} from '../actions/sprint-game-action';
import { CurrentWordListType } from '../actions/word-actions';

export type SprintGameStateType = {
  gameDescription: string;
  gameTitle: string;
  gameStatus: string;
  shuffledArray: CurrentWordListType[];
  randomArray: number[];
  totalPoints: number;
  currentPoints: number;
  level: number;
  timer: number;
  ballsCounter: number;
  checkpoints: number;
  listType: string;
  correct: boolean;
};

const initialState = {
  gameTitle: 'СПРИНТ',
  gameDescription: `Это тренировка для повторения заученных слов из вашего словаря. Выберите соответствует ли перевод предложенному слову.`,
  gameStatus: 'start',
  shuffledArray: [],
  randomArray: [],
  totalPoints: 0,
  currentPoints: 50,
  level: 0,
  timer: 60,
  ballsCounter: 0,
  checkpoints: 0,
  listType: '',
  correct: false,
};

export const sprintGameReducer = (
  state = initialState,
  action: SprintGameStatusChangeActionType
) => {
  switch (action.type) {
    case SPRINT_GAME_STATUS_CHANGE:
      return { ...state, gameStatus: action.payload };
    case SPRINT_GAME_TOTAL_POINTS:
      return { ...state, totalPoints: action.payload };
    case SPRINT_GAME_SHUFFLED_ARRAY:
      return { ...state, shuffledArray: action.payload };
    case SPRINT_GAME_CURRENT_POINTS:
      return { ...state, currentPoints: action.payload };
    case SPRINT_GAME_RANDOM_ARRAY:
      return { ...state, randomArray: action.payload };
    case SPRINT_GAME_CHECK_POINTS:
      return { ...state, checkpoints: action.payload };
    case SPRINT_GAME_BALLS_COUNTER:
      return { ...state, ballsCounter: action.payload };
    default:
      return state;
  }
};
