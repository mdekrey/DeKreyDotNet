import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

import './custom.css'
import { PaddedContainer } from './components/Container';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' render={() => <PaddedContainer><Home /></PaddedContainer>} />
      </Layout>
    );
  }
}
