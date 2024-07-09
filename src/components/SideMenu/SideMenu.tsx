import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TwitterIcon from '@material-ui/icons/Twitter';
import NotificationIcon from '@material-ui/icons/NotificationsNone';
import MessageIcon from '@material-ui/icons/MailOutline';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import ListIcon from '@material-ui/icons/ListAlt';
import UserIcon from '@material-ui/icons/PersonOutline';
import PencilIcon from '@material-ui/icons/CreateOutlined';
import HouseIcon from '@material-ui/icons/HouseOutlined';
import styles from './SideMenu.module.css';
import { ModalBlock } from '../ModalBlock';
import { AddTweetForm } from '../AddTweetForm/AddTweetForm';
import { Link } from 'react-router-dom';
import { UserSideProfile } from '../UserSideProfile/UserSideProfile';
import { selectUserData } from '../../store/ducks/user/selectors';
import { useSelector } from 'react-redux';

interface SideMenuProps {}
export const SideMenu: React.FC<SideMenuProps> = (): React.ReactElement => {
  const [visibleAddTweetModal, setVisibleAddTweetModal] =
    React.useState<boolean>(false);
  const handleOpenAddTweetModal = (): void => {
    setVisibleAddTweetModal(true);
  };
  const onCloseAddTweetModal = (): void => {
    setVisibleAddTweetModal(false);
  };
  const userData = useSelector(selectUserData, () => {
    return true;
  });
  return (
    <ul style={{ padding: 0 }} className={styles['sidebar']}>
      <li>
        <Link to="/home">
          <IconButton aria-label="delete" color="primary">
            <TwitterIcon style={{ fontSize: '36px' }} color="primary" />
          </IconButton>
        </Link>
      </li>
      <li>
        <Link to="/home">
          <IconButton className={styles['sidebar__btn']} aria-label="delete">
            <HouseIcon className={styles['sidebar__btn-icon']} />
            <span className={styles['sidebar__btn-text']}>Домой</span>
          </IconButton>{' '}
        </Link>
      </li>
      <li>
        <IconButton className={styles['sidebar__btn']} aria-label="delete">
          <SearchIcon className={styles['sidebar__btn-icon']} />
          <span className={styles['sidebar__btn-text']}>Поиск</span>
        </IconButton>
      </li>
      <li>
        <IconButton className={styles['sidebar__btn']} aria-label="delete">
          <NotificationIcon className={styles['sidebar__btn-icon']} />
          <span className={styles['sidebar__btn-text']}>Уведомление</span>
        </IconButton>
      </li>
      <li>
        <IconButton className={styles['sidebar__btn']} aria-label="delete">
          <MessageIcon className={styles['sidebar__btn-icon']} />
          <span className={styles['sidebar__btn-text']}>Сообщения</span>
        </IconButton>
      </li>
      <li>
        {' '}
        <Link to={`/bookmarks/`}>
          <IconButton
            color="primary"
            className={styles['sidebar__btn']}
            aria-label="delete">
            <BookmarkIcon className={styles['sidebar__btn-icon']} />
            <span className={styles['sidebar__btn-text']}>Закладки</span>
          </IconButton>{' '}
        </Link>
      </li>
      <li>
        <Link to={`/list/`}>
          <IconButton className={styles['sidebar__btn']} aria-label="delete">
            <ListIcon className={styles['sidebar__btn-icon']} />
            <span className={styles['sidebar__btn-text']}>Список</span>
          </IconButton>
        </Link>
      </li>
      <li>
        <Link to={`/user/${userData?._id}`}>
          <IconButton className={styles['sidebar__btn']} aria-label="delete">
            <UserIcon className={styles['sidebar__btn-icon']} />
            <span className={styles['sidebar__btn-text']}>Профиль</span>
          </IconButton>
        </Link>
      </li>
      <li>
        <Button
          onClick={handleOpenAddTweetModal}
          fullWidth
          color="primary"
          variant="contained"
          className={styles['sidebar__btn--blue']}>
          <PencilIcon className={styles['sidebar__btn-icon']} />
          <span className={styles['sidebar__btn-text']}>Твитнуть</span>
        </Button>
        <ModalBlock
          visible={visibleAddTweetModal}
          onClose={onCloseAddTweetModal}>
          <div style={{ width: '450px' }}>
            <AddTweetForm maxRows={15} />
          </div>
        </ModalBlock>
      </li>

      <div className={styles.UserSideProfile}>
        <UserSideProfile />
      </div>
    </ul>
  );
};
