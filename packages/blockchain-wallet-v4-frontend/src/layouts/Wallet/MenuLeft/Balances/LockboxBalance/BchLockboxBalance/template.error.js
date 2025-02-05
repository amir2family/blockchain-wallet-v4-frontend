import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Link } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
`
const ErrorLink = styled(Link)`
  text-decoration: underline;
`

export default props => (
  <Wrapper>
    <ErrorLink size='12px' weight={400} onClick={() => props.onRefresh()}>
      <FormattedMessage
        id='wallet.menutop.bchbalance.refresh'
        defaultMessage='Refresh {curr} data'
        values={{ curr: 'Lockbox Bitcoin Cash' }}
      />
    </ErrorLink>
  </Wrapper>
)
