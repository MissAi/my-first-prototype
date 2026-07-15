import { useState, type FC } from 'react'
import { VegaInput, VegaTextarea } from '@globalpayments/vega-react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onDirty: () => void
}

const EmailReceipts: FC<Props> = ({ onBack, onDirty }) => {
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBodyText, setEmailBodyText] = useState('')

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#F0F3F7',
      }}
    >
      <StatusBar background="#FCFCFC" />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 16px',
          background: '#FCFCFC',
          borderBottom: '1px solid #e5e5ea',
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'none',
            color: '#262AFF',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            minWidth: 60,
          }}
        >
          Back
        </button>
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: '#04041C',
            marginRight: 60,
          }}
        >
          E-Mail Receipts
        </span>
      </div>

      <div style={{ flex: 1, background: '#F0F3F7' }}>
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#FCFCFC',
            padding: '16px 16px 48px',
            boxShadow: '0 1px 0 rgba(4,4,28,0.04)',
            display: 'grid',
            gap: 16,
          }}
        >
          <VegaInput
            label="Email Subject"
            value={emailSubject}
            labelSuffixButtonConfig={{
              icon: 'fas fa-circle-info',
              text: 'Displayed as the subject line for receipt emails.',
              trigger: 'hover',
              placement: 'top',
              alignment: 'center',
            }}
            onVegaChange={(event: Event) => {
              const next = (event as CustomEvent<string>).detail ?? ''
              if (next !== emailSubject) {
                setEmailSubject(next)
                onDirty()
              }
            }}
          />

          <VegaTextarea
            label="Email Body Text"
            value={emailBodyText}
            rows={6}
            onVegaChange={(event: Event) => {
              const next = (event as CustomEvent<string>).detail ?? ''
              if (next !== emailBodyText) {
                setEmailBodyText(next)
                onDirty()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default EmailReceipts