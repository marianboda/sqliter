import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Match, Link } from 'react-router'

import App from './App'
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
    <BrowserRouter>
      <Match pattern="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('appContainer')
)
