import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './styles/styles.sass'

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    records: state.records
  }
}

class App extends React.Component {
  render() {
    const { tableName } = this.props.params

    const { tables } = this.props

    return (<div className="topContainer">
      <div className="appHeader">
        <h1>SqLiter</h1>
      </div>
      <div className="appBody">
        <div className="leftPanel" >
          <ul>
          { tables.map(i => (
            <li key={i.name}>
              <Link to={`/table/${i.name}`} style={(i.name == tableName) ? {fontWeight: 'bold'} : {}}>
                {i.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>
        <div className="contentContainer">
          { this.props.children }
        </div>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(App)
