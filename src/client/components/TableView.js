import React from 'react'
import { take } from 'lodash'

const visibleCount = 50

const TableView = ({ records, fields, onItemClick }) => {

  const getOnClick = (id) => {
    return () => onItemClick(id)
  }

  if (records.length == 0)
    return <div>No records</div>

  const visibleFields = take(fields, 20)
  return (
    <table>
      <thead>
        <tr>
          { visibleFields.map(i => <th key={i}>{i}</th>) }
        </tr>
      </thead>
      <tbody>
          { take(records, visibleCount).map(i => (
            <tr key={i.rowid} onClick={getOnClick(i.rowid)}>
              { visibleFields.map(v => <td key={v}>{i[v]}</td>) }
            </tr>
          )) }
      </tbody>
    </table>
  )
}

export default TableView
