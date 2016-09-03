const initialState = {
  tables: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TABLES': return {...state, tables: action.payload}
    case 'UPDATE_RECORDS': return {...state, records: action.payload.records}
  }
  return state
}

export default reducer
