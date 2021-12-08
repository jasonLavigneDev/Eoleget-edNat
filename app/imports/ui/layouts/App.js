import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Spinner from '../components/system/Spinner';
import MsgHandler from '../components/system/MsgHandler';
import DynamicStore, { useAppContext } from '../contexts/context';
import lightTheme from '../themes/light';

// dynamic imports
const MainLayout = lazy(() => import('./MainLayout'));

function App() {
  const [{ userId, loggingIn }] = useAppContext();
  const useKeycloak = Meteor.settings.public.enableKeycloak;

  useEffect(() => {
    if (!userId && !loggingIn && useKeycloak) {
      setTimeout(() => Meteor.loginWithKeycloak(), 1000);
    }
  }, [userId, loggingIn]);

  return (
    <>
      <CssBaseline />
      <Suspense fallback={<Spinner full />}>
        <Switch>
          <Route path="/" component={MainLayout} />
        </Switch>
      </Suspense>
      <MsgHandler />
    </>
  );
}

export default () => (
  <MuiThemeProvider theme={lightTheme}>
    <BrowserRouter>
      <DynamicStore>
        <App />
      </DynamicStore>
    </BrowserRouter>
  </MuiThemeProvider>
);
