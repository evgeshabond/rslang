import {
  AUDIO_GAME_STATUS,
  AudioGameStartActionType
} from '../actions/audioGame-actions'

export type AudioGameState = {
  audioGameStart: boolean;
};

const initialState: AudioGameState = {
  audioGameStart: false
};

const audioGameReducer = (state = initialState, action: AudioGameStartActionType) => {
  switch (action.type) {
    case AUDIO_GAME_STATUS:
      return { ...state, audioGameStart: action.payload };
    default:
      return state;
  }
};


export { audioGameReducer }

