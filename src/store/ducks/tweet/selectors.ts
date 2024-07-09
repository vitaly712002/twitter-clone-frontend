import { RootState } from '../../store';
import { LoadingStatus } from '../../types';
import { Tweet } from '../tweets/contracts/state';
import { TweetState } from './contracts/state';

export const selectTweet = (state: RootState): TweetState => state.tweet;

export const selectTweetData = (state: RootState): Tweet | undefined =>
  selectTweet(state).data;

export const selectTweetLoadingState = (state: RootState): LoadingStatus =>
  selectTweet(state).LoadingStatus;

export const selectIsTweetLoaded = (state: RootState): boolean =>
  selectTweetLoadingState(state) === LoadingStatus.LOADED;

export const selectIsTweetLoading = (state: RootState): boolean =>
  selectTweetLoadingState(state) === LoadingStatus.LOADING;
