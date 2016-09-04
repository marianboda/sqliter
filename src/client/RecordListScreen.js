import React from 'react'
import { connect } from 'react-redux'

import { fetchRecords } from './actions'

import TableView from './components/TableView'

const mapStateToProps = (state) => ({
  tables: state.tables,
  records: state.records
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (newProps) => {
    const { tableName } = newProps.params
    if (tableName) {
      const records = newProps.records[tableName]
      if (!records) {
        console.log(`will fetch ${tableName}`)
        dispatch(fetchRecords(tableName))
      }
    }
  }
})

class RecordListScreen extends React.Component {
  componentWillUpdate(newProps) {
    this.props.onUpdate(newProps)
  }
  render() {
    const { tableName } = this.props.params
    const table = this.props.tables.filter(i => i.name == tableName)[0]

    if (!table)
      return <div>Table {tableName} doesnt exist</div>

    const fields = ['rowid', ...table.fields]
    const records = this.props.records[tableName] ? this.props.records[tableName] : []
    const loaded = typeof this.props.records[tableName] !== 'undefined'

    return (
      <div>
        <h2>{tableName}</h2>
        {
          (loaded)
            ? <TableView fields={fields} records={records} />
            : <div>loading ...</div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordListScreen)
