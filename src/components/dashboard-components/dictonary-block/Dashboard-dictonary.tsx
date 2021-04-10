import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatedWordsList } from '../../../actions/aggregated-word-action';
import { RootStateType } from '../../../reducer/root-reducer';
import { filterQuery } from '../../../services/word-aggregate-service';
import { mainPath } from '../../../utils/constants';
import { DashboardButton } from '../dashboard-button/Dashboard-button';
import { DashboardText } from '../dashboard-text/dashboard-text';

const DashboardDictionary: React.FC = () => {
  const user = useSelector((state: RootStateType) => state.userState);
  const totalStat = useSelector(
    (state: RootStateType) => state.aggregatedWordsState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      userId: user.user.userId,
      token: user.user.token,
      page: 0,
      group: -1,
      wordsPerPage: 20,
    };
    if (user.isLogin) {
      dispatch(
        getAggregatedWordsList(params, filterQuery.learnedWordsAndHardWords)
      );
    }
  }, [dispatch, user]);
  return (
    <>
      <DashboardText>Всего 3600 слов</DashboardText>
      <DashboardText>
        Изучаемые: &nbsp; {totalStat.learningWordCount}
      </DashboardText>
      <DashboardText>Сложные: &nbsp; {totalStat.hardWordCount}</DashboardText>
      <DashboardText>
        Удаленные: &nbsp; {totalStat.deletedWordCount}
      </DashboardText>
      <div>
        <DashboardButton link={mainPath.ebookPage} buttonName="Изучать" />
      </div>
    </>
  );
};

export { DashboardDictionary };
