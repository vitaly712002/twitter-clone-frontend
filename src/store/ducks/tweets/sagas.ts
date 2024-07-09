import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addTweet,
  setAddFormState,
  setTweets,
  setTweetsLoadingState,
} from './actionCreators';

import { TweetsApi } from '../../../services/api/tweetsApi';
import { AddFormState, Tweet } from './contracts/state';
import {
  FetchAddTweetActionType,
  RemoveTweetActionTypeInterface,
  TweetsActionsType,
} from './contracts/actionsType';
import { LoadingStatus } from '../../types';
export function* fetchTweetsRequest() {
  try {
    const pathname = window.location.pathname;
    const userId = pathname.includes('/user')
      ? pathname.split('/').pop()
      : undefined;
    const items: Tweet[] = yield call(TweetsApi.fetchTweets, userId);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingState(LoadingStatus.ERROR));
  }
}
export function* fetchAddTweetRequest({ payload }: FetchAddTweetActionType) {
  try {
    const item: Tweet = yield call(TweetsApi.addTweet, payload);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddFormState(AddFormState.ERROR));
  }
}
export function* fetchRemoveTweetRequest({
  payload,
}: RemoveTweetActionTypeInterface) {
  try {
    yield call(TweetsApi.removeTweet, payload);
  } catch (error) {
    alert('Ошибка при удаление твита');
  }
}
export function* tweetsSaga() {
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);

  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  yield takeLatest(TweetsActionsType.REMOVE_TWEET, fetchRemoveTweetRequest);
}
