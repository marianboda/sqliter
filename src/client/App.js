import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link, Match } from 'react-router'

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
                {i.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>
        <div className="contentContainer">
          <Match pattern="/table/:tableName/:recordId?" exactly component={DataScreen} />
        </div>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(App)
