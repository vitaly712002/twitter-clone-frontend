import React from 'react';

import styles from './Layout.module.css';

import { SideMenu } from '../../components/SideMenu/SideMenu';

import { RightSide } from '../../components/RightSide/RightSide';
import Paper from '@material-ui/core/Paper';

export const Layout: React.FC = ({ children }): React.ReactElement => {
  return (
    <section>
      <div className={styles.container}>
        <SideMenu />
        <Paper className={styles['wrapper']} variant="outlined">
          {children}
        </Paper>
        <RightSide />
      </div>
    </section>
  );
};
