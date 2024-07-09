import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthApi } from '../../services/api/authApi';
import {
  setUserData,
  setUserLoadingStatus,
} from '../../store/ducks/user/actionCreators';
import { LoadingStatus } from '../../store/types';

export const ActivateUser = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
    const hash = window.location.pathname.split('/').pop();
    console.log(hash);
    if (hash) {
      AuthApi.verify(hash)
        .then(({ data }) => {
          window.localStorage.setItem('token', data.token);

          window.location.href = '/home';
        })
        .catch(() => {
          dispatch(setUserLoadingStatus(LoadingStatus.LOADED));
        });
    }
  }, []);

  return <div></div>;
};
