import React from 'react'

class RecordDetail extends React.Component {
  render() {
    const { tableName, record } = this.props

    if (!record)
      return <div>--</div>

    const fields = Object.keys(record)
    return (
      <div>
        <table>
          <tbody>
            { fields.map(i => {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{record[i]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RecordDetail
