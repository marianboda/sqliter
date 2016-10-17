import React from 'react'
import { range, get } from 'lodash'

const TableView = (props) => {
  const { records, fields, onItemClick } = props

  const getOnClick = (id) => {
    return () => onItemClick(id)
  }

  if (records.length == 0)
    return <div>No records</div>

  if (typeof records.then === 'function')
    return <div>Loading...</div>

  const visibleFields = fields.slice(0, 10)

  return (
    <div className="tableView">
      <table>
        <thead>
          <tr>
            { visibleFields.map(i => {
                const val = get(i, 'title', i.field)
                return <th key={val}>{val}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
            { records.map(i => (
              <tr key={i[props.pk]} onClick={getOnClick(i[props.pk])}>
                { visibleFields.map(v => {
                    const val = (v.renderer) ? v.renderer(i[v.field]) : i[v.field]
                    return <td key={get(v, 'title', v.field)}>{val}</td>
                  })
                }
              </tr>
            )) }
        </tbody>
      </table>

    </div>
  )
}

export default TableView
