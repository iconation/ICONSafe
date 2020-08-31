import { boldFont, disabled, error, extraSmallFontSize, lg, secondary, sm } from '@src/theme/variables'

export const styles = () => ({
  container: {
    display: 'flex',
    fontSize: extraSmallFontSize,
    fontWeight: boldFont,
    padding: sm,
    alignItems: 'center',
    boxSizing: 'border-box',
    height: lg,
    marginTop: sm,
    marginBottom: sm,
    borderRadius: '3px'
  },
  EXECUTED: {
    backgroundColor: '#A1D2CA',
    color: secondary
  },
  REJECTED: {
    backgroundColor: '#FFD2D2',
    color: '#D8000C'
  },
  FAILED: {
    backgroundColor: '#FFD2D2',
    color: '#D8000C'
  },
  awaiting_your_confirmation: {
    backgroundColor: '#d4d5d3',
    color: disabled
  },
  awaiting_confirmations: {
    backgroundColor: '#d4d5d3',
    color: disabled
  },
  awaiting_execution: {
    backgroundColor: '#d4d5d3',
    color: disabled
  },
  WAITING: {
    backgroundColor: '#fff3e2',
    color: '#e8673c'
  },
  statusText: {
    padding: '0 7px'
  }
})
