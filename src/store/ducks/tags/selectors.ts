import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { LoadingStatus } from '../../types';
import { TagsState } from './contracts/state';

export const selectTags = (state: RootState): TagsState => state.tags;
export const selectTagsItems = createSelector(selectTags, (tags) => tags.items);

export const selectTagsLoadingState = (state: RootState): LoadingStatus =>
  selectTags(state).LoadingStatus;
export const selectIsTagsLoaded = (state: RootState): boolean =>
  selectTagsLoadingState(state) === LoadingStatus.LOADED;
export const selectIsTagsLoading = (state: RootState): boolean =>
  selectTagsLoadingState(state) === LoadingStatus.LOADING;
