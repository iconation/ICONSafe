import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Close from '@material-ui/icons/Close'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { styles } from './style'

import CopyBtn from '@src/components/CopyBtn'
import IconTrackerBtn from '@src/components/core/IconTrackerBtn'
import Identicon from '@src/components/core/Identicon'
import Block from '@src/components/core/Block'
import Button from '@src/components/core/Button'
import Col from '@src/components/core/Col'
import Hairline from '@src/components/core/Hairline'
import Paragraph from '@src/components/core/Paragraph'
import Row from '@src/components/core/Row'
import { SENTINEL_ADDRESS, getGnosisSafeInstanceAt } from 'src/logic/contracts/safeContracts'
import { estimateTxGasCosts } from 'src/logic/safe/transactions/gasNew'
import { formatAmount } from 'src/logic/tokens/utils/formatAmount'
import { getWeb3 } from 'src/logic/wallets/getWeb3'
import { (state) => state.safeName, (state) => state.walletOwners, (state) => state.safeAddress } from 'src/logic/safe/store/selectors'

export const REMOVE_OWNER_REVIEW_BTN_TEST_ID = 'remove-owner-review-btn'

const ReviewRemoveOwner = ({ classes, onClickBack, onClose, onSubmit, ownerAddress, ownerName, values }) => {
  const [gasCosts, setGasCosts] = useState('< 0.001')
  const safeAddress = useSelector((state) => state.safeAddress)
  const safeName = useSelector((state) => state.safeName)
  const owners = useSelector((state) => state.walletOwners)

  useEffect(() => {
    let isCurrent = true

    const estimateGas = async () => {
      const web3 = getWeb3()
      const { fromWei, toBN } = web3.utils
      const gnosisSafe = await getGnosisSafeInstanceAt(safeAddress)
      const safeOwners = await gnosisSafe.methods.getOwners().call()
      const index = safeOwners.findIndex((owner) => owner.toLowerCase() === ownerAddress.toLowerCase())
      const prevAddress = index === 0 ? SENTINEL_ADDRESS : safeOwners[index - 1]
      const txData = gnosisSafe.methods.removeOwner(prevAddress, ownerAddress, values.threshold).encodeABI()
      const estimatedGasCosts = await estimateTxGasCosts(safeAddress, safeAddress, txData)
      const gasCostsAsEth = fromWei(toBN(estimatedGasCosts), 'ether')
      const formattedGasCosts = formatAmount(gasCostsAsEth)

      if (isCurrent) {
        setGasCosts(formattedGasCosts)
      }
    }

    estimateGas()
    return () => {
      isCurrent = false
    }
  }, [ownerAddress, safeAddress, values.threshold])

  return (
    <>
      <Row align="center" className={classes.heading} grow>
        <Paragraph className={classes.manage} noMargin weight="bolder">
          Remove owner
        </Paragraph>
        <Paragraph className={classes.annotation}>3 of 3</Paragraph>
        <IconButton disableRipple onClick={onClose}>
          <Close className={classes.closeIcon} />
        </IconButton>
      </Row>
      <Hairline />
      <Block>
        <Row className={classes.root}>
          <Col layout="column" xs={4}>
            <Block className={classes.details}>
              <Block margin="lg">
                <Paragraph color="primary" noMargin size="lg">
                  Details
                </Paragraph>
              </Block>
              <Block margin="lg">
                <Paragraph color="disabled" noMargin size="sm">
                  Safe name
                </Paragraph>
                <Paragraph className={classes.name} color="primary" noMargin size="lg" weight="bolder">
                  {safeName}
                </Paragraph>
              </Block>
              <Block margin="lg">
                <Paragraph color="disabled" noMargin size="sm">
                  Any transaction requires the confirmation of:
                </Paragraph>
                <Paragraph className={classes.name} color="primary" noMargin size="lg" weight="bolder">
                  {`${values.threshold} out of ${owners.length - 1} owner(s)`}
                </Paragraph>
              </Block>
            </Block>
          </Col>
          <Col className={classes.owners} layout="column" xs={8}>
            <Row className={classes.ownersTitle}>
              <Paragraph color="primary" noMargin size="lg">
                {`${owners.length - 1} Safe owner(s)`}
              </Paragraph>
            </Row>
            <Hairline />
            {owners.map(
              (owner) =>
                owner.address !== ownerAddress && (
                  <React.Fragment key={owner.address}>
                    <Row className={classes.owner}>
                      <Col align="center" xs={1}>
                        <Identicon address={owner.address} diameter={32} />
                      </Col>
                      <Col xs={11}>
                        <Block className={classNames(classes.name, classes.userName)}>
                          <Paragraph noMargin size="lg" weight="bolder">
                            {owner.name}
                          </Paragraph>
                          <Block className={classes.user} justify="center">
                            <Paragraph className={classes.address} color="disabled" noMargin size="md">
                              {owner.address}
                            </Paragraph>
                            <CopyBtn content={owner.address} />
                            <IconTrackerBtn type="address" value={owner.address} />
                          </Block>
                        </Block>
                      </Col>
                    </Row>
                    <Hairline />
                  </React.Fragment>
                ),
            )}
            <Row align="center" className={classes.info}>
              <Paragraph color="primary" noMargin size="md" weight="bolder">
                REMOVING OWNER &darr;
              </Paragraph>
            </Row>
            <Hairline />
            <Row className={classes.selectedOwner}>
              <Col align="center" xs={1}>
                <Identicon address={ownerAddress} diameter={32} />
              </Col>
              <Col xs={11}>
                <Block className={classNames(classes.name, classes.userName)}>
                  <Paragraph noMargin size="lg" weight="bolder">
                    {ownerName}
                  </Paragraph>
                  <Block className={classes.user} justify="center">
                    <Paragraph className={classes.address} color="disabled" noMargin size="md">
                      {ownerAddress}
                    </Paragraph>
                    <CopyBtn content={ownerAddress} />
                    <IconTrackerBtn type="address" value={ownerAddress} />
                  </Block>
                </Block>
              </Col>
            </Row>
            <Hairline />
          </Col>
        </Row>
      </Block>
      <Hairline />
      <Block className={classes.gasCostsContainer}>
        <Paragraph>
          You&apos;re about to create a transaction and will have to confirm it with your currently connected wallet.
        </Paragraph>
      </Block>
      <Hairline />
      <Row align="center" className={classes.buttonRow}>
        <Button minHeight={42} minWidth={140} onClick={onClickBack}>
          Back
        </Button>
        <Button
          color="primary"
          minHeight={42}
          minWidth={140}
          onClick={onSubmit}
          testId={REMOVE_OWNER_REVIEW_BTN_TEST_ID}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Row>
    </>
  )
}

export default withStyles(styles as any)(ReviewRemoveOwner)