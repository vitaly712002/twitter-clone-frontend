import { RootState } from '../../store';
import { LoadingStatus } from '../../types';

import { AddFormState, TweetsState } from './contracts/state';

export const selectTweetsState = (state: RootState): TweetsState =>
  state.tweets;

export const selectTweetsItems = (state: RootState): TweetsState['items'] =>
  selectTweetsState(state).items;

export const selectTweetsLoadingState = (state: RootState): LoadingStatus =>
  selectTweetsState(state).LoadingStatus;

export const selectIsTweetsLoaded = (state: RootState): boolean =>
  selectTweetsLoadingState(state) === LoadingStatus.LOADED;

export const selectIsTweetsLoading = (state: RootState): boolean =>
  selectTweetsLoadingState(state) === LoadingStatus.LOADING;

export const selectAddTweetState = (state: RootState): AddFormState =>
  selectTweetsState(state).addFormState;
