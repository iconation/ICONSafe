import React from 'react'
// import { useSelector } from 'react-redux'

// import { getNameFromAddressBook } from 'src/logic/addressBook/store/selectors'
import Block from '@src/components/core/Block'
import Bold from '@src/components/core/Bold'
// import OwnerAddressTableCell from 'src/routes/safe/components/Settings/ManageOwners/OwnerAddressTableCell'
import { ICONTrackerLink } from '@components/ICON'
import { displayUnit } from '@src/utils/icon'
import Img from '@components/core/Img'
import { getTokenIcon } from '@components/TokenIcon'
import { styles } from './styles'
import { makeStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const useStyles = makeStyles(styles)

const TokenTransferDescription = ({ amount, decimals, symbol, address, incoming }) => {
  const classes = useStyles()

  return (
    <Block className={classes.transactionDescriptionContainer}>

      <ListItemIcon>
        <Img
          style={{ paddingRight: '5px', paddingLeft: '8px', verticalAlign: 'bottom' }}
          height={20}
          src={getTokenIcon(symbol).src} alt={symbol}
        />
      </ListItemIcon>

      {incoming && <Bold>Receive {displayUnit(amount, decimals)} {symbol} from:</Bold>}
      {!incoming && <Bold>Send {displayUnit(amount, decimals)} {symbol} to:</Bold>}
      <ICONTrackerLink className={classes.transferDestination} knownAddress={false} value={address} />
    </Block>
  )
}

export default TokenTransferDescription
