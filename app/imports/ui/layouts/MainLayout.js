import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../components/menus/TopBar';

// pages
const Index = lazy(() => import('../pages/index'));

const useStyles = () =>
  makeStyles(() => ({
    root: {
      display: 'flex',
      position: 'relative',
    },
  }));

function MainLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <main id="main">
        <Switch>
          <Route exact path="/" component={Index} />
        </Switch>
      </main>
    </div>
  );
}

export default MainLayout;
