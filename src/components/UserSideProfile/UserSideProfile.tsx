import { Avatar, makeStyles, Menu, MenuItem } from '@material-ui/core';
import React from 'react';

import ArrowMenu from '@material-ui/icons/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../store/ducks/user/selectors';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/ducks/user/actionCreators';
const useStyles = makeStyles({
  wrapper: { width: '100%', maxWidth: 275, position: 'relative' },
  sideProfile: {
    cursor: 'pointer',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 9999,
    width: '100% ',

    '&:hover': {
      backgroundColor: '#f7f9fa',
    },
  },

  names: {
    paddingLeft: 15,
    '&>span': { display: 'block' },
  },
  arrow: {
    marginLeft: 'auto',
  },
  ProfileMenu: {
    '& div': {
      boxShadow:
        'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px !important ',
    },
    '& ul': {
      '& li': {
        color: '#0f1419',
      },
      maxWidth: '275px',
      width: '275px',
    },
  },
});
export const UserSideProfile = () => {
  const userData = useSelector(selectUserData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleOpenPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopup = (): void => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    window.localStorage.removeItem('token');
    dispatch(signOut());
  };
  if (!userData) {
    return null;
  }
  return (
    <div className={classes.wrapper}>
      <div onClick={handleOpenPopup} className={classes.sideProfile}>
        <Avatar />
        <div className={classes.names}>
          <b>{userData.fullname}</b>
          <span>{userData.username}</span>
        </div>
        <div className={classes.arrow}>
          <ArrowMenu />
        </div>
      </div>

      <div style={{ maxWidth: '100%' }}>
        <Menu
          anchorEl={anchorEl}
          className={classes.ProfileMenu}
          id="simple-menu"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClosePopup}
          autoFocus={false}>
          <Link to={`/user/${userData._id}`}>
            <MenuItem onClick={handleClosePopup}>Мой аккаунт</MenuItem>
          </Link>

          <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
