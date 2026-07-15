import { useEffect, useState } from 'react'
import LeftNav from '../screens/LeftNav'
import CustomerReceiptList from '../screens/CustomerReceiptList'
import BodySettings from '../screens/BodySettings'
import EmailReceipts from '../screens/EmailReceipts'
import DisplaySettings from '../screens/DisplaySettings'
import HeaderFooterLines from '../screens/HeaderFooterLines'
import LogoImagePicker from '../screens/LogoImagePicker'
import HomeBar from '../components/HomeBar'
import '../App.css'

type Screen =
  | 'left-nav'
  | 'receipt-list'
  | 'body'
  | 'display'
  | 'logo-image-picker'
  | 'header-footer'
  | 'email-receipts'

type ScreenMotionPreset = 'page' | 'drawer'

const SCREEN_MOTION: Record<Screen, ScreenMotionPreset> = {
  'left-nav': 'drawer',
  'receipt-list': 'page',
  body: 'page',
  display: 'page',
  'logo-image-picker': 'page',
  'header-footer': 'page',
  'email-receipts': 'page',
}

export default function CustomerReceiptApp() {
  const [screen, setScreen] = useState<Screen>('receipt-list')
  const [saveAllEnabled, setSaveAllEnabled] = useState(false)
  const [showAuditTrail, setShowAuditTrail] = useState(false)
  const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(null)
  const [showSaveSuccessToast, setShowSaveSuccessToast] = useState(false)

  useEffect(() => {
    if (!showSaveSuccessToast) return

    const timeoutId = window.setTimeout(() => {
      setShowSaveSuccessToast(false)
    }, 2200)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showSaveSuccessToast])

  function goToScreen(nextScreen: Screen) {
    setScreen(nextScreen)
  }

  function markDirty() {
    setSaveAllEnabled(true)
    setShowSaveSuccessToast(false)
  }

  return (
    <div className="phone-shell">
      <div
        key={screen}
        className={`screen-motion screen-motion--${SCREEN_MOTION[screen]}`}
      >
        {screen === 'left-nav' && (
          <LeftNav
            onSelectCustomerReceipt={() => goToScreen('receipt-list')}
            onClose={() => goToScreen('receipt-list')}
          />
        )}
        {screen === 'receipt-list' && (
          <CustomerReceiptList
            saveAllEnabled={saveAllEnabled}
            showAuditTrail={showAuditTrail}
            showSaveSuccessToast={showSaveSuccessToast}
            onSaveAll={() => {
              setSaveAllEnabled(false)
              setShowAuditTrail(true)
              setShowSaveSuccessToast(true)
            }}
            onOpenAuditTrail={() => {
              // Placeholder action for prototype menu interaction.
            }}
            onDiscardChanges={() => {
              setSelectedLogoUrl(null)
              setSaveAllEnabled(false)
              setShowSaveSuccessToast(false)
            }}
            onDisplayClick={() => goToScreen('display')}
            onBodyClick={() => goToScreen('body')}
            onHeaderFooterClick={() => goToScreen('header-footer')}
            onEmailReceiptsClick={() => goToScreen('email-receipts')}
            onHamburgerClick={() => goToScreen('left-nav')}
          />
        )}
        {screen === 'body' && (
          <BodySettings
            onBack={() => goToScreen('receipt-list')}
            onDirty={markDirty}
          />
        )}
        {screen === 'display' && (
          <DisplaySettings
            logoUrl={selectedLogoUrl}
            onOpenLogoPicker={() => goToScreen('logo-image-picker')}
            onResetLogo={() => {
              setSelectedLogoUrl(null)
              markDirty()
            }}
            onDirty={markDirty}
            onBack={() => {
              goToScreen('receipt-list')
            }}
          />
        )}
        {screen === 'logo-image-picker' && (
          <LogoImagePicker
            onBack={() => goToScreen('display')}
            onConfirm={(logoUrl) => {
              setSelectedLogoUrl(logoUrl)
              markDirty()
              goToScreen('display')
            }}
          />
        )}
        {screen === 'header-footer' && (
          <HeaderFooterLines
            onBack={() => goToScreen('receipt-list')}
            onDirty={markDirty}
          />
        )}
        {screen === 'email-receipts' && (
          <EmailReceipts
            onBack={() => goToScreen('receipt-list')}
            onDirty={markDirty}
          />
        )}
      </div>
      <HomeBar />
    </div>
  )
}
