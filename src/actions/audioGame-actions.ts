const AUDIO_GAME_STATUS = 'AUDIO_GAME_STATUS';

const audioGameStart = (value: boolean) => ({
  type: AUDIO_GAME_STATUS,
  payload: value
})


export type AudioGameStartActionType = {
  type: string;
  payload: boolean;
};


export { audioGameStart, AUDIO_GAME_STATUS }