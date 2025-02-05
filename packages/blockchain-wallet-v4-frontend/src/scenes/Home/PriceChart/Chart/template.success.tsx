import React from 'react'
import ReactHighcharts from 'react-highcharts'
import styled from 'styled-components'

import { calculateStart } from 'blockchain-wallet-v4/src/redux/data/misc/model'
import {
  CoinType,
  FiatType,
  PriceChangeTimeRangeType
} from 'blockchain-wallet-v4/src/types'
import { calculateInterval } from 'services/charts'

import { getConfig, renderMinMax } from './services'

const Wrapper = styled.div<{ coin: CoinType }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  svg {
    .highcharts-background {
      fill: ${props => props.theme.white} !important;
    }
  }
  .highcharts-tooltip span {
    padding: 0px 2px 2px 2px;
    > span:first-child {
      font-weight: 400;
    }
  }
  .highcharts-container,
  .highcharts-root {
    overflow: visible !important;
  }
  .min-max {
    opacity: 1;
    padding: 4px 6px;
    border-radius: 4px;
    color: ${props => props.theme.white};
    background: ${props => props.theme[props.coin.toLowerCase()]};
    transition: opacity 0.3s;
  }
  &:hover {
    .min-max {
      opacity: 0;
      transition: opacity 0.3s 0.3s;
    }
  }
`

const Chart = (props: OwnProps) => {
  const { coin, currency, data, time } = props
  const decimals = coin === 'XLM' ? 4 : 2
  const start = calculateStart(coin, time)
  const interval = calculateInterval(coin, time)
  let config = getConfig(coin, currency, data, decimals, interval, start)

  const handleCallback = chart =>
    renderMinMax(chart, { currency, data, decimals })

  return (
    <Wrapper coin={coin}>
      <ReactHighcharts config={config} callback={handleCallback} isPureConfig />
    </Wrapper>
  )
}

type OwnProps = {
  coin: CoinType
  currency: FiatType
  data: any
  time: PriceChangeTimeRangeType
}

export default Chart
