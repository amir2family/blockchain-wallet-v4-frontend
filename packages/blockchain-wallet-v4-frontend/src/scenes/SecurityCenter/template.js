import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Text, Icon, Button } from 'blockchain-info-components'

import SecuritySteps from './SecuritySteps'
import SecurityTabs from './SecurityTabs'
import EmailAddress from './EmailAddress'
import TwoStepVerification from './TwoStepVerification'
import WalletRecoveryPhrase from './WalletRecoveryPhrase'
import { spacing } from 'services/StyleService'

import Advanced from './Advanced'

const Wrapper = styled.div`
  padding: 30px;
  padding: ${props => props.tabs ? `0px 30px 30px 30px` : `30px`}

  box-sizing: border-box;
`
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  width: ${props => props.progress === 3 ? '100%' : '40%'};
`
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & > * {
    margin-top: 20px;
  }
`
const Title = styled(Text)`
`
const IntroText = styled(Text)`
  padding: 20px 0px
`
const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`
const PageContainer = styled.div`
  width: 100%;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SecurityCenter = (props) => {
  const { enabling, setView } = props
  const tabs = props.progress === 3

  const renderSteps = () => {
    if (enabling === 'email') return <BodyContainer><EmailAddress alone={1} goBackOnSuccess={props.onClose} /></BodyContainer>
    if (enabling === '2fa') return <BodyContainer><TwoStepVerification alone={1} goBackOnSuccess={props.onClose} /></BodyContainer>
    if (enabling === 'recovery') return <BodyContainer><WalletRecoveryPhrase alone={1} goBackOnSuccess={props.onClose} /></BodyContainer>
    return (
      <BodyContainer>
        <EmailAddress handleEnable={() => props.handleEnable('email')} alone={0} goBackOnSuccess={props.onClose} />
        <TwoStepVerification handleEnable={() => props.handleEnable('2fa')} alone={0} goBackOnSuccess={props.onClose} />
        <WalletRecoveryPhrase handleEnable={() => props.handleEnable('recovery')} alone={0} goBackOnSuccess={props.onClose} />
        {
          !tabs && <ButtonContainer>
            <Button nature='empty' width='25%' onClick={() => props.setView('advanced')}>
              <Text size='14px' weight={400}>
                <FormattedMessage id='scenes.securitycenter.introadvancedbutton' defaultMessage='Advanced Settings' />
              </Text>
            </Button>
            <Text size='14px' weight={300} style={spacing('pl-15')}>
              <FormattedMessage id='scenes.securitycenter.introadvancedexplainer' defaultMessage='We recommend you complete these 3 steps before moving into the Advanced Security Settings.' />
            </Text>
          </ButtonContainer>
        }
      </BodyContainer>
    )
  }

  return (
    <PageContainer>
      {tabs && <SecurityTabs data={props.data} setView={setView} /> }
      {
        props.viewing === 'security'
          ? <Wrapper>
            {
              enabling && <IconContainer>
                <Icon name='close' size='20px' weight={300} color='gray-5' cursor onClick={props.onClose} />
              </IconContainer>
            }
            <TopContainer>
              <IntroContainer progress={props.progress}>
                <Title size='24px' weight={300} color='black'><FormattedMessage id='scenes.securitycenter.title' defaultMessage='Security Center' /></Title>
                <IntroText size='14px' weight={300}>
                  {props.progress < 1 && <FormattedMessage id='scenes.securitycenter.introtextnone' defaultMessage='Welcome to your Security Center! Complete the following three steps to help prevent unauthorized access to your wallet and ensure you can access your funds at any time.' />}
                  {props.progress === 1 && <FormattedMessage id='scenes.securitycenter.introtextone' defaultMessage='Welcome to your Security Center! You have completed 1 of 3 steps to help prevent unauthorized access to your wallet and ensure that you can access your funds at any time.' />}
                  {props.progress === 2 && <FormattedMessage id='scenes.securitycenter.introtexttwo' defaultMessage='Welcome to your Security Center! You have completed 2 of 3 steps to help prevent unauthorized access to your wallet and ensure that you can access your funds at any time.' />}
                  {props.progress === 3 && <FormattedMessage id='scenes.securitycenter.introtextthree' defaultMessage='Congratulations, you have completed the initial steps in helping to prevent unauthorized access to your wallet and bringing you even closer to financial security. Remember to always use caution with where you store your wallet details, what information you share with others, and with phishing emails.' />}
                </IntroText>
              </IntroContainer>
              {props.progress < 3 && <SecuritySteps data={props.data} />}
            </TopContainer>
            {renderSteps()}
          </Wrapper>
          : <Wrapper>
            <BodyContainer>
              <Advanced tabs={tabs} setView={setView}/>
            </BodyContainer>
          </Wrapper>
      }
    </PageContainer>
  )
}

export default SecurityCenter
