import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './App'
import RecordListScreen from './RecordListScreen'
import reducer from './reducers'

import { fetchRecords } from './actions'

const store = createStore(reducer, applyMiddleware(thunk))

fetch('/api/tables').then(r => {
  return r.json()
}).then(body => {
  store.dispatch({type: 'UPDATE_TABLES', payload: body})
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="/table/:tableName" component={RecordListScreen} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('appContainer')
)
