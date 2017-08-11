import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import DataScreen from './DataScreen'

import './styles/styles.sass'

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    dataset: state.dataset
  }
}

class App extends React.Component {
  render() {
    const tableName = ''
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
                {i.name} [{i.rowCount}]
              </Link>
            </li>
          ))}
          </ul>
        </div>
        <div className="contentContainer">
          <Route path="/table/:tableName/:recordId?" exactly component={DataScreen} />
        </div>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(App)
