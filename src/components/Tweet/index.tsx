import React from 'react';
import {
  Avatar,
  IconButton,
  Paper,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepeatIcon from '@material-ui/icons/RepeatOutlined';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { ImageList } from '../ImageList/ImageList';
import { useDispatch } from 'react-redux';
import { removeTweet } from '../../store/ducks/tweets/actionCreators';
import { User } from '../../store/ducks/user/contracts/state';

const useStyles = makeStyles({
  tweet: {
    borderRight: 'none',
    borderLeft: 'none',
    borderBottom: 'none',
    borderRadius: '0',
    padding: '12px 16px 5px',
    display: 'flex',
    alignItems: 'flex-start',
    '&:hover': { background: 'rgb(245, 248, 250)', cursor: 'pointer' },
  },
  tweetWrapper: { textDecoration: 'none', color: 'inherit' },
  tweet__header: { display: 'flex', alignItems: 'top' },

  user__avatar: {
    height: '45px',
    width: '45px',
    marginRight: '10px',
    marginTop: '5px',
  },
  user__name: {
    '& b:hover': {
      textDecoration: 'underline',
    },
    '& span': {
      color: '#5b7083',
      fontWeight: 400,
      lineHeight: '20px',
      fontSize: '15px',
    },
    fontSize: '16px',
    fontWeight: 700,
  },
  tweet__body: { maxWidth: '500px', width: '100%' },
  tweet__text: {
    lineHeight: '20px',
    fontSize: '15px',
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
    wordWrap: 'break-word',
  },
  tweet__btns: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginLeft: '-13px',
    flexWrap: 'wrap',
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
  'tweet__btn-icon': { fontSize: '18px' },
  tweet__top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-10px',
  },
  'tweet__top-btn': {
    transform: 'rotate(-90deg)',
  },
  'tweet__top-btn-menu': {
    '& .MuiList-root': {
      border: '1px solid rgba(0, 0, 0, 0.12);',
    },
  },
  tweetPopupMenu: {},
});
interface TweetProps {
  _id: string;
  text: string;
  createdAt: string;
  images?: string[];
  user: User;
}
export const Tweet: React.FC<TweetProps> = ({
  text,
  user,
  _id,
  createdAt,
  images,
}: TweetProps): React.ReactElement => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClickTweet = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ): void => {
    event.preventDefault();
    history.push(`/home/tweet/${_id}`);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };
  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    handleClose(event);
    dispatch(removeTweet(_id));
  };

  return (
    <Paper className={classes['tweet']} variant="outlined">
      <Avatar className={classes['user__avatar']} alt="Аватар пользователя" />
      <div className={classes.tweet__body}>
        <a
          onClick={handleClickTweet}
          className={classes['tweetWrapper']}
          href={`/home/tweet/${_id}`}>
          <div className={classes['tweet__top']}>
            <div className={classes['user__name']}>
              <b>{user.fullname}</b>{' '}
              <span>
                @{user.username + ' · '}
                {formatDate(new Date(createdAt))}
              </span>
            </div>
            <div className={classes.tweetPopupMenu}>
              <IconButton
                className={classes['tweet__top-btn']}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                className={classes['tweet__top-btn-menu']}
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>Редактировать твит</MenuItem>
                <MenuItem onClick={handleRemove}>Удалить твит</MenuItem>
              </Menu>
            </div>
          </div>
          <p className={classes['tweet__text']}>{text}</p>
          {images && <ImageList images={images} />}
        </a>
        <div className={classes['tweet__btns']}>
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
      </div>
    </Paper>
  );
};
