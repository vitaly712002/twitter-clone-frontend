import React from 'react';
import { Avatar, makeStyles, Button, Divider, Paper } from '@material-ui/core';

import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

import theme from '../../../theme';
import { useSelector } from 'react-redux';
import { selectUsersItems } from '../../../store/ducks/users/selectors';
const useStyles = makeStyles({
  rightSideBlock: {
    backgroundColor: '#F5F8FA',
    borderRadius: 15,
    marginTop: 20,
    padding: '13px 18px',
  },
  rightSideBlockHeader: {
    backgroundColor: 'transparent',
    borderTop: 0,
    borderBottom: 0,
    borderRight: 0,
    paddingBottom: 15,
    '& b': {
      fontSize: 20,
      fontWeight: 800,
    },
  },
  rightSideBlockItem: {
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: '20px',
    color: '#0f1419',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    '& a': { textDecoration: 'none', color: 'inherit' },
    '&:hover': {
      backgroundColor: '#EDF3F6',
    },
    '& span': {
      fontWeight: 400,
      lineHeight: '16px',
      color: '#5b7083',
      fontSize: 13,
    },
  },
  rightSideBlockItemAvatar: {
    minWidth: 50,
  },
  rightSideBlockUser: {
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
  },
  rightSideBlockUserAvatar: {
    marginRight: 10,
  },
  rightSideBlockBtnFollow: {
    '& span': {
      color: theme.palette.primary.main,
      fontWeight: 700,
      marginLeft: 5,
    },
    marginLeft: 'auto',
  },
  '@media(max-width: 1000px)': {
    rightSide: {
      display: 'none',
    },
  },
});
export const Users = () => {
  const classes = useStyles();
  const items = useSelector(selectUsersItems);
  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader}>
        <b>Кого читать</b>
      </Paper>
      <Divider />

      {items.map((obj, key) => {
        return (
          <div className={classes.rightSideBlockItem}>
            <div className={classes.rightSideBlockUser}>
              <Avatar
                className={classes.rightSideBlockUserAvatar}
                src="https://images.unsplash.com/photo-1568990545613-aa37e9353eb6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              />

              <div className="rightSideBlockUserName">
                <div>Alex</div>
                <span>@noName</span>
              </div>
              <Button
                className={classes.rightSideBlockBtnFollow}
                variant="outlined"
                color="primary">
                <PersonAddIcon />
                <span>Подписаться</span>
              </Button>
            </div>
          </div>
        );
      })}
      <Divider />
    </Paper>
  );
};
