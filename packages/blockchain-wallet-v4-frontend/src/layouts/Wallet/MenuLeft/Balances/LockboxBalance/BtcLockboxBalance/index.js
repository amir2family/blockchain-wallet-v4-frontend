import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from 'data'

import { LoadingBalance } from '../../model'
import { getData } from './selectors'
import Error from './template.error'
import Success from './template.success'

class BtcLockboxBalance extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleRefresh() {
    this.props.actions.fetchData()
  }

  render() {
    const { data } = this.props

    return data.cata({
      Success: value => <Success balance={value} />,
      Failure: () => <Error onRefresh={this.handleRefresh} />,
      Loading: () => <LoadingBalance coin='BTC' />,
      NotAsked: () => <LoadingBalance coin='BTC' />
    })
  }
}

const mapStateToProps = state => ({
  data: getData(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.core.data.btc, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BtcLockboxBalance)
