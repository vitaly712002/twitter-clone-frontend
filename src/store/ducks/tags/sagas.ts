import { call, put, takeLatest } from 'redux-saga/effects';
import { setTags, setTagsLoadingState } from './actionCreators';

import { TagsApi } from '../../../services/api/tagsApi';
import { TagsActionsType } from './contracts/actionTypes';
import { LoadingStatus } from '../../types';
export function* fetchTagsRequest(): any {
  try {
    const items = yield call(TagsApi.fetchTags);
    yield put(setTags(items));
  } catch (error) {
    yield put(setTagsLoadingState(LoadingStatus.ERROR));
  }
}

export function* tagsSaga() {
  yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
}
