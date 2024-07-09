import { call, put, takeLatest } from 'redux-saga/effects';
import { setTweetData, setTweetLoadingState } from './actionCreators';

import { TweetsApi } from '../../../services/api/tweetsApi';

import {
  FetchTweetDataActionInterface,
  TweetActionsType,
} from './contracts/actionTypes';
import { Tweet } from '../tweets/contracts/state';
import { LoadingStatus } from '../../types';
export function* fetchTweetDataRequest({
  payload: tweetId,
}: FetchTweetDataActionInterface) {
  try {
    const data: Tweet = yield call(TweetsApi.fetchTweetData, tweetId);
    yield put(setTweetData(data));
  } catch (error) {
    yield put(setTweetLoadingState(LoadingStatus.ERROR));
  }
}

export function* tweetSaga() {
  yield takeLatest(TweetActionsType.FETCH_TWEET_DATA, fetchTweetDataRequest);
}
