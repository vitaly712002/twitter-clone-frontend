import { LoadingStatus } from '../../types';
import {
  AddTweetActionType,
  FetchAddTweetActionType,
  FetchTweetsActionInterface,
  RemoveTweetActionTypeInterface,
  SetAddFormStateActionInterface,
  SetTweetsActionInterface,
  SetTweetsLoadingStateActionInterface,
  TweetsActionsType,
} from './contracts/actionsType';
import { AddFormState, Tweet, TweetsState } from './contracts/state';

export const setTweets = (
  payload: TweetsState['items'],
): SetTweetsActionInterface => ({
  type: TweetsActionsType.SET_TWEETS,
  payload,
});
export const setTweetsLoadingState = (
  payload: LoadingStatus,
): SetTweetsLoadingStateActionInterface => ({
  type: TweetsActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchAddTweet = (payload: {
  text: string;
  images: string[];
}): FetchAddTweetActionType => ({
  type: TweetsActionsType.FETCH_ADD_TWEET,
  payload,
});
export const addTweet = (payload: Tweet): AddTweetActionType => ({
  type: TweetsActionsType.ADD_TWEET,
  payload,
});
export const removeTweet = (
  payload: string,
): RemoveTweetActionTypeInterface => ({
  type: TweetsActionsType.REMOVE_TWEET,
  payload,
});
export const setAddFormState = (
  payload: AddFormState,
): SetAddFormStateActionInterface => ({
  type: TweetsActionsType.SET_ADD_FORM_STATE,
  payload,
});
export const fetchTweets = (): FetchTweetsActionInterface => ({
  type: TweetsActionsType.FETCH_TWEETS,
});
