import { LoginFormProps } from '../../../pages/SignIn/components/LoginModal';
import { RegisterFormProps } from '../../../pages/SignIn/components/RegisterModal';
import {
  FetchSignInActionInterface,
  FetchSignUpActionInterface,
  FetchUserDataActionInterface,
  SetUserDataActionInterface,
  SetUserLoadingStateActionInterface,
  SignOutActionInterface,
  UserActionsType,
} from './contracts/actionsType';
import { UserState } from './contracts/state';

export const setUserData = (
  payload: UserState['data'],
): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});
export const fetchSignIn = (
  payload: LoginFormProps,
): FetchSignInActionInterface => ({
  type: UserActionsType.FETCH_SIGN_IN,
  payload,
});
export const signOut = (): SignOutActionInterface => ({
  type: UserActionsType.SIGN_OUT,
});
export const fetchSignUp = (
  payload: RegisterFormProps,
): FetchSignUpActionInterface => ({
  type: UserActionsType.FETCH_SIGN_UP,
  payload,
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
});
export const setUserLoadingStatus = (
  payload: UserState['status'],
): SetUserLoadingStateActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});
