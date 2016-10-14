import fetch from 'isomorphic-fetch'


const updateDataset = payload => ({ type: 'UPDATE_DATASET', payload })

export const fetchRecords = (dataset) => {
  console.log(`fetching records for ${dataset.tableName}`)
  const { tableName, offset } = dataset
  const count = 30

  return (dispatch) => {
    const url = `/api/records/${tableName}?offset=${offset}&count=${30}`
    const promise = fetch(url)
      .then(r => r.json())
      .then(records => dispatch(updateDataset({tableName, offset, count, records})))
    dispatch(updateDataset({tableName, offset, count, records: promise}))
    return promise
  }
}
