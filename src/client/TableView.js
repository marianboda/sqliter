import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  tables: state.tables,
  records: state.records
})

const TableView = (props) => {
  const { tableName } = props.params
  const table = props.tables.filter(i => i.name == tableName)[0]

  if (!table)
    return <div>Table {tableName} doesnt exist</div>

  const fields = table.fields
  const records = props.records ? props.records : []

  return (
    <div>
      <h2>{tableName}</h2>
      <table>
        <thead>
          <tr>
            { fields.map(i => <td key={i}>{i}</td>) }
          </tr>
        </thead>
        <tbody>
            { records.map(i => (
              <tr>
                {
                  fields.map(v => (
                    <td>{i[v]}</td>
                  ))
                }
              </tr>
            )) }

        </tbody>
      </table>
    </div>

  )
}

export default connect(mapStateToProps)(TableView)
