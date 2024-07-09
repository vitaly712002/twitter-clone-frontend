import { TweetsActions, TweetsActionsType } from './contracts/actionsType';
import { TweetsState, AddFormState } from './contracts/state';
import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';

const initialTweetsState: TweetsState = {
  items: [],
  LoadingStatus: LoadingStatus.NEVER,
  addFormState: AddFormState.NEVER,
};

export const tweetsReducer = produce(
  (draft: Draft<TweetsState>, action: TweetsActions) => {
    switch (action.type) {
      case TweetsActionsType.SET_TWEETS:
        draft.items = action.payload;
        draft.LoadingStatus = LoadingStatus.LOADED;
        break;
      case TweetsActionsType.FETCH_TWEETS:
        draft.items = [];
        draft.LoadingStatus = LoadingStatus.LOADING;
        break;
      case TweetsActionsType.SET_LOADING_STATE:
        draft.LoadingStatus = action.payload;
        break;
      case TweetsActionsType.SET_ADD_FORM_STATE:
        draft.addFormState = action.payload;
        break;
      case TweetsActionsType.FETCH_ADD_TWEET:
        draft.addFormState = AddFormState.LOADING;
        break;
      case TweetsActionsType.REMOVE_TWEET:
        draft.items = draft.items.filter((obj) => obj._id !== action.payload);
        break;
      case TweetsActionsType.ADD_TWEET:
        draft.items.splice(0, 0, action.payload);
        draft.addFormState = AddFormState.NEVER;
        break;
    }
  },
  initialTweetsState,
);
