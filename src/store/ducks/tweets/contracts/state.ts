import { LoadingStatus } from '../../../types';
import { User } from '../../user/contracts/state';

export enum AddFormState {
  ERROR = 'ERROR',
  NEVER = 'NEVER',
  LOADING = 'LOADING',
}
export interface Tweet {
  _id: string;
  createdAt: string;
  text: string;
  images?: [];
  user: User;
}

export interface TweetsState {
  items: Tweet[];
  LoadingStatus: LoadingStatus;
  addFormState: AddFormState;
}
