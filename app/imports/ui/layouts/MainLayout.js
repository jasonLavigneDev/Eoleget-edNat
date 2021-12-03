import React from 'react';
import { Route, Switch } from 'react-router';
import TopBar from '../components/menus/TopBar';
import Index from '../pages';

const MainLayout = () => {
  return (
    <main>
      <TopBar />

      <Switch>
        <Route path="/" component={Index} />
      </Switch>
    </main>
  );
};

export default MainLayout;
