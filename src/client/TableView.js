import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  tables: state.tables
})

const TableView = (props) => {
  const { tableName } = props.params
  const table = props.tables.filter(i => i.name == tableName)[0]
  if (!table)
    return <div>Table {tableName} doesnt exist</div>
  return (
    <div>
      <h2>{tableName}</h2>
      <table>
        <thead>
          <tr>
            { table.fields.map(i => <td key={i}>{i}</td>) }
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>

  )
}

export default connect(mapStateToProps)(TableView)
