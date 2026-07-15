import { useState, type FC } from 'react'
import { VegaInputNumeric } from '@globalpayments/vega-react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onOpenLogoPicker: () => void
  onResetLogo: () => void
  onDirty: () => void
  logoUrl: string | null
}

const DisplaySettings: FC<Props> = ({ onBack, onOpenLogoPicker, onResetLogo, onDirty, logoUrl }) => {
  const [hideSeparator, setHideSeparator] = useState(true)
  const [rollUpModifiers, setRollUpModifiers] = useState(true)
  const [topMargin, setTopMargin] = useState('1')
  const [bottomMargin, setBottomMargin] = useState('1')

  const handleMarginInput = (
    currentValue: string,
    setValue: (value: string) => void,
    event: Event,
  ) => {
    const nextValue = (event as CustomEvent<number>).detail

    if (Number.isNaN(nextValue)) {
      if (currentValue !== '') {
        setValue('')
        onDirty()
      }
      return
    }

    const normalized = String(nextValue)
    if (normalized !== currentValue) {
      setValue(normalized)
      onDirty()
    }
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
      }}
    >
      <StatusBar />

      {/* Back + Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 16px',
          borderBottom: '1px solid #e5e5ea',
          flexShrink: 0,
          background: 'white',
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'none',
            color: '#262AFF',
            fontSize: 16, fontWeight: 700,
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
          Display
        </span>
      </div>

      {/* Scrollable form */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {/* Logo upload area */}
        <div
          onClick={onOpenLogoPicker}
          style={{
            border: '2px dashed #ABC6D8',
            borderRadius: 8,
            height: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            cursor: 'pointer',
            background: '#F8FAFC',
            transition: 'border-color 0.2s',
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Selected logo"
              style={{ maxWidth: 120, maxHeight: 100, objectFit: 'contain' }}
            />
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: 8 }}
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#262AFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  color: '#262AFF',
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                Set Black & White Logo
              </span>
              <span style={{ color: '#6B747D', fontSize: 12 }}>
                Only *.jpg, *.jpeg, *.png, *.gif
              </span>
            </>
          )}
        </div>

        {logoUrl && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginTop: -8,
              marginBottom: 20,
            }}
          >
            <button
              type="button"
              onClick={onResetLogo}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                color: '#262AFF',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Reset to Default
            </button>
            <span style={{ color: '#ABC6D8', fontSize: 14, fontWeight: 600 }}>|</span>
            <button
              type="button"
              onClick={onOpenLogoPicker}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                color: '#262AFF',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Change Logo
            </button>
          </div>
        )}

        {/* Top Margin */}
        <VegaInputNumeric
          label="Top Margin"
          value={topMargin}
          integerOnly={true}
          suffixText="lines"
          showClearIcon={false}
          style={{ marginBottom: 16 }}
          onVegaChange={(event: Event) => {
            handleMarginInput(topMargin, setTopMargin, event)
          }}
        />

        {/* Bottom Margin */}
        <VegaInputNumeric
          label="Bottom Margin"
          value={bottomMargin}
          integerOnly={true}
          suffixText="lines"
          showClearIcon={false}
          style={{ marginBottom: 16 }}
          onVegaChange={(event: Event) => {
            handleMarginInput(bottomMargin, setBottomMargin, event)
          }}
        />

        {/* Checkboxes */}
        <CheckboxField
          label="Hide Separator Lines"
          description="If selected, the separator lines on these receipts will not be shown"
          checked={hideSeparator}
          onChange={() => {
            setHideSeparator((v) => !v)
            onDirty()
          }}
        />
        <CheckboxField
          label="Show Promised Time"
          description="Show the promise time on delivery receipts."
          checked={false}
          onChange={() => {}}
        />
        <CheckboxField
          label="Show Surcharge Clause"
          description="Show a clause informing the customer of a ticket's potential credit card surcharge fee."
          checked={false}
          onChange={() => {}}
        />
        <CheckboxField
          label="Roll Up Modifiers Prices"
          description="Item prices will include the prices of their added modifiers."
          checked={rollUpModifiers}
          onChange={() => {
            setRollUpModifiers((v) => !v)
            onDirty()
          }}
        />
        <CheckboxField
          label="Roll Up Duplicates"
          description="Identical items, discounts, and adjustments will be consolidated."
          checked={false}
          onChange={() => {}}
        />

        {/* Modifiers dropdown */}
        <FieldLabel label="Modifiers" />
        <div
          style={{
            ...inputStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          <span style={{ color: '#04041C', fontSize: 16 }}>Hide All</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="#6B747D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <CheckboxField
          label="Show Seat Details"
          description="Breakout receipt totals by their seat."
          checked={false}
          onChange={() => {}}
        />
        <CheckboxField
          label="Show Tax-Inclusive Details"
          description="Show the tax amount on the receipt for tax-inclusive items"
          checked={false}
          onChange={() => {}}
        />

        <div style={{ height: 32 }} />
      </div>
    </div>
  )
}

/* ── Shared sub-components ───────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid #ABC6D8',
  borderRadius: 8,
  fontSize: 16,
  color: '#04041C',
  marginBottom: 16,
  fontFamily: 'inherit',
  outline: 'none',
  background: 'white',
}

function FieldLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: 16,
        color: '#04041C',
        fontWeight: 500,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
  )
}

function CheckboxField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel label={label} />
      <div
        onClick={onChange}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '12px 14px',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          cursor: 'pointer',
          background: 'white',
        }}
      >
        {/* Checkbox */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            border: checked ? 'none' : '2px solid #ABC6D8',
            background: checked ? '#262AFF' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 2,
            transition: 'background 0.15s',
          }}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span style={{ fontSize: 15, color: '#04041C', lineHeight: 1.5 }}>
          {description}
        </span>
      </div>
    </div>
  )
}

export default DisplaySettings
