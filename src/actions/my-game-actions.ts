const MY_GAME_PLAY_STATUS = 'MY_GAME_PLAY_STATUS';

const myGameStart = (value: boolean) => ({
  type: MY_GAME_PLAY_STATUS,
  payload: value,
});

export type MyGameStartActionType = {
  type: string;
  payload: boolean;
};

export { myGameStart, MY_GAME_PLAY_STATUS };
