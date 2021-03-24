import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  inputEmailChange,
  createUser,
  inputNameChange,
  inputPasswordChange,
  UserAuthErrType,
  logIn,
  loginPageChange,
  errorMessageClear,
} from '../../actions/user-actions';
import { MainCat } from '../cats-img/main-cat/Main-cat';
import { RootStateType } from '../../reducer/root-reducer';
import { UserState } from '../../reducer/user-reducer';
import styles from './auth.module.css';
import { authErrorPath, mainPath } from '../../utils/constants';

type Props = UserState &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

const Auth: React.FC<Props> = ({
  user,
  inputName,
  inputPassword,
  inputEmail,
  isLogin,
  error,
  authError,
  loginPage,
  createUserFetch,
  userLogin,
  passwordInputChange,
  nameInputChange,
  emailInputChange,
  loginPageChanged,
  errorClear,
  history,
}) => {
  useEffect(() => {
    if (isLogin) {
      history.push(mainPath.ebookPage);
    }
  }, [history, isLogin]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (loginPage) {
      userLogin({ email: inputEmail, password: inputPassword });
    } else {
      createUserFetch({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
      });
    }
  };

  const toSignIn = () => {
    errorClear();
    loginPageChanged(true);
  };

  const toSignUp = () => {
    errorClear();
    loginPageChanged(false);
  };

  const errMsg = (text: string) => (
    <div className={styles['auth-err-msg']}>*{text}</div>
  );

  return (
    <>
      <h3 className={styles['auth-header']}>
        {loginPage ? 'Авторизация' : 'Регистрация'}
      </h3>
      <form
        className={styles['auth-form']}
        action="submit"
        onSubmit={handleSubmit}
      >
        {loginPage ? null : (
          <>
            {error.map((item: UserAuthErrType) =>
              item.path === authErrorPath.name ? errMsg(item.message) : null
            )}
            <input
              className={`${styles['auth-input']} ${styles['login-icon']}`}
              type="text"
              value={inputName}
              onChange={(event) => nameInputChange(event.target.value)}
              required
            />
          </>
        )}
        {error.map((item: UserAuthErrType) =>
          item.path === authErrorPath.email ? errMsg(item.message) : null
        )}
        {authError.path === authErrorPath.email
          ? errMsg(authError.message)
          : null}
        <input
          className={`${styles['auth-input']} ${styles['email-icon']}`}
          type="email"
          value={inputEmail}
          onChange={(event) => emailInputChange(event.target.value)}
          required
        />
        {error.map((item: UserAuthErrType) =>
          item.path === authErrorPath.password ? errMsg(item.message) : null
        )}
        {authError.path === authErrorPath.password
          ? errMsg(authError.message)
          : null}
        <input
          className={`${styles['auth-input']} ${styles['password-icon']}`}
          type="password"
          value={inputPassword}
          onChange={(event) => passwordInputChange(event.target.value)}
          required
        />
        {loginPage ? (
          <>
            <input
              type="submit"
              value="Войти"
              className={styles['auth-button']}
            />
            <Link
              to={mainPath.ebookPage}
              className={`${styles['auth-button']} ${styles['margin-top__0']}`}
            >
              Пропустить
            </Link>
          </>
        ) : (
          <input
            type="submit"
            value="Регистрация"
            className={styles['auth-button']}
          />
        )}
      </form>
      {loginPage ? (
        <div>
          <span className={styles['auth-text']}>нет акаунта?&nbsp;</span>
          <span
            className={styles['auth-text-link']}
            onClick={toSignUp}
            aria-hidden="true"
          >
            Регистрация
          </span>
        </div>
      ) : (
        <div className={styles['login-change']}>
          <span className={styles['auth-text']}>Уже есть акаунт?&nbsp;</span>
          <span
            className={styles['auth-text-link']}
            onClick={toSignIn}
            aria-hidden="true"
          >
            Войти
          </span>
        </div>
      )}
      <MainCat />
    </>
  );
};

const mapStateToProps = (state: RootStateType) => state.userState;

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators<any, any>(
    {
      createUserFetch: createUser,
      userLogin: logIn,
      passwordInputChange: inputPasswordChange,
      nameInputChange: inputNameChange,
      emailInputChange: inputEmailChange,
      loginPageChanged: loginPageChange,
      errorClear: errorMessageClear,
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
