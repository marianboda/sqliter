import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'

const initialState = {
  tables: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ('UPDATE_TABLES'): return {...initialState, tables: action.payload}
  }
  return state
}

const store = createStore(reducer)

fetch('api/tables').then(r => {
  return r.json()
}).then(body => {
  store.dispatch({type: 'UPDATE_TABLES', payload: body})
})

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('appContainer')
)
