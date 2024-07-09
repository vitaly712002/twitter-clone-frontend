import React from 'react';
import { Divider, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { Tags } from './Tags/Tags';
import { Users } from './Users/Users';
import { SearchTextField } from '../SearchTextField/SearchTextField';
import { Footer } from '../Footer/Footer';
const useStyles = makeStyles({
  grayLine: {
    height: 12,
    backgroundColor: '#E6ECF0',
  },
  rightSide: {
    position: 'sticky',
    top: '0px',
    maxWidth: '350px',
    width: '100%',
    marginLeft: '15px',
    paddingTop: 5,
    height: '100%',
    minHeight: '100vh',
  },
  RightSidefooter: { transform: 'translateY(70vh)' },

  '@media(max-width: 1000px)': {
    addForm: {
      display: 'none',
    },
    rightSide: {
      display: 'none',
    },
  },
});
interface RightSideProps {}
export const RightSide: React.FC<RightSideProps> =
  (): React.ReactElement | null => {
    const classes = useStyles();
    return (
      <div className={classes.rightSide}>
        <SearchTextField
          variant="outlined"
          placeholder="Поиск по Твиттеру"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <Users />
        <Tags />

        <div className={classes.RightSidefooter}>
          <Divider />
          <Footer />
        </div>
      </div>
    );
  };
