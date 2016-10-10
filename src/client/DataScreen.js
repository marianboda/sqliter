import React from 'react'
import { connect } from 'react-redux'
import { range } from 'lodash'
import { Link } from 'react-router'

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
    const oldLoc = this.props.location
    const newLoc = {pathname: oldLoc.pathname + '/' + id, query: {...oldLoc.query}}
    this.context.router.transitionTo(newLoc)
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
    const { query } = this.props.location

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

    const visibleCount = 30
    const offset = (query && typeof query.offset !== 'undefined') ? +query.offset : 0
    const pagesCount = Math.ceil(records.length / visibleCount)

    const visibleRecords = records.slice(offset, offset + visibleCount)

    const getPageLink = (offset) => {
      const oldLoc = this.props.location
      return {pathname: oldLoc.pathname, query: {...oldLoc.query, offset}}
    }

    const content = (loaded)
      ? (
        <div>
          <div className="pagination">
            { range(1, pagesCount + 1).map(i => <Link key={i} to={getPageLink((i-1)*visibleCount)}>{i}</Link>)}
          </div>
          <TableView fields={fields} records={visibleRecords} onItemClick={this.onItemClick.bind(this)}
            location={location}/>
        </div>
      )
      : (
        <div>loading ...</div>
      )

    return (
      <div>
        <h2>{tableName} [{countStr}]</h2>
        {content}
      </div>
    )
  }
}

DataScreen.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(DataScreen)
