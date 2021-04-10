import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayStatistic } from '../../../actions/statistic-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { mainPath } from '../../../utils/constants';
import { DashboardButton } from '../dashboard-button/Dashboard-button';
import { DashboardText } from '../dashboard-text/dashboard-text';

const DashboardGame: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState);
  const todayStat = useSelector(
    (state: RootStateType) => state.statisticState.gameToday
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      userId: user.user.userId,
      token: user.user.token,
    };
    if (user.isLogin) {
      dispatch(getTodayStatistic(params));
    }
  }, [dispatch, user]);
  return (
    <>
      <DashboardText>Сегодня игр</DashboardText>
      <DashboardText>
        Саванна: &nbsp; {todayStat.savanna ? todayStat.savanna.gameCount : 0}
      </DashboardText>
      <DashboardText>
        Спринт: &nbsp; {todayStat.sprint ? todayStat.sprint.gameCount : 0}
      </DashboardText>
      <DashboardText>
        Аудио-Вызов: &nbsp;{' '}
        {todayStat.audiocall ? todayStat.audiocall.gameCount : 0}
      </DashboardText>
      <DashboardText>
        Конструктор: &nbsp;{' '}
        {todayStat.constructors ? todayStat.constructors.gameCount : 0}
      </DashboardText>
      <div>
        <DashboardButton link={mainPath.gamePage} buttonName="Играть" />
      </div>
    </>
  );
};

export { DashboardGame };
