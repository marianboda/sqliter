import fetch from 'isomorphic-fetch'

const updateRecords = payload => ({ type: 'UPDATE_RECORDS', payload })

export const fetchRecords = (tableName) => {
  return (dispatch) => fetch(`/api/records/${tableName}`)
    .then(r => r.json())
    .then(records => dispatch(updateRecords({tableName, records})))
}
