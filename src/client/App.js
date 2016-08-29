import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const mapStateToProps = (state) => {
  return {
    tables: state.tables
  }
}

const topContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const appContainerStyle = {
  display: 'flex',
}

const leftPanelStyle = {
  width: 200,
  flex: '0 1 200px'
}

const rightPanelStyle = {
  width: 200,
  flex: '1 1 200px'
}

class App extends React.Component {
  render() {
    const { tables } = this.props
    return (<div style={topContainerStyle}>
      <h1>SqLiter</h1>
      <div style={appContainerStyle}>
        <div style={leftPanelStyle}>
          { tables.map(i => (
            [
              <h3 key={i.name}><Link to={`/table/${i.name}`}>{i.name}</Link></h3>,
              <ul>
                { i.fields.map(j => <li key={j}>{j}</li>)}
              </ul>
            ]
          ))}
        </div>
        <div style={rightPanelStyle}>
          { this.props.children }
        </div>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps)(App)
