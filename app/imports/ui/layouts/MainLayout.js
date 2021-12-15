import React, { lazy } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { useAppContext } from '../contexts/context';
import TopBar from '../components/menus/TopBar';
import VerifyNeeded from '../components/system/VerifyNeeded';
import NotLoggedIn from '../pages/NotLoggedIn';
import { isVerified } from '../../api/utils/functions';
import Spinner from '../components/system/Spinner';

// pages
const Index = lazy(() => import('../pages/index'));
const Packs = lazy(() => import('../pages/packs'));
const DetailApp = lazy(() => import('../pages/detailApp'));
const DetailPack = lazy(() => import('../pages/detailPack'));

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  content: {
    marginTop: 48,
  },
}));

const MainLayout = () => {
  const classes = useStyles();
  const [{ user, loadingUser, authenticated }] = useAppContext();
  const verifyEmail = Meteor.settings.public.emailValidation === true;

  return (
    <div className={classes.root}>
      <TopBar />
      <main id="main">
        <div id="content" className={classes.content}>
          <Switch>
            {user ? (
              loadingUser || !authenticated ? (
                <Spinner full />
              ) : !verifyEmail || isVerified(user) ? (
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/packs" component={Packs} />
                  <Route exact path="/detailApp" component={DetailApp} />
                  <Route exact path="/detailPack" component={DetailPack} />
                </Switch>
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
    </div>
  );
};

export default MainLayout;
