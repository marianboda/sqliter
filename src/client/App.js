import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    tables: state.tables
  }
}

class App extends React.Component {
  render() {
    const { tables } = this.props
    return (<div>
      <h1>SqLiter</h1>
      <div>
        { tables.map(i => (
          [
            <h3 key={i.name}>{i.name}</h3>,
            <ul>
              { i.fields.map(j => <li>{j}</li>)}
            </ul>
          ]
        ))}
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(App)
