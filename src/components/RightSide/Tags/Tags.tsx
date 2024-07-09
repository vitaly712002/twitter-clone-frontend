import React from 'react';
import { Divider, makeStyles, Paper } from '@material-ui/core';

import theme from '../../../theme';

import {
  selectIsTagsLoaded,
  selectTagsItems,
} from '../../../store/ducks/tags/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
});
interface TagsProps {}
export const Tags: React.FC<TagsProps> = (): React.ReactElement | null => {
  const classes = useStyles();

  const items = useSelector(selectTagsItems);
  const isLoaded = useSelector(selectIsTagsLoaded);
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      <Paper className={classes.rightSideBlock}>
        <Paper className={classes.rightSideBlockHeader}>
          <b>Актуальные темы</b>
        </Paper>
        <Divider />

        {items.map((obj) => (
          <React.Fragment key={obj._id}>
            <div className={classes.rightSideBlockItem}>
              <Link to={`/home/search?q=${obj.name}`}>
                <div>{obj.name}</div>
                <span>Твитов:{obj.count}</span>{' '}
              </Link>
            </div>

            <Divider />
          </React.Fragment>
        ))}
      </Paper>
    </>
  );
};
