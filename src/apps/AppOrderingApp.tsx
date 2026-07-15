import { useState } from 'react'
import LeftNav from '../screens/LeftNav'
import StatusBar from '../components/StatusBar'
import HomeBar from '../components/HomeBar'
import '../App.css'

type Screen = 'left-nav' | 'intro'

export default function AppOrderingApp() {
  const [screen, setScreen] = useState<Screen>('left-nav')

  return (
    <div className="phone-shell">
      {screen === 'left-nav' && (
        <LeftNav
          onSelectCustomerReceipt={() => setScreen('intro')}
          onClose={() => setScreen('intro')}
        />
      )}
      {screen === 'intro' && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
          }}
        >
          <StatusBar />

          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              borderBottom: '1px solid #e5e5ea',
              flexShrink: 0,
              background: 'white',
            }}
          >
            <button
              onClick={() => setScreen('left-nav')}
              style={{
                border: 'none',
                background: 'none',
                color: '#262AFF',
                fontSize: 17,
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                minWidth: 60,
              }}
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path
                  d="M8 2L2 8l6 6"
                  stroke="#262AFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 17,
                color: '#04041C',
                marginRight: 60,
              }}
            >
              App Ordering
            </span>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: '#04041C', fontSize: 24, marginBottom: 16 }}>
              🚀 App Ordering Setup
            </h2>
            <p style={{ color: '#6B747D', fontSize: 16, lineHeight: 1.6 }}>
              这是一个独立的 prototype，展示 App Ordering 的配置流程。
            </p>
            <p style={{ color: '#262AFF', fontSize: 14, marginTop: 20 }}>
              这是第二个独立的 prototype！
            </p>
          </div>
        </div>
      )}
      <HomeBar />
    </div>
  )
}
