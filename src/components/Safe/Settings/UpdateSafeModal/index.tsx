import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { styles } from './style'

import GnoForm from '@src/components/core/GnoForm'
import Block from '@src/components/core/Block'
import Button from '@src/components/core/Button'
import Hairline from '@src/components/core/Hairline'
import Paragraph from '@src/components/core/Paragraph'
import Row from '@src/components/core/Row'
import { upgradeSafeToLatestVersion } from 'src/logic/safe/utils/upgradeSafe'
import createTransaction from 'src/logic/safe/store/actions/createTransaction'

const UpdateSafeModal = ({ classes, onClose, safeAddress }) => {
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    // Call the update safe method
    await upgradeSafeToLatestVersion(safeAddress, bindActionCreators(createTransaction, dispatch))
    onClose()
  }

  return (
    <>
      <Row align="center" className={classes.heading} grow>
        <Paragraph className={classes.headingText} noMargin weight="bolder">
          Update to new Safe version
        </Paragraph>
        <IconButton disableRipple onClick={onClose}>
          <Close className={classes.close} />
        </IconButton>
      </Row>
      <Hairline />
      <GnoForm onSubmit={handleSubmit}>
        {() => (
          <>
            <Block className={classes.modalContent}>
              <Row>
                <Paragraph>
                  Update now to take advantage of new features and the highest security standards available.
                </Paragraph>
                <Block>
                  This update includes:
                  <ul>
                    <li>Compatibility with new asset types (ERC-721 / ERC-1155)</li>
                    <li>Improved interoperability with modules</li>
                    <li>Minor security improvements</li>
                  </ul>
                </Block>
                <Paragraph>
                  You will need to confirm this update just like any other transaction. This means other owners will
                  have to confirm the update in case more than one confirmation is required for this Safe.
                </Paragraph>
              </Row>
            </Block>
            <Hairline style={{ position: 'absolute', bottom: 85 }} />
            <Row align="center" className={classes.buttonRow}>
              <Button minWidth={140} onClick={onClose}>
                Back
              </Button>
              <Button color="primary" minWidth={140} type="submit" variant="contained">
                Update Safe
              </Button>
            </Row>
          </>
        )}
      </GnoForm>
    </>
  )
}

export default withStyles(styles as any)(UpdateSafeModal)
