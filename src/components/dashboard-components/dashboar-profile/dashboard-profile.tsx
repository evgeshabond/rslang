import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { userLogOut, updateUser } from '../../../actions/user-actions';
import { RootStateType } from '../../../reducer/root-reducer';
import authStyles from '../../auth/auth.module.css';
import { mainPath } from '../../../utils/constants';
import { ImageLoader } from '../../image-loader/Image-loader';
import { DashboardText } from '../dashboard-text/dashboard-text';
import styles from './dashboard-profile.module.css';
import { DashboardButton } from '../dashboard-button/Dashboard-button';

type Props = RouteComponentProps;

const DashboardProfile: React.FC<Props> = ({ history }) => {
  const user = useSelector((state: RootStateType) => state.userState.user);
  const newFoto = useSelector(
    (state: RootStateType) => state.userState.uploadFoto64
  );
  const userState = useSelector((state: RootStateType) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newFoto === '') {
      return;
    }
    dispatch(
      updateUser({
        userId: user.userId,
        token: user.token,
        body: {
          foto64: newFoto,
        },
      })
    );
  }, [newFoto]);

  const logOut = () => {
    dispatch(userLogOut());
    history.push(mainPath.auth);
  };
  return (
    <>
      <DashboardText>Мои данные</DashboardText>
      {userState.isLogin ? (
        <>
          <div className={authStyles['profile-img-wrapper']}>
            <ImageLoader />
          </div>
          <input
            className={`${styles['user-info']} ${authStyles['login-icon']}`}
            type="text"
            value={user.name}
            readOnly
          />

          <input
            className={`${authStyles['auth-input']} ${authStyles['email-icon']}`}
            type="email"
            value={user.email}
            readOnly
          />
          <DashboardText>Мой уровень</DashboardText>
          {!user.level ? (
            <div>
              <DashboardButton
                link={mainPath.questionPage}
                buttonName="Определить уровень"
              />
            </div>
          ) : (
            <DashboardText>{user.level}</DashboardText>
          )}
        </>
      ) : (
        <>
          <DashboardText>
            Для сохранения Ваших результатов пожалуиста авторизуйтесь
          </DashboardText>
          <div>
            <DashboardButton link={mainPath.auth} buttonName="Авторизоваться" />
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(DashboardProfile);
