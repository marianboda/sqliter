import React from 'react'
import { range } from 'lodash'

const TableView = (props) => {
  const { records, fields, onItemClick } = props

  const getOnClick = (id) => {
    return () => onItemClick(id)
  }

  if (records.length == 0)
    return <div>No records</div>

  const visibleFields = fields.slice(0, 20)

  return (
    <div className="tableView">
      <table>
        <thead>
          <tr>
            { visibleFields.map(i => <th key={i}>{i}</th>) }
          </tr>
        </thead>
        <tbody>
            { records.map(i => (
              <tr key={i.rowid} onClick={getOnClick(i.rowid)}>
                { visibleFields.map(v => <td key={v}>{i[v]}</td>) }
              </tr>
            )) }
        </tbody>
      </table>

    </div>
  )
}

export default TableView
