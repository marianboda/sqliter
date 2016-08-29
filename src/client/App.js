import React from 'react'
import ReactDOM from 'react-dom'

fetch('api/tables').then(i => console.log(i))

class App extends React.Component {
  render() { return <h1>Hello App</h1>}
}

export default App
