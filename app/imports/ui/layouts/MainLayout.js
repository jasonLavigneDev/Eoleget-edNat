import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../contexts/context';
import TopBar from '../components/menus/TopBar';
import VerifyNeeded from '../components/system/VerifyNeeded';
import Index from '../pages';
import NotLoggedIn from '../pages/NotLoggedIn';
import { isVerified } from '../../api/utils/functions';
import Spinner from '../components/system/Spinner';

const useStyles = makeStyles(() => ({
  content: {
    marginTop: 48,
  },
}));

const MainLayout = () => {
  const classes = useStyles();
  const [{ user, loadingUser, authenticated }] = useAppContext();
  const verifyEmail = Meteor.settings.public.emailValidation === true;

  return (
    <main>
      <TopBar />
      <div id="content" className={classes.content}>
        <Switch>
          {user ? (
            loadingUser || !authenticated ? (
              <Spinner full />
            ) : !verifyEmail || isVerified(user) ? (
              <Route path="/" component={Index} />
            ) : (
              <Route path="/" component={VerifyNeeded} />
            )
          ) : (
            <Route path="/" component={NotLoggedIn} />
          )}
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </main>
  );
};

export default MainLayout;
