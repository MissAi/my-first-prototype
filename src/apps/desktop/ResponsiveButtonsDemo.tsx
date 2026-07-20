import { useEffect, useRef, useState, type FC } from 'react'
import {
  VegaButton,
  VegaImageUploader,
  VegaInput,
  VegaInputNumeric,
  VegaInputSelect,
  VegaTextarea,
  VegaTooltip,
} from '@globalpayments/vega-react'
import './ResponsiveButtonsDemo.css'

const ICON_BASE = `${import.meta.env.BASE_URL}icons/`

type VegaSelectSourceItem = {
  id: string
  displayName: string
}

function getVegaInputValue(event: Event): string {
  return (event as CustomEvent<string>).detail ?? ''
}

function getVegaSelectValue(event: Event): string | null {
  const detail = (event as CustomEvent<unknown>).detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && typeof detail[0] === 'string') return detail[0]
  return null
}

function getVegaNumericValue(event: Event): string {
  const detail = (event as CustomEvent<number>).detail
  return Number.isFinite(detail) ? String(detail) : ''
}

const TAX_SOURCE: VegaSelectSourceItem[] = [
  { id: 'taxable', displayName: 'Taxable' },
  { id: 'non-taxable', displayName: 'Non-Taxable' },
  { id: 'exempt', displayName: 'Exempt' },
]

const LEFT_NAV_ITEMS = [
  'Items',
  'Sections',
  'Groups',
  'Sizes',
  'Attributes',
  'Kitchen Groups',
  'Report Categories',
  'Daypart Categories',
  'Revenue Centers',
  'Modifiers',
  'Ingredients',
  'Context Items',
  'Taxes',
  'Tax Groups',
  'Pricing',
  'Discounts / Promotions',
  'Service Charges / Fees',
  'Void Reasons',
  'Upsell Profiles',
  'Upsell Groups',
  'Translations',
]

type IconName =
  | 'arrow-left'
  | 'trash-2'
  | 'rotate-ccw'
  | 'server'
  | 'copy'
  | 'plus'
  | 'chevron-down'
  | 'map-pin'
  | 'clock'
  | 'menu'
  | 'help-circle'
  | 'upload'
  | 'image'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'arrow-left':
      return (
        <svg {...common}>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      )
    case 'trash-2':
      return (
        <svg {...common}>
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      )
    case 'rotate-ccw':
      return (
        <svg {...common}>
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      )
    case 'server':
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      )
    case 'copy':
      return (
        <svg {...common}>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...common}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )
    case 'map-pin':
      return (
        <svg {...common}>
          <path d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      )
    case 'help-circle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'upload':
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      )
    case 'image':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    default:
      return null
  }
}

interface ActionDef {
  key: string
  icon: IconName
  iconSrc?: string
  label: string
  dropdownLabel?: string
  danger?: boolean
}

const TOOLBAR_ACTIONS: ActionDef[] = [
  {
    key: 'discard',
    icon: 'rotate-ccw',
    iconSrc: `${ICON_BASE}discard_blue.svg`,
    label: 'Discard Changes',
  },
  {
    key: 'location-overrides',
    icon: 'server',
    iconSrc: `${ICON_BASE}location%20override.svg`,
    label: 'Location Override',
    dropdownLabel: 'Location Overrides',
  },
  { key: 'duplicate', icon: 'copy', iconSrc: `${ICON_BASE}duplicate.svg`, label: 'Duplicate' },
  { key: 'add-new', icon: 'plus', iconSrc: `${ICON_BASE}addnew.svg`, label: 'Add New' },
]

const DELETE_ACTION: ActionDef = {
  key: 'delete',
  icon: 'trash-2',
  label: 'Delete',
  danger: true,
}

const AUDIT_ACTION: ActionDef = {
  key: 'audit-trail',
  icon: 'clock',
  label: 'Audit Trail',
}

const TOOLBAR_ROW_ACTIONS: ActionDef[] = [DELETE_ACTION, ...TOOLBAR_ACTIONS]

const DROPDOWN_GROUPS: ActionDef[][] = [
  [TOOLBAR_ACTIONS[0], TOOLBAR_ACTIONS[1], AUDIT_ACTION],
  [TOOLBAR_ACTIONS[3], TOOLBAR_ACTIONS[2]],
  [DELETE_ACTION],
]

function ToolbarIconButton({
  action,
  onSelect,
}: {
  action: ActionDef
  onSelect: (key: string) => void
}) {
  return (
    <button
      type="button"
      className={`rbd-icon-btn rbd-icon-btn--plain${action.danger ? ' rbd-icon-btn--danger' : ''}`}
      title={action.dropdownLabel ?? action.label}
      aria-label={action.dropdownLabel ?? action.label}
      onClick={() => onSelect(action.key)}
    >
      {action.iconSrc ? (
        <img
          src={action.iconSrc}
          alt=""
          aria-hidden="true"
          className="rbd-action-icon rbd-action-icon--plain"
        />
      ) : (
        <Icon name={action.icon} size={18} />
      )}
    </button>
  )
}

function ToolbarLabelButton({
  action,
  onSelect,
}: {
  action: ActionDef
  onSelect: (key: string) => void
}) {
  return (
    <button
      type="button"
      className={`rbd-label-btn${action.danger ? ' rbd-label-btn--danger' : ''}`}
      onClick={() => onSelect(action.key)}
    >
      {action.iconSrc ? (
        <img src={action.iconSrc} alt="" aria-hidden="true" className="rbd-action-icon" />
      ) : (
        <Icon name={action.icon} size={16} />
      )}
      <span>{action.label}</span>
    </button>
  )
}

function ActionsDropdown({ onSelect }: { onSelect: (key: string) => void }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function selectAndClose(key: string) {
    onSelect(key)
    setOpen(false)
  }

  return (
    <div className="rbd-actions-dropdown" ref={containerRef}>
      <div className="rbd-actions-dropdown__trigger-wrap">
        <button
          type="button"
          className="rbd-actions-dropdown__trigger-btn"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span>Actions</span>
          <img
            src={`${ICON_BASE}dropdown.svg`}
            alt=""
            aria-hidden="true"
            className="rbd-actions-dropdown__trigger-btn-icon"
          />
        </button>
      </div>
      {open && (
        <div className="rbd-actions-dropdown__menu" role="menu">
          {DROPDOWN_GROUPS.map((group, groupIndex) => (
            <div className="rbd-actions-dropdown__group" key={groupIndex}>
              {group.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  role="menuitem"
                  className={`rbd-actions-dropdown__item${action.danger ? ' rbd-actions-dropdown__item--danger' : ''}`}
                  onClick={() => selectAndClose(action.key)}
                >
                  {action.key === 'location-overrides' ? (
                    <img
                      src={`${ICON_BASE}location%20override.svg`}
                      alt=""
                      aria-hidden="true"
                      className="rbd-actions-dropdown__location-icon"
                    />
                  ) : (
                    <Icon name={action.icon} size={16} />
                  )}
                  <span>{action.dropdownLabel ?? action.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ToggleField({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string
  description: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div className="rbd-checkbox-field">
      <span className="rbd-checkbox-field__label">{label}</span>
      <button
        type="button"
        className="rbd-checkbox-field__control"
        role="checkbox"
        aria-checked={checked}
        onClick={onToggle}
      >
        <span
          className={`rbd-checkbox-field__box${checked ? ' is-checked' : ''}`}
          aria-hidden="true"
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
        </span>
        <span className="rbd-checkbox-field__description">{description}</span>
      </button>
    </div>
  )
}

const ResponsiveButtonsDemo: FC = () => {
  const [name, setName] = useState('Chocolate Chip Muffins')
  const [shortName, setShortName] = useState('')
  const [description, setDescription] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [cost, setCost] = useState('')
  const [tax, setTax] = useState('taxable')
  const [nonRevenue, setNonRevenue] = useState(false)
  const [alcohol, setAlcohol] = useState(false)
  const [measurement, setMeasurement] = useState(false)
  const [preventDiscounts, setPreventDiscounts] = useState(false)
  const photoStackRef = useRef<HTMLDivElement>(null)
  const [photoSize, setPhotoSize] = useState<number | null>(null)

  useEffect(() => {
    if (!photoStackRef.current) return

    function syncPhotoSize() {
      const target = photoStackRef.current
      if (!target) return
      const next = Math.round(target.getBoundingClientRect().height)
      setPhotoSize((prev) => (prev === next ? prev : next))
    }

    syncPhotoSize()

    const observer = new ResizeObserver(() => syncPhotoSize())
    observer.observe(photoStackRef.current)

    return () => observer.disconnect()
  }, [])

  function handleAction(key: string) {
    // Placeholder action for prototype toolbar interaction.
    console.log(`[ResponsiveButtonsDemo] action: ${key}`)
  }

  return (
    <div className="rbd-page">
      <header className="rbd-header">
        <div className="rbd-header__left">
          <button
            type="button"
            className="rbd-header__utility-btn rbd-header__utility-btn--menu"
            aria-label="Menu"
          >
            <Icon name="menu" size={18} />
          </button>
          <div className="rbd-header__brand">
            <span className="rbd-header__brand-name">Redwood Grill</span>
            <span className="rbd-header__brand-sub">Menu</span>
          </div>
        </div>
        <div className="rbd-header__right">
          <button type="button" className="rbd-header__location" aria-label="All Locations">
            <Icon name="map-pin" size={18} />
            <span>All Locations</span>
            <Icon name="chevron-down" size={17} />
          </button>
          <button type="button" className="rbd-header__utility-btn" aria-label="Publish">
            <img src={`${ICON_BASE}Publish.svg`} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="rbd-header__utility-btn" aria-label="Info">
            <img src={`${ICON_BASE}info.svg`} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="rbd-header__account" aria-label="Account menu">
            <span className="rbd-header__avatar">AA</span>
            <Icon name="chevron-down" size={18} />
          </button>
        </div>
      </header>

      <div className="rbd-body">
        <nav className="rbd-leftnav" aria-label="Menu sections">
          <ul>
            {LEFT_NAV_ITEMS.map((item) => (
              <li key={item} className={item === 'Items' ? 'is-active' : undefined}>
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <main className="rbd-main">
          <div className="rbd-toolbar">
            <div className="rbd-toolbar__left">
              <button
                type="button"
                className="rbd-back-btn"
                aria-label="Back"
                onClick={() => handleAction('back')}
              >
                <img src={`${ICON_BASE}arrow_back.svg`} alt="" aria-hidden="true" />
              </button>
              <h1 className="rbd-item-title">{name || 'Untitled Item'}</h1>
            </div>

            <div className="rbd-toolbar__right">
              <div className="rbd-actions">
                <div className="rbd-actions__collapsed">
                  <ActionsDropdown onSelect={handleAction} />
                </div>
                <div className="rbd-actions__icons">
                  <VegaTooltip text={DELETE_ACTION.label} trigger="hover" placement="top">
                    <ToolbarIconButton action={DELETE_ACTION} onSelect={handleAction} />
                  </VegaTooltip>
                  <span className="rbd-actions__icon-divider" aria-hidden="true" />
                  <div className="rbd-actions__icon-stack" aria-label="Toolbar icon actions">
                    {TOOLBAR_ACTIONS.map((action, index) => (
                      <div className="rbd-actions__icon-item" key={action.key}>
                        {index > 0 && <span className="rbd-actions__icon-divider" aria-hidden="true" />}
                        <VegaTooltip text={action.label} trigger="hover" placement="top">
                          <ToolbarIconButton action={action} onSelect={handleAction} />
                        </VegaTooltip>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rbd-actions__labels">
                  {TOOLBAR_ROW_ACTIONS.map((action, index) => (
                    <div className="rbd-actions__label-item" key={action.key}>
                      {index > 0 && <span className="rbd-actions__icon-divider" aria-hidden="true" />}
                      <ToolbarLabelButton action={action} onSelect={handleAction} />
                    </div>
                  ))}
                </div>
              </div>
              <VegaButton
                className="rbd-save-btn"
                label="Save"
                variant="primary"
                size="default"
                type="button"
                onClick={() => handleAction('save')}
              />
            </div>
          </div>

          <div className="rbd-surface">
            <div className="rbd-form">
              <div className="rbd-row rbd-row--photo">
                  <div
                    className="rbd-photo-uploader"
                    style={photoSize ? { width: `${photoSize}px`, height: `${photoSize}px` } : undefined}
                  >
                    <VegaImageUploader
                      className="rbd-photo-uploader__field"
                      actionTitle="Set Black & White Logo"
                      actionSubTitle="Only *.jpg, *.jpeg, *.png, *.gif"
                      accept=".jpg,.jpeg,.png,.gif"
                      width={photoSize ?? undefined}
                      height={photoSize ?? undefined}
                    />
                </div>
                  <div className="rbd-row--stack" ref={photoStackRef}>
                  <VegaInput
                    label="Name"
                    required
                    value={name}
                    onVegaChange={(event: Event) => setName(getVegaInputValue(event))}
                  />
                  <VegaInput
                    label="Short Name"
                    value={shortName}
                    onVegaChange={(event: Event) => setShortName(getVegaInputValue(event))}
                  />
                </div>
              </div>

              <VegaTextarea
                label="Description"
                value={description}
                rows={3}
                onVegaChange={(event: Event) => setDescription(getVegaInputValue(event))}
              />

              <div className="rbd-row rbd-row--quad">
                <VegaInput
                  label="SKU / Lookup"
                  value={sku}
                  onVegaChange={(event: Event) => setSku(getVegaInputValue(event))}
                />
                <VegaInputNumeric
                  label="Price"
                  prefixText="$"
                  value={price}
                  onVegaChange={(event: Event) => setPrice(getVegaNumericValue(event))}
                />
                <VegaInputNumeric
                  label="Cost"
                  prefixText="$"
                  value={cost}
                  onVegaChange={(event: Event) => setCost(getVegaNumericValue(event))}
                />
                <VegaInputSelect
                  label="Tax"
                  selectType="single"
                  source={TAX_SOURCE}
                  value={tax}
                  vegaDropdownProps={{ searchable: false }}
                  onVegaChange={(event: Event) => {
                    const next = getVegaSelectValue(event)
                    if (next) setTax(next)
                  }}
                />
              </div>

              <ToggleField
                label="Non Revenue"
                description="Sets this item as non-revenue for reporting purposes."
                checked={nonRevenue}
                onToggle={() => setNonRevenue((value) => !value)}
              />
              <ToggleField
                label="Alcohol"
                description="Flags this item as an alcohol purchase."
                checked={alcohol}
                onToggle={() => setAlcohol((value) => !value)}
              />
              <ToggleField
                label="Measurement"
                description="Flags this item as an alcohol purchase."
                checked={measurement}
                onToggle={() => setMeasurement((value) => !value)}
              />
              <ToggleField
                label="Prevent Discounts"
                description="Restricts this item from having its price changed via discount or adjustment."
                checked={preventDiscounts}
                onToggle={() => setPreventDiscounts((value) => !value)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ResponsiveButtonsDemo
