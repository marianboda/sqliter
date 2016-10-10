const initialState = {
  tables: [],
  dataset: {
    tableName: null,
    offset: 0,
    count: 10,
    records: null,
  },
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TABLES': return {...state, tables: action.payload}
    case 'UPDATE_DATASET':
      console.log('UPDATING REDUCER', {...action.payload})
      return {...state, dataset: {...action.payload}}
    }
  return state
}

export default reducer
