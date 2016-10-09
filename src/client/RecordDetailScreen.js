import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  record: state.record
})

class RecordDetailScreen extends React.Component {
  render() {
    const { tableName, recordId } = this.props.params
    return <div>{tableName} #{recordId}</div>
  }
}

export default connect(mapStateToProps)(RecordDetailScreen)
