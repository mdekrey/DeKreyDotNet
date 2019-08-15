import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { PaddedContainer } from './components/Container';
import { RecentArticles } from './pages/RecentArticles';
import { About } from './pages/About';

import './custom.css'

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' render={() => <PaddedContainer><RecentArticles /></PaddedContainer>} />
        <Route exact path='/about' render={() => <PaddedContainer><About /></PaddedContainer>} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  );
}
