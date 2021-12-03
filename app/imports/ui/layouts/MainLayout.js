import React from 'react';
import { Route, Switch } from 'react-router';
import TopBar from '../components/menus/TopBar';

const MainLayout = () => {

  return (
    <main>
        <TopBar />

        <Switch>
          <Route path="/" component={() => 'Hello World!!'} />
        </Switch>
    </main>
) 
}

export default MainLayout;