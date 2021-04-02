import {
  AUDIO_GAME_STATUS,
  AudioGameStartActionType,
  WORD_WRONG,
  WORD_RIGHT,
  IS_ANSWER_SELECTED
} from '../actions/audioGame-actions';

import { CurrentWordListType } from '../actions/word-actions';

export type AudioGameState = {
  audioGameStart: boolean;
  wordWrong:string;
  wordRight: CurrentWordListType;
  isAnswerSelected: boolean
};

const initialState: AudioGameState = {
  audioGameStart: false,
  isAnswerSelected: false,
  wordWrong: '',
  wordRight: {
    id: '0',
    group: 0,
    page: 0,
    word: '',
    image: '',
    audio: '',
    audioMeaning: '',
    audioExample: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    wordTranslate: '',
    textMeaningTranslate: '',
    textExampleTranslate: '',
  }
};

const audioGameReducer = (state = initialState, action: AudioGameStartActionType) => {
  switch (action.type) {
    case AUDIO_GAME_STATUS:
      return { ...state, audioGameStart: action.payload };
    case WORD_WRONG:
      return { ...state, wordWrong: action.payload };
    case WORD_RIGHT:
      return { ...state, wordRight: action.payload };
    case IS_ANSWER_SELECTED:
      return { ...state,  isAnswerSelected: action.payload };
    default:
      return state;
  }
};


export { audioGameReducer }

