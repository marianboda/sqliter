import React from 'react'

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
          { records.map(i => (
            <tr>
              { fields.map(v => <td>{i[v]}</td>) }
            </tr>
          )) }
      </tbody>
    </table>
  )
}

export default TableView
