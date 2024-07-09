import { LoadingStatus } from '../../../types';

export interface User {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmed?: boolean;
  confirmHash: string;
  about?: string;
  website?: string;
  location?: string;
}
export interface UserState {
  data: User | undefined;
  status: LoadingStatus;
}
