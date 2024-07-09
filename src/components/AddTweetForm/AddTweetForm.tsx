import React from 'react';
import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import {
  fetchAddTweet,
  setAddFormState,
} from '../../store/ducks/tweets/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddTweetState } from '../../store/ducks/tweets/selectors';
import { AddFormState } from '../../store/ducks/tweets/contracts/state';
import { UploadImages } from '../UploadImages.tsx/UploadImages';
import { uploadImage } from '../../utils/uploadImage';
const useStyles = makeStyles({
  addTweetForm: { margin: '10px 16px' },
  addTweetFormWrapper: {
    display: 'flex',
    marginBottom: 5,
  },
  addTweetFormBody: {
    width: '100%',
  },
  addTweetFormTextarea: {
    width: '100%',
    border: 0,
    fontSize: 20,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'none',
    paddingTop: 16,
    paddingBottom: 16,
  },
  addTweetFormAvatar: {
    marginRight: 15,
  },
  addTweetFormBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgb(235, 238, 240);',
    paddingTop: 10,
  },
  addTweetFormBottomBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '-15px',
  },
  addTweetFormBottomRight: {
    display: 'flex',
    alignItems: 'center',
  },
  addTweetFormCircleProgress: {
    position: 'relative',
    width: '20px',
    height: '20px',
    margin: '0 10px',
    '& .MuiCircularProgress-root': {
      position: 'absolute',
    },
  },
});
interface AddTweetFormProps {
  maxRows?: number;
  onclose?: () => void;
}
const MAX_LENGTH = 280;

export interface ImageObj {
  blobUrl: string;
  file: File;
}
export const AddTweetForm: React.FC<AddTweetFormProps> = ({
  maxRows,
}): React.ReactElement => {
  const classes = useStyles();
  const [text, setText] = React.useState<string>('');
  const [images, setImages] = React.useState<ImageObj[]>([]);

  const textLimitPercent = (text.length / MAX_LENGTH) * 100;
  const textCount = MAX_LENGTH - text.length;
  const handleChangeTextarea = (
    e: React.FormEvent<HTMLTextAreaElement>,
  ): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };
  const addTweetState = useSelector(selectAddTweetState);

  const dispatch = useDispatch();

  const handleClickAddTweet = async (): Promise<void> => {
    let result = [];
    dispatch(setAddFormState(AddFormState.LOADING));
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const { url } = await uploadImage(file);
      result.push(url);
    }
    dispatch(
      fetchAddTweet({
        text,
        images: result,
      }),
    );
    setText('');
    setImages([]);
  };

  return (
    <div className={classes.addTweetForm}>
      <div className={classes.addTweetFormWrapper}>
        <Avatar
          alt="Аватар пользователя"
          className={classes.addTweetFormAvatar}
        />
        <div className={classes.addTweetFormBody}>
          <TextareaAutosize
            onChange={handleChangeTextarea}
            className={classes.addTweetFormTextarea}
            placeholder="Что происходит?"
            value={text}
            rowsMax={maxRows}
          />
          <div className={classes['addTweetFormBottom']}>
            <div className={classes['addTweetFormBottomBtns']}>
              <UploadImages images={images} onChangeImages={setImages} />
            </div>
            <div className={classes.addTweetFormBottomRight}>
              {text && (
                <>
                  <span
                    style={
                      text.length >= MAX_LENGTH ? { color: 'red' } : undefined
                    }>
                    {textCount}
                  </span>
                  <div className={classes.addTweetFormCircleProgress}>
                    <CircularProgress
                      variant="determinate"
                      size={20}
                      thickness={5}
                      value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                      style={
                        text.length >= MAX_LENGTH ? { color: 'red' } : undefined
                      }
                    />
                    <CircularProgress
                      style={{ color: 'rgba(0,0,0,0.1)' }}
                      variant="determinate"
                      size={20}
                      thickness={5}
                      value={100}
                    />
                  </div>
                </>
              )}
              <Button
                disabled={
                  addTweetState === AddFormState.LOADING ||
                  !text ||
                  text.length >= MAX_LENGTH
                }
                color="primary"
                onClick={handleClickAddTweet}
                variant="contained">
                {addTweetState === AddFormState.LOADING ? (
                  <CircularProgress color="inherit" size={16} />
                ) : (
                  'Твитнуть'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {addTweetState === AddFormState.ERROR && (
        <Alert severity="error">
          Ошибка при добавлении твита{' '}
          <span aria-label="emodji-plak" role="img">
            😐
          </span>
        </Alert>
      )}
    </div>
  );
};
