import React from 'react'
import { connect } from 'react-redux'
import { range, get, isEqual } from 'lodash'
import { Link } from 'react-router-dom'

import { fetchRecords } from './actions'
import TableView from './components/TableView'
import RecordDetail from './components/RecordDetail'

const mapStateToProps = (state) => ({
  tables: state.tables,
  dataset: state.dataset,
})

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (newProps) => {
    const { tableName } = newProps.match.params
    const offset = get(newProps.location.query, 'offset', 0)
    const oldDataset = newProps.dataset
    const newDataset = { tableName, offset }

    const datasetChanged =
      oldDataset.tableName != newDataset.tableName
      || oldDataset.offset != newDataset.offset

    // console.log('update', tableName, newDataset.tableName, {...newProps})
    if (!oldDataset.records || datasetChanged) {
      console.log(`will fetch ${tableName}, offset: ${offset}`)
      dispatch(fetchRecords({tableName, offset}))
    }
  }
})

class DataScreen extends React.Component {
  onItemClick(id) {
    const oldLoc = this.props.location
    const newLoc = {pathname: oldLoc.pathname + '/' + id, query: {...oldLoc.query}}
    this.props.history.push(newLoc)
  }
  componentWillUpdate(newProps) {
    this.props.onUpdate(newProps)
  }
  componentWillMount() {
    this.props.onUpdate(this.props)
  }

  render() {
    const dataset = this.props.dataset
    const { tableName, count, offset } = dataset
    const table = this.props.tables.filter(i => i.name == tableName)[0]
    if (!table)
      return <div>Table {tableName} doesnt exist</div>

    const pk = (table.pk.length > 0) ? table.pk[0] : 'rowid'
    const records = get(dataset, 'records', [])
    const { recordId } = this.props.match.params
    if (typeof recordId !== 'undefined') {
      const record = records.filter(i => i[pk] == recordId)[0]
      return <RecordDetail record={record}/>
    }

    const fields = [
      {
        field: 'rowid',
        renderer: (v) => <div style={{color: '#AAA', textAlign: 'right', width: '100%'}}>{v}</div>
      },
      {
        field: 'link',
        title: 'clickable',
        renderer: (v) => <a href={v} target="_blank" onClick={e => e.stopPropagation()}>[ LINK ]</a>
      },
      ...table.fields.map(v => ({field: v}))]

    const totalCount = table.rowCount
    const pagesCount = Math.ceil(totalCount / count)

    const getPageLink = (offset) => {
      const oldLoc = this.props.location
      return {pathname: oldLoc.pathname, query: {...oldLoc.query, offset}}
    }

    return (
      <div>
        <h2>{tableName} [{totalCount}]</h2>
        <div>
          <div className="pagination">
            { range(1, pagesCount + 1).map(i => <Link key={i} to={getPageLink((i-1)*count)}>{i}</Link>)}
          </div>
          <TableView fields={fields} records={records} pk={pk} onItemClick={this.onItemClick.bind(this)}
            location={location}/>
        </div>
      </div>
    )
  }
}

DataScreen.contextTypes = {
  router: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(DataScreen)
