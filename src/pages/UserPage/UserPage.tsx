import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { BackButtom } from '../../components/BackButtom/BackButtom';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsTweetsLoading,
  selectTweetsItems,
} from '../../store/ducks/tweets/selectors';
import { Tweet } from '../../components/Tweet';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectUserData } from '../../store/ducks/user/selectors';
import { User } from '../../store/ducks/user/contracts/state';
import { AuthApi } from '../../services/api/authApi';
const useStyles = makeStyles({
  UserPageTop: {
    display: 'flex',
    position: 'sticky',
    padding: 15,
    alignItems: 'center',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  UserPageBackground: {
    backgroundColor: 'rgb(196, 207, 214)',
    height: 200,
    width: '100%',
  },
  UserPageTopName: {
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '24px',
    '& span': {
      fontWeight: 400,
      fontSize: 13,
      lineHeight: '16px',
      color: '#5b7083',
    },
  },
  UserPageInfo: {
    padding: 10,
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  UserPageTabs: {
    marginTop: 20,
    '& button': {
      textTransform: 'none',
      minWidth: '25%',
      fontWeight: '800',
      fontSize: 16,
    },
  },
  UserPageAvatar: {
    width: '140px !important',
    height: '140px !important',
    border: '4px solid white',
    marginTop: '-70px',
  },
  UserPageDescription: {
    fontSize: 15,
    fontWeight: 400,
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    '& li': {
      marginRight: 30,
      color: '#5b7083 ',
      '& a': {
        color: '#1da1f2 ',
      },
    },
  },
  aboutMe: {},
});
export const UserPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const tweets = useSelector(selectTweetsItems);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [userData, setUserData] = React.useState<User | undefined>(undefined);
  const isTweetLoading = useSelector(selectIsTweetsLoading);
  React.useEffect(() => {
    const userId = window.location.pathname.split('/').pop();
    dispatch(fetchTweets());
    if (userId) {
      AuthApi.getUserInfo(userId).then(({ data }) => {
        setUserData(data);
      });
    }
  }, [dispatch]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <div>
      <div className={classes.UserPageTop}>
        <BackButtom />
        <div className={classes.UserPageTopName}>
          <h1>{userData?.fullname}</h1>
          <span>{tweets.length} твита</span>
        </div>
      </div>
      <div className={classes.UserPageBackground}></div>
      <div className={classes.UserPageInfo}>
        <Avatar className={classes.UserPageAvatar} />
        <div className={classes.UserPageTopName}>
          {!userData ? (
            <Skeleton width={100} height={30} variant="text" />
          ) : (
            <h1>{userData?.fullname}</h1>
          )}
          {!userData ? (
            <Skeleton width={100} height={30} variant="text" />
          ) : (
            <span>@{userData?.username}</span>
          )}
        </div>
        <p className={classes.aboutMe}>
          aboutMeaboutMeaboutMaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeaboutMeeaboutMeaboutMeaboutMe
        </p>
        <ul className={classes.UserPageDescription}>
          <li>Tula, Russia</li>
          <li>
            <a href="/">Вк</a>
          </li>
        </ul>
        <ul className={classes.UserPageDescription}>
          <li>Дата регистрации</li>
          <li> дата рождения</li>
        </ul>

        <Tabs
          className={classes.UserPageTabs}
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example">
          <Tab label="Твиты" />
          <Tab label="Твиты и ответы" />
          <Tab label="Медиа" />
          <Tab label="Нравится" />
        </Tabs>
      </div>
      {isTweetLoading ? (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <CircularProgress />
        </div>
      ) : (
        tweets.map((tweet) => (
          <Tweet {...tweet} key={tweet._id} images={tweet.images} />
        ))
      )}
    </div>
  );
};
