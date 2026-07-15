import { useEffect, useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  saveAllEnabled: boolean
  showAuditTrail: boolean
  showSaveSuccessToast: boolean
  onSaveAll: () => void
  onOpenAuditTrail: () => void
  onDiscardChanges: () => void
  onDisplayClick: () => void
  onBodyClick: () => void
  onHeaderFooterClick: () => void
  onEmailReceiptsClick: () => void
  onHamburgerClick: () => void
}

const ITEMS = [
  { label: 'Display', tappable: true },
  { label: 'Body', tappable: true },
  { label: 'Header & Footer Lines', tappable: true },
  { label: 'E-Mail Receipts', tappable: true },
]

const ICON_VERSION = '20260715-1710'
const ICON_BASE = `${import.meta.env.BASE_URL}icons/`

const CustomerReceiptList: FC<Props> = ({
  saveAllEnabled,
  showAuditTrail,
  showSaveSuccessToast,
  onSaveAll,
  onOpenAuditTrail,
  onDiscardChanges,
  onDisplayClick,
  onBodyClick,
  onHeaderFooterClick,
  onEmailReceiptsClick,
  onHamburgerClick,
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false)
  const actionMenuRef = useRef<HTMLDivElement | null>(null)
  const actionMenuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!showActionMenu) return

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedInsideMenu = actionMenuRef.current?.contains(target) ?? false
      const clickedDotsButton = actionMenuButtonRef.current?.contains(target) ?? false
      if (!clickedInsideMenu && !clickedDotsButton) setShowActionMenu(false)
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [showActionMenu])

  function handleItemClick(label: string) {
    if (label === 'Display') onDisplayClick()
    if (label === 'Body') onBodyClick()
    if (label === 'Header & Footer Lines') onHeaderFooterClick()
    if (label === 'E-Mail Receipts') onEmailReceiptsClick()
  }

  return (
    <div
      style={{
        height: '100%',
        background: '#f2f2f7',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <StatusBar />

      {/* App header */}
      <div
        style={{
          background: '#f2f2f7',
          padding: '10px 16px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onHamburgerClick}
          style={{
            border: '1px solid #abc6d8',
            background: 'white ',
            fontSize: 22,
            cursor: 'pointer',
            padding: ' 8px 12px',
            borderRadius: 20,
            lineHeight: 1,
            color: '#04041C',
          }}
        >
          ≡
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#04041C' }}>
              Redwood Grill 1
            </span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="#04041C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#6B747D', marginTop: 1 }}>
            Location Setup
          </div>
        </div>
        {/* Utility icons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img
            src={`${ICON_BASE}Publish.svg`}
            alt="Publish"
            style={{ width: 44, height: 44, objectFit: 'contain' }}
          />
          <img
            src={`${ICON_BASE}info.svg`}
            alt="Info"
            style={{ width: 44, height: 44, objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Section header row */}
      <div
        style={{
          background: '#f2f2f7',
          padding: '16px 16px 8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 18, color: '#04041C' }}>
          Customer Receipt
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <button
            ref={actionMenuButtonRef}
            type="button"
            aria-label="Open receipt actions"
            onClick={() => setShowActionMenu((prev) => !prev)}
            style={{
              border: 'none',
              background: 'none',
              color: '#262AFF',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 1,
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ···
          </button>

          {showActionMenu && (
            <div
              ref={actionMenuRef}
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                minWidth: 190,
                border: '1px solid #ABC6D8',
                borderRadius: 8,
                background: '#FCFCFC',
                boxShadow: '0 8px 20px rgba(4,4,28,0.12)',
                overflow: 'hidden',
                zIndex: 30,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (!saveAllEnabled) return
                  onDiscardChanges()
                  setShowActionMenu(false)
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  background: '#FCFCFC',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: saveAllEnabled ? '#04041C' : 'rgba(4, 4, 28, 0.48)',
                  cursor: saveAllEnabled ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                <img
                  src={`${ICON_BASE}discard-changes.svg?v=${ICON_VERSION}`}
                  alt="Discard changes"
                  style={{ width: 16, height: 16, objectFit: 'contain', opacity: saveAllEnabled ? 1 : 0.5 }}
                />
                <span>Discard Changes</span>
              </button>

              {showAuditTrail && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenAuditTrail()
                    setShowActionMenu(false)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: '#FCFCFC',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 14px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#04041C',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <img
                    src={`${ICON_BASE}audit-trail.svg?v=${ICON_VERSION}`}
                    alt="Audit trail"
                    style={{ width: 16, height: 16, objectFit: 'contain' }}
                  />
                  <span>Audit Trail</span>
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            disabled={!saveAllEnabled}
            onClick={() => {
              if (!saveAllEnabled) return
              onSaveAll()
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              fontWeight: 700,
              fontSize: 16,
              fontFamily: 'inherit',
              background: saveAllEnabled ? '#262AFF' : '#E0E0E0',
              color: saveAllEnabled ? 'white' : '#9E9E9E',
              cursor: saveAllEnabled ? 'pointer' : 'not-allowed',
              transition: 'background 0.25s, color 0.25s',
            }}
          >
            Save All
          </button>
        </div>
      </div>

      {/* Items list */}
      <div style={{ background: 'white', flexShrink: 0 }}>
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            onClick={() => handleItemClick(item.label)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '24px 24px',
              borderBottom:
                i < ITEMS.length - 1 ? '1px solid #ABC6D8' : 'none',
              cursor: item.tappable ? 'pointer' : 'default',
              background: 'white',
            }}
          >
            <span
              style={{
                flex: 1,
                fontWeight: 700,
                fontSize: 16,
                color: '#04041C',
              }}
            >
              {item.label}
            </span>
            {/* Chevron right */}
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path
                d="M2 2l6 6-6 6"
                stroke="#04041C"
                opacity="0.64"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {showSaveSuccessToast && (
        <div
          className="save-success-toast"
          role="status"
          aria-live="polite"
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 34,
            background: '#8CD79A',
            borderRadius: 16,
            minHeight: 84,
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#0A1931',
            boxShadow: '0 10px 28px rgba(10, 25, 49, 0.12)',
            pointerEvents: 'none',
            zIndex: 40,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: '#0A1931',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2.2 6.2 4.7 8.7 9.8 3.6"
                stroke="#8CD79A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 16,
              lineHeight: 1,
              fontWeight: 500,
            }}
          >
            Changes saved.
          </span>
        </div>
      )}
    </div>
  )
}

export default CustomerReceiptList
