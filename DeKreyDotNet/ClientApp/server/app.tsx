import { createReactAppExpress } from '@cra-express/core';
import { StaticRouter } from 'react-router-dom';
const path = require('path');
const React = require('react');

let App = require('../src/App').default;
const clientBuildPath = path.resolve(__dirname, '../client');

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: (req, res) => <StaticRouter location={req.url} context={{}}><App /></StaticRouter>
});

if ((module as any).hot) {
  (module as any).hot.accept('../src/App', () => {
    App = require('../src/App').default;
    console.log('✅ Server hot reloaded App');
  });
}

export default app;
