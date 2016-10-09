import React from 'react'
import { connect } from 'react-redux'

import { fetchRecords } from './actions'
import TableView from './components/TableView'
import RecordDetail from './components/RecordDetail'

const mapStateToProps = (state) => ({
  tables: state.tables,
  records: state.records,
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

class DataScreen extends React.Component {

  onItemClick(id) {
    this.context.router.transitionTo(`/table/${this.props.params.tableName}/${id}`)
  }
  componentWillUpdate(newProps) {
    this.props.onUpdate(newProps)
  }
  componentWillMount() {
    this.props.onUpdate(this.props)
  }

  render() {
    const { tableName, recordId } = this.props.params
    const table = this.props.tables.filter(i => i.name == tableName)[0]

    if (!table)
      return <div>Table {tableName} doesnt exist</div>

    const fields = ['rowid', ...table.fields]

    const loaded = typeof this.props.records[tableName] !== 'undefined'
    const records = loaded ? this.props.records[tableName] : []
    const countStr = loaded ? records.length : '-'

    if (typeof recordId !== 'undefined') {
      const record = records.filter(i => i.rowid == recordId)[0]
      return (
        <RecordDetail record={record}/>
      )
    }

    return (
      <div>
        <h2>{tableName} [{countStr}]</h2>
        {
          (loaded)
            ? <TableView fields={fields} records={records} onItemClick={this.onItemClick.bind(this)} />
            : <div>loading ...</div>
        }
      </div>
    )
  }
}

DataScreen.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(DataScreen)
