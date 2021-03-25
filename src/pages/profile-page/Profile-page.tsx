import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as actions from '../../actions/user-actions';
import { MainCat } from '../../components/cats-img/main-cat/Main-cat';
import { RootStateType } from '../../reducer/root-reducer';
import { UserState } from '../../reducer/user-reducer';
import authStyles from '../../components/auth/auth.module.css';
import pageStyles from '../auth-page/user-page.module.css';
import { mainPath } from '../../utils/constants';

type MapDispatchToProps = {
  userLogOut: () => actions.UserLogOutActionType;
};

type Props = UserState & MapDispatchToProps & RouteComponentProps;

const Profile: React.FC<Props> = ({ user, userLogOut, history }) => {
  const logOut = () => {
    userLogOut();
    history.push(mainPath.auth);
  };
  return (
    <div className={pageStyles['auth-container']}>
      <h3 className={authStyles['auth-header']}>Профиль</h3>
      <form className={authStyles['auth-form']} action="submit">
        <input
          className={`${authStyles['auth-input']} ${authStyles['login-icon']}`}
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

        <input
          type="button"
          value="Выйти"
          className={authStyles['auth-button']}
          onClick={logOut}
        />
      </form>

      <MainCat />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => state.userState;

export default withRouter(connect(mapStateToProps, actions)(Profile));
