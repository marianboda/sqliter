import React from 'react'
import { take } from 'lodash'

const visibleCount = 50

const TableView = ({ records, fields }) => {

  if (records.length == 0)
    return <div>No records</div>
  return (
    <table>
      <thead>
        <tr>
          { fields.map(i => <th key={i}>{i}</th>) }
        </tr>
      </thead>
      <tbody>
          { take(records, visibleCount).map(i => (
            <tr key={i.rowid}>
              { fields.map(v => <td key={v}>{i[v]}</td>) }
            </tr>
          )) }
      </tbody>
    </table>
  )
}

export default TableView
