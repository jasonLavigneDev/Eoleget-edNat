import React, { lazy, Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch, Redirect } from 'react-router-dom';

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
const ProfilePage = lazy(() => import('../pages/profile'));
const CreationPackPage = lazy(() => import('../pages/packCreation'));
const UserPack = lazy(() => import('../pages/userPack'));
const EditPack = lazy(() => import('../pages/editPack'));

// Styles CSS //
const rootDivStyle = {
  display: 'flex',
  position: 'relative',
};
const mainStyle = {
  display: 'flex',
  marginTop: 40,
  flexGrow: 1,
  width: '100%',
};
// End styles //

const MainLayout = () => {
  const [{ user, loadingUser, authenticated }] = useAppContext();
  const verifyEmail = Meteor.settings.public.emailValidation === true;

  return (
    <div style={rootDivStyle}>
      <TopBar />
      <main id="main" style={mainStyle}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            {user ? (
              loadingUser || !authenticated ? (
                <Spinner />
              ) : !verifyEmail || isVerified(user) ? (
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/detailApp/:identification" component={DetailApp} />

                  <Route exact path="/packs" component={Packs} />
                  <Route exact path="/packs/detail/:_id" component={DetailPack} />
                  <Route exact path="/packs/creation" component={CreationPackPage} />
                  <Route exact path="/packs/user" component={UserPack} />
                  <Route exact path="/packs/edit/:_id" component={EditPack} />

                  <Route exact path="/profil" component={ProfilePage} />
                </Switch>
              ) : (
                <Route path="/" component={VerifyNeeded} />
              )
            ) : (
              <Route path="/" component={NotLoggedIn} />
            )}

            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
