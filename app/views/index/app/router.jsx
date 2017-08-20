import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Index from '../containers/Index'

function RouterContainer() {
  return (
    <Router history={createBrowserHistory()}>
      <Route
        exact
        path="/"
        component={Index}
      />
    </Router>)
}

export default RouterContainer
