import {
  SprintGameStatusChangeActionType,
  SPRINT_GAME_STATUS_CHANGE,
} from '../actions/sprint-game-action';

export type SprintGameStateType = {
  gameStatus: string;
  points: number;
  level: number;
  timer: number;
  line: number;
  checkpoint: number;
  listType: string;
  correct: boolean;
};

const initialState = {
  gameTitle: 'СПРИНТ',
  gameDescription: `Это тренировка для повторения заученных слов из вашего словаря. Выберите соответствует ли перевод предложенному слову.`,
  gameStatus: 'start',
  points: 0,
  level: 0,
  timer: 60,
  line: 0,
  checkpoint: 0,
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
    default:
      return state;
  }
};
