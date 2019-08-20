import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { PaddedContainer } from './components/Container';
import { RecentArticles } from './pages/RecentArticles';
import { About } from './pages/About';

import './custom.css'

export function App() {
  return (
    <Layout>
      <Switch>
        {renderArticleLinks()}
        <Route exact path='/' render={() => <PaddedContainer><RecentArticles /></PaddedContainer>} />
        <Route exact path='/about' render={() => <PaddedContainer><About /></PaddedContainer>} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  );
}

function renderArticleLinks() {
  return null;
}
