import { Check, ChevronsUpDown, Languages } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router'
import { locale, localeNames, locales, localizePath, rememberLocale, t } from '@/i18n'

/** Picks the page's language. Each choice is a link that reloads this page in that language. */
export function LanguagePicker() {
  const { pathname, search } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    rootRef.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus()
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [isOpen])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      setIsOpen(false)
      buttonRef.current?.focus()
      return
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return
    }

    const links = [...(rootRef.current?.querySelectorAll<HTMLElement>('.language-option') ?? [])]
    const index = links.indexOf(document.activeElement as HTMLElement)
    if (index === -1) {
      return
    }

    event.preventDefault()
    const step = event.key === 'ArrowDown' ? 1 : -1
    links[(index + step + links.length) % links.length].focus()
  }

  return (
    <div
      className="language-picker"
      ref={rootRef}
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      {isOpen ? (
        <ul className="language-menu" id={menuId} aria-label={t('language')}>
          {locales.map((option) => (
            <li key={option}>
              <a
                className="language-option"
                href={localizePath(`${pathname}${search}`, option)}
                hrefLang={option}
                lang={option}
                aria-current={option === locale ? 'true' : undefined}
                onClick={() => rememberLocale(option)}
              >
                <span>{localeNames[option]}</span>
                {option === locale ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : null}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <button
        className="sidebar-link language-trigger"
        type="button"
        ref={buttonRef}
        aria-label={`${t('language')}: ${localeNames[locale]}`}
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Languages size={17} strokeWidth={1.9} aria-hidden="true" />
        <span>{localeNames[locale]}</span>
        <ChevronsUpDown className="language-chevron" size={15} strokeWidth={1.9} aria-hidden="true" />
      </button>
    </div>
  )
}
