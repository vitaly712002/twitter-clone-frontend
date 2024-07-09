import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import mediumZoom from 'medium-zoom';
import {
  Avatar,
  IconButton,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepeatIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import classnames from 'classnames';

import {
  fetchTweetData,
  setTweetData,
} from '../../../store/ducks/tweet/actionCreators';
import {
  selectIsTweetLoading,
  selectTweetData,
} from '../../../store/ducks/tweet/selectors';
import { ImageList } from '../../../components/ImageList/ImageList';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  fullTweet: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 12,
  },
  s: {},
  fullTweetHeader: { display: 'flex' },
  fullTweetHeaderName: {},
  userName: {
    marginLeft: 10,
    fontWeight: 700,
    color:'#0f1419',
    '& span': {
      color: '#5b7083',
      fontWeight: 400,
      lineHeight: '20px',
      fontSize: '15px',
    },
  },
  fullTweetBody: { maxWidth: '600px', width: '100%' },
  fullTweetText: {
    lineHeight: '28px',
    fontSize: '23px',
    wordWrap: 'break-word',
    width: '100%',
    paddingBottom: 5,

    margin: '16px 0 0',
  },
  fullTweetBtns: {
    padding: '5px 0',
    display: 'flex',
    marginTop: 5,
    justifyContent: 'space-between',
    borderTop: '1px solid rgb(235, 238, 240)',
  },
  tweet__btn: {
    fontSize: '13px',
    '& MuiIconButton-root': { marginRight: '5px', padding: '7px' },
  },

  'tweet__btn--blue': {
    '&:hover': {
      '& button': { backgroundColor: 'rgba(29, 161, 242, 0.2)' },
      '& span': { color: 'rgba(29, 161, 242, 1)' },
    },
  },
  'tweet__btn--green': {
    '&:hover': {
      '& button': { backgroundColor: 'rgba(23, 191, 99, 0.2)' },
      '& span': { color: 'rgba(23, 191, 99, 1)' },
    },
  },
  'tweet__btn--red': {
    '&:hover': {
      '& button': {
        backgroundColor: 'rgba(224, 36, 94, 0.2)',
      },
      '& span': { color: 'rgba(224, 36, 94, 1)' },
    },
  },
  'tweet__btn-icon': {},
  tweet__date: {
    color: '#5b7083',
    fontSize: '15px',
    borderBottom: '1px solid rgb(235, 238, 240)',
    paddingBottom: 16,
    fontWeight: 400,
  },
});
export const FullTweet: React.FC = (): React.ReactElement | null => {
  const params: { id: string } = useParams();
  const id = params.id;
  const tweetData = useSelector(selectTweetData);
  const isLoading = useSelector(selectIsTweetLoading);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    if (id) {
      dispatch(fetchTweetData(id));
    }

    return () => {
      dispatch(setTweetData(undefined));
    };
  }, [dispatch, id]);
  useEffect(() => {
    if (!isLoading) {
      mediumZoom('.tweetImages img');
    }
  }, [isLoading]);
  if (isLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: '30px',
          marginBottom: '30px',
        }}>
        <CircularProgress />
      </div>
    );
  }

  if (tweetData) {
    return (
      <div className={classes['fullTweet']}>
        <div className={classes['fullTweetHeader']}>
          <Avatar className={classes['s']} alt="Аватар пользователя" />
          <Link to={`/user/${tweetData.user._id}`}>
            <div className={classes['userName']}>
              <div>{tweetData.user.fullname}</div>
              <span>@{tweetData.user.username}</span>
            </div>
          </Link>
        </div>
        <div className={classes.fullTweetBody}>
          <p className={classes['fullTweetText']}>{tweetData.text} </p>
          <div className="tweetImages">
            {tweetData.images && <ImageList images={tweetData.images} />}{' '}
          </div>
          <div className={classes['fullTweetBtns']}>
            <div className={classes['tweet__btn' && 'tweet__btn--blue']}>
              <IconButton>
                <CommentIcon className={classes['tweet__btn-icon']} />
              </IconButton>
              <span>1</span>
            </div>
            <div
              className={classnames([
                classes['tweet__btn'],
                classes['tweet__btn--green'],
              ])}>
              <IconButton>
                <RepeatIcon className={classes['tweet__btn-icon']} />
              </IconButton>
            </div>
            <div className={classes['tweet__btn' && 'tweet__btn--red']}>
              <IconButton>
                <LikeIcon className={classes['tweet__btn-icon']} />
              </IconButton>
            </div>
            <div className={classes['tweet__btn' && 'tweet__btn--blue']}>
              <IconButton>
                <ShareIcon className={classes['tweet__btn-icon']} />
              </IconButton>
            </div>
          </div>
          <div className={classes['tweet__date']}>
            <span>
              {format(new Date(tweetData.createdAt), 'H:mm', {
                locale: ruLang,
              })}{' '}
              ·{' '}
            </span>
            <span>
              {format(new Date(tweetData.createdAt), 'dd MMM,yyyy г.', {
                locale: ruLang,
              })}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
