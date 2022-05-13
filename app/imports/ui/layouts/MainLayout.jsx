import React, { lazy, Suspense } from 'react';
import { Meteor } from 'meteor/meteor';
import { Route, Switch, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { useAppContext } from '../contexts/context';
import TopBar from '../components/menus/TopBar';
import VerifyNeeded from '../components/system/VerifyNeeded';
import NotLoggedIn from '../pages/NotLoggedIn';
import { isVerified } from '../../api/utils/functions';
import Spinner from '../components/system/Spinner';
import AppSettings from '../../api/appsettings/appsettings';
import SiteInMaintenance from '../components/system/SiteInMaintenance';

// pages
const Index = lazy(() => import('../pages/index'));
const Packs = lazy(() => import('../pages/packs'));
const DetailApp = lazy(() => import('../pages/detailApp'));
const DetailPack = lazy(() => import('../pages/detailPack'));
const ProfilePage = lazy(() => import('../pages/profile'));
const CreationPackPage = lazy(() => import('../pages/packCreation'));
const UserPack = lazy(() => import('../pages/userPack'));
const EditPack = lazy(() => import('../pages/editPack'));
const NotFound = lazy(() => import('../pages/notFound'));

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
const maintenanceStyle = {
  marginTop: 40,
  flexGrow: 1,
  width: '100%',
};
// End styles //

const MainLayout = ({ appsettings, ready }) => {
  if (!ready) return <Spinner full />;
  const [{ user, loadingUser, authenticated }] = useAppContext();
  const verifyEmail = Meteor.settings.public.emailValidation === true;

  return (
    <div style={rootDivStyle}>
      <TopBar />
      {!appsettings.maintenance ? (
        <main id="main" style={mainStyle}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              {user ? (
                loadingUser || !authenticated ? (
                  <Spinner />
                ) : !verifyEmail || isVerified(user) ? (
                  <Switch>
                    <Route exact path="/app" component={Index} />
                    <Route exact path="/app/:identification" component={DetailApp} />

                    <Route exact path="/packs" component={Packs} />
                    <Route exact path="/packs/detail/:_id" component={DetailPack} />
                    <Route exact path="/packs/creation" component={CreationPackPage} />
                    <Route exact path="/packs/user" component={UserPack} />
                    <Route exact path="/packs/edit/:_id" component={EditPack} />

                    <Route exact path="/profil" component={ProfilePage} />
                    <Redirect exact from="/" to="/app" />
                    <Route component={NotFound} />
                  </Switch>
                ) : (
                  <Route path="/" component={VerifyNeeded} />
                )
              ) : (
                <Route path="/" component={NotLoggedIn} />
              )}

              <Redirect from="*" to="/app" />
            </Switch>
          </Suspense>
        </main>
      ) : (
        <main id="maintenance" style={maintenanceStyle}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/" component={SiteInMaintenance} />
              <Route component={SiteInMaintenance} />
            </Switch>
          </Suspense>
        </main>
      )}
    </div>
  );
};

export default withTracker(() => {
  const subSettings = Meteor.subscribe('appsettings.all');
  const appsettings = AppSettings.findOne();
  const ready = subSettings.ready();
  return {
    appsettings,
    ready,
  };
})(MainLayout);

MainLayout.defaultProps = {
  appsettings: {},
};

MainLayout.propTypes = {
  appsettings: PropTypes.objectOf(PropTypes.any),
  ready: PropTypes.bool.isRequired,
};
