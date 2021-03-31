import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatistics } from '../../actions/statistic-action';
import { RootStateType } from '../../reducer/root-reducer';
import { gameType } from '../../utils/constants';

export const GameTest: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState.user);
  const gameStatistic = useSelector(
    (state: RootStateType) => state.statisticState.optional.gameStatistic
  );
  const dispatch = useDispatch();
  const sendStat = () => {
    const param = {
      userId: user.userId,
      token: user.token,
      gameType: gameType.savanna,
      body: {
        date: Date.now(),
        level: user.level,
        know: 5,
        dont_know: 2,
      },
    };

    dispatch(setStatistics(param));
  };

  const renderSavanaStatistic = () => {
    if (gameStatistic.savanna) {
      return gameStatistic.savanna.total.map((item) => (
        <div key={item.date}>
          <div>{item.know}</div>
          <div>{item.dont_know}</div>
        </div>
      ));
    }
    return null;
  };
  const renderAudiocallStatistic = () => {
    if (gameStatistic.audiocall) {
      return gameStatistic.audiocall.total.map((item) => (
        <div key={item.date}>
          <div>{item.know}</div>
          <div>{item.dont_know}</div>
        </div>
      ));
    }
    return null;
  };

  const renderConstructorsStatistic = () => {
    if (gameStatistic.constructors) {
      return gameStatistic.constructors.total.map((item) => (
        <div key={item.date}>
          <div>{item.know}</div>
          <div>{item.dont_know}</div>
        </div>
      ));
    }
    return null;
  };

  const renderSprintStatistic = () => {
    if (gameStatistic.sprint) {
      return gameStatistic.sprint.total.map((item) => (
        <div key={item.date}>
          <div>{item.know}</div>
          <div>{item.dont_know}</div>
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      <div>game test</div>
      <input type="button" value="send stat" onClick={sendStat} />
      <h3>savanna</h3>
      <div>{renderSavanaStatistic()}</div>
      <h3>sprint</h3>
      <div>{renderSprintStatistic()}</div>
      <h3>audiocall</h3>
      <div>{renderAudiocallStatistic()}</div>
      <h3>constructors</h3>
      <div>{renderConstructorsStatistic()}</div>
    </div>
  );
};
