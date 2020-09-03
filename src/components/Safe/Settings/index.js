import { IconText, Loader, LoadingContainer } from '@components/ICON'
import { makeStyles } from '@material-ui/core/styles'
import cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ManageOwners from './ManageOwners'
import SafeDetails from './SafeDetails'
import ThresholdSettings from './ThresholdSettings'
import { styles } from './style'
import css from './index.module'
import Block from '@components/core/Block'
import Col from '@components/core/Col'
import Hairline from '@components/core/Hairline'
import Paragraph from '@components/core/Paragraph'
import Row from '@components/core/Row'
import { isWalletOwner } from '@src/utils/msw'

const INITIAL_STATE = {
  showRemoveSafe: false,
  menuOptionIndex: 1
}

const useStyles = makeStyles(styles)

const Settings = () => {
  const classes = useStyles()
  const [state, setState] = useState(INITIAL_STATE)
  const walletConnected = useSelector((state) => state.walletConnected)
  const owners = useSelector((state) => state.walletOwners)
  const granted = isWalletOwner(walletConnected, owners)

  const handleChange = (menuOptionIndex) => () => {
    setState((prevState) => ({ ...prevState, menuOptionIndex }))
  }

  const { menuOptionIndex } = state

  if (!owners) {
    return (
      <LoadingContainer>
        <Loader size='md' />
      </LoadingContainer>
    )
  }

  return (
    <div className={css.root}>
      <Block className={classes.root}>
        <Col className={classes.menuWrapper} layout='column'>
          <Block className={classes.menu}>
            <Row className={cn(classes.menuOption, menuOptionIndex === 1 && classes.active)} onClick={handleChange(1)}>
              <IconText
                iconSize='sm'
                textSize='xl'
                iconType='info'
                text='Safe Details'
                color={menuOptionIndex === 1 ? 'primary' : 'secondary'}
              />
            </Row>
            <Hairline className={classes.hairline} />
            <Row
              className={cn(classes.menuOption, menuOptionIndex === 2 && classes.active)}
              onClick={handleChange(2)}
            >
              <IconText
                iconSize='sm'
                textSize='xl'
                iconType='owners'
                text='Owners'
                color={menuOptionIndex === 2 ? 'primary' : 'secondary'}
              />
              <Paragraph className={classes.counter} size='xs'>
                {owners.length}
              </Paragraph>
            </Row>
            <Hairline className={classes.hairline} />
            <Row className={cn(classes.menuOption, menuOptionIndex === 3 && classes.active)} onClick={handleChange(3)}>
              <IconText
                iconSize='sm'
                textSize='xl'
                iconType='requiredConfirmations'
                text='Policies'
                color={menuOptionIndex === 3 ? 'primary' : 'secondary'}
              />
            </Row>
            <Hairline className={classes.hairline} />
          </Block>
        </Col>
        <Col className={classes.contents} layout='column'>
          <Block className={classes.container}>
            {menuOptionIndex === 1 && <SafeDetails />}
            {menuOptionIndex === 2 && <ManageOwners granted={granted} owners={owners} />}
            {menuOptionIndex === 3 && <ThresholdSettings />}
          </Block>
        </Col>
      </Block>
    </div>
  )
}

export default Settings
