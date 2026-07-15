import { useState, type FC } from 'react'
import { VegaInputSelect } from '@globalpayments/vega-react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onDirty: () => void
}

type VegaSelectSourceItem = {
  id: string
  displayName: string
}

const FONT_BODY_OPTIONS: VegaSelectSourceItem[] = [
  {
    id: 'Menlo-Bold (iOS)/ RobotoMono-Bold (Android)',
    displayName: 'Menlo-Bold (iOS)/ RobotoMono-Bold (Android)',
  },
  {
    id: 'Menlo-Regular (iOS)/ RobotoMono-Regular (Android)',
    displayName: 'Menlo-Regular (iOS)/ RobotoMono-Regular (Android)',
  },
  {
    id: 'Helvetica Neue (iOS)/ Roboto (Android)',
    displayName: 'Helvetica Neue (iOS)/ Roboto (Android)',
  },
  {
    id: 'San Francisco (iOS)/ Roboto (Android)',
    displayName: 'San Francisco (iOS)/ Roboto (Android)',
  },
  {
    id: 'Avenir Next (iOS)/ Roboto (Android)',
    displayName: 'Avenir Next (iOS)/ Roboto (Android)',
  },
  {
    id: 'Courier New (iOS)/ RobotoMono (Android)',
    displayName: 'Courier New (iOS)/ RobotoMono (Android)',
  },
  {
    id: 'Times New Roman (iOS)/ Noto Serif (Android)',
    displayName: 'Times New Roman (iOS)/ Noto Serif (Android)',
  },
  {
    id: 'Georgia (iOS)/ Noto Serif (Android)',
    displayName: 'Georgia (iOS)/ Noto Serif (Android)',
  },
]

const SIZE_OPTIONS: VegaSelectSourceItem[] = [
  { id: 'Small', displayName: 'Small' },
  { id: 'Standard', displayName: 'Standard' },
  { id: 'Large', displayName: 'Large' },
]

function getVegaSelectValue(event: Event): string | null {
  const customEvent = event as CustomEvent<unknown>
  const detail = customEvent.detail

  if (typeof detail === 'string') return detail

  if (detail && typeof detail === 'object' && 'value' in detail) {
    const value = (detail as { value?: unknown }).value
    if (typeof value === 'string') return value
  }

  return null
}

const BodySettings: FC<Props> = ({ onBack, onDirty }) => {
  const [fontBody, setFontBody] = useState(
    'Menlo-Bold (iOS)/ RobotoMono-Bold (Android)',
  )
  const [size, setSize] = useState('Small')

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
          padding: '10px 16px',
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
          Body
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
          <VegaInputSelect
            label="Font Body"
            selectType="single"
            source={FONT_BODY_OPTIONS}
            value={fontBody}
            vegaDropdownProps={{ searchable: true }}
            onVegaChange={(event: Event) => {
              const next = getVegaSelectValue(event)
              if (next && next !== fontBody) {
                setFontBody(next)
                onDirty()
              }
            }}
          />

          <VegaInputSelect
            label="Size"
            selectType="single"
            source={SIZE_OPTIONS}
            value={size}
            vegaDropdownProps={{ searchable: false }}
            onVegaChange={(event: Event) => {
              const next = getVegaSelectValue(event)
              if (next && next !== size) {
                setSize(next)
                onDirty()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BodySettings
