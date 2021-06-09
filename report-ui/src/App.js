import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ReportTable from './components/report-table';
import AccessibilityAudit from './components/accessibility-audit';

import './App.css';

// TODO: improve/remove this
// eslint-disable-next-line no-useless-escape
const basePath = (window.location.href.match(/.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/) || ['/'])[1];

function App() {
  return (
    <Router basename={basePath}>      
      <Route path="/" exact component={ReportTable} />
      <Route path="/accessibility/audit/:name" component={AccessibilityAudit} />
    </Router>
  );
}

export default App;
