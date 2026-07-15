import { useMemo, useRef, useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Props {
  onBack: () => void
  onConfirm: (logoUrl: string) => void
}

type LogoItem = {
  id: string
  name: string
  url: string
}

const BASE_URL = import.meta.env.BASE_URL

const bundledLogoModules = import.meta.glob('../assets/mock-logos/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const bundledLogos: LogoItem[] = Object.entries(bundledLogoModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([filePath, url], index) => {
    const fileName = filePath.split('/').pop() ?? filePath
    return {
      id: fileName,
      name: index === 0 ? 'Diet Coke Diet Coke Diet Coke' : 'Diet Coke',
      url,
    }
  })

const LogoImagePicker: FC<Props> = ({ onBack, onConfirm }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [logoItems, setLogoItems] = useState<LogoItem[]>(bundledLogos)
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canChoose = useMemo(() => Boolean(selectedLogo), [selectedLogo])
  const filteredLogos = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()
    if (!keyword) return logoItems
    return logoItems.filter((item) => item.name.toLowerCase().includes(keyword))
  }, [logoItems, searchQuery])

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#FCFCFC',
      }}
    >
      <StatusBar background="#FCFCFC" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '83px 1fr 83px',
          alignItems: 'center',
          padding: '16px 16px',
          columnGap: 8,
          background: '#FCFCFC',
          borderBottom: '1px solid #C7D9E5',
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
            width: '100%',
            textAlign: 'left',
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
          }}
        >
          Images
        </span>
        <button
          onClick={() => selectedLogo && onConfirm(selectedLogo)}
          disabled={!canChoose}
          style={{
            border: 'none',
            background: 'none',
            color: canChoose ? '#262AFF' : '#A4A6B3',
            fontSize: 16,
            fontWeight: 700,
            cursor: canChoose ? 'pointer' : 'default',
            padding: 0,
            width: '100%',
            textAlign: 'right',
          }}
        >
          Choose
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#FCFCFC' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 44,
              border: '1px solid #ABC6D8',
              borderRadius: 8,
              background: '#FCFCFC',
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              gap: 8,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="#6B6F80" strokeWidth="1.8" />
              <path d="M10.8 10.8L14 14" stroke="#6B6F80" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
              style={{
                border: 'none',
                outline: 'none',
                flex: 1,
                background: 'transparent',
                fontSize: 15,
                color: '#04041C',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload image"
            style={{
              width: 44,
              height: 44,
              border: 'none',
              borderRadius: 999,
              background: '#262AFF',
              color: '#FCFCFE',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2.75V13.25" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M2.75 8H13.25" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            columnGap: 16,
            rowGap: 18,
            paddingBottom: 16,
          }}
        >
          {filteredLogos.map((item) => {
            const isActive = selectedLogo === item.url
            return (
              <div key={item.id}>
                <button
                  onClick={() => setSelectedLogo(item.url)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    border: isActive ? '2px solid #262AFF' : '2px solid #C7D9E5',
                    borderRadius: 14,
                    background: '#FCFCFC',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: 8,
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />

                  {isActive && (
                    <img
                      src={`${BASE_URL}icons/checkmark.svg`}
                      alt="selected"
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        width: 22,
                        height: 22,
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </button>

                <div
                  style={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: '20px',
                      color: '#04041C',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 'calc(100% - 26px)',
                    }}
                  >
                    {item.name}
                  </span>

                  <button
                    aria-label={`Delete ${item.name}`}
                    onClick={() => {
                      setLogoItems((prev) => prev.filter((logo) => logo.id !== item.id))
                      setSelectedLogo((current) => (current === item.url ? null : current))
                    }}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#04041C',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2.8 4.2H13.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <path d="M6.2 2.8H9.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <path
                        d="M4.4 4.2V12.5C4.4 13.1 4.9 13.6 5.5 13.6H10.5C11.1 13.6 11.6 13.1 11.6 12.5V4.2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M6.8 6.8V11.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M9.2 6.8V11.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}

          {filteredLogos.length === 0 && (
            <div
              style={{
                gridColumn: '1 / -1',
                color: '#6B747D',
                fontSize: 14,
                textAlign: 'center',
                padding: '24px 0',
              }}
            >
              No images found
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            const objectUrl = URL.createObjectURL(file)
            const nextItem: LogoItem = {
              id: `${file.name}-${Date.now()}`,
              name: file.name.replace(/\.[^.]+$/, ''),
              url: objectUrl,
            }
            setLogoItems((prev) => [nextItem, ...prev])
            setSelectedLogo(nextItem.url)
            event.currentTarget.value = ''
          }}
        />
      </div>
    </div>
  )
}

export default LogoImagePicker
