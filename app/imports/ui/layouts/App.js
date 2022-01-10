import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Spinner from '../components/system/Spinner';
import MsgHandler from '../components/system/MsgHandler';
import DynamicStore from '../contexts/context';
import useQuery from '../utils';
import lightTheme from '../themes/light';

// dynamic imports
const LoggingOut = lazy(() => import('../components/system/LoggingOut'));
const MainLayout = lazy(() => import('./MainLayout'));
const VerifyEmail = lazy(() => import('../pages/VerifyEmail'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

function App() {
  const { dologout } = useQuery();
  const history = useHistory();
  if (dologout) {
    // if requested (after redirect from keycloak logout),
    // close local session and redirect without dologout parameter
    Meteor.logout(() => history.replace('/'));
  }

  return (
    <>
      <CssBaseline />
      <Suspense fallback={<Spinner full />}>
        {dologout ? (
          <LoggingOut />
        ) : (
          <Switch>
            <Route path="/verify-email/:token" component={VerifyEmail} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/" component={MainLayout} />
          </Switch>
        )}
      </Suspense>
      <MsgHandler />
    </>
  );
}

export default () => (
  <ThemeProvider theme={lightTheme}>
    <BrowserRouter>
      <DynamicStore>
        <App />
      </DynamicStore>
    </BrowserRouter>
  </ThemeProvider>
);
