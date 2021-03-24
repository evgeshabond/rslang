import {
  INPUT_EMAIL_CHANGE,
  INPUT_NAME_CHANGE,
  INPUT_PASSWORD_CHANGE,
  LOGIN_PAGE_CHANGE,
  UserType,
  USER_AUTH_ERROR,
  USER_AUTH_OK,
  USER_CREATED,
  USER_CREATE_ERROR,
  USER_CREATE_LOAD,
} from '../actions/user-actions';

export type UserState = typeof initialState;

const initialState = {
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
  },
  inputName: '',
  inputEmail: '',
  inputPassword: '',
  isLogin: false,
  error: [],
  authError: {},
  loginPage: true,
  isLoaded: false,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: UserType }
) => {
  switch (action.type) {
    case USER_CREATED:
      return {
        ...state,
        error: [],
        loginPage: true,
      };
    case INPUT_NAME_CHANGE:
      return { ...state, inputName: action.payload };
    case INPUT_EMAIL_CHANGE:
      return { ...state, inputEmail: action.payload };
    case INPUT_PASSWORD_CHANGE:
      return { ...state, inputPassword: action.payload };
    case USER_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case USER_AUTH_OK:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        authError: {},
      };
    case USER_AUTH_ERROR:
      return { ...state, authError: action.payload };
    case LOGIN_PAGE_CHANGE:
      return { ...state, loginPage: action.payload };
    case USER_CREATE_LOAD:
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
};

export { userReducer };
