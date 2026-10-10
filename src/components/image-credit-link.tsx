import { X } from 'lucide-react'
import { useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import type { ImageCredit } from '@/assets/catalog-assets'

type ImageCreditLinkProps = {
  credit: ImageCredit
  /** Our own (cropped) copy, shown if the full image can't be loaded. */
  imageSrc: string
}

/**
 * The full, uncropped artwork, served from the archive like the recordings. Commons only
 * scales to fixed widths, so these two keep phones on the smaller file.
 */
function fullImage(source: string) {
  const file = source.split('/wiki/File:')[1]
  if (!file) {
    return undefined
  }

  const at = (width: number) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`
  return { src: at(1280), srcSet: `${at(1280)} 1280w, ${at(1920)} 1920w` }
}

const subscribeToNothing = () => () => {}

/**
 * Credit pill for a public-domain image. It opens the artwork in a viewer rather than
 * leaving the site; the source is one link away inside it. The artwork title is hidden
 * on narrow screens.
 */
export function ImageCreditLink({ credit, imageSrc }: ImageCreditLinkProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  // The viewer lives in a portal on document.body, which only exists in the browser. React
  // uses the server value (false) while hydrating, so the first render matches the
  // prerendered HTML, then renders the portal.
  const mounted = useSyncExternalStore(subscribeToNothing, () => true, () => false)
  const full = fullImage(credit.source)
  const name = credit.title ?? 'Portrait'

  const close = () => dialogRef.current?.close()

  return (
    <>
      <button
        className="image-credit"
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true)
          dialogRef.current?.showModal()
        }}
      >
        {credit.title ? <span className="image-credit-title">{credit.title} - </span> : 'Portrait: '}
        {credit.artist}, {credit.year}
      </button>

      {/* Rendered at the document root so the hero's image styles don't reach the viewer. */}
      {mounted && createPortal(
        <dialog
          className="image-viewer"
          ref={dialogRef}
          aria-label={`${name}, ${credit.artist}`}
          onClose={() => setOpen(false)}
          // A click on the backdrop lands on the dialog itself.
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              close()
            }
          }}
        >
          {open ? (
            <figure>
              <img
                alt={credit.title ? `${credit.title} by ${credit.artist}` : `Portrait by ${credit.artist}`}
                src={failed || !full ? imageSrc : full.src}
                srcSet={failed || !full ? undefined : full.srcSet}
                sizes="94vw"
                onError={() => setFailed(true)}
              />
              <figcaption>
                <span>
                  <strong>{name}</strong> {credit.artist}, {credit.year}
                </span>
                <a href={credit.source} target="_blank" rel="noreferrer">
                  View source
                </a>
              </figcaption>
            </figure>
          ) : null}
          <button className="image-viewer-close" type="button" aria-label="Close" onClick={close}>
            <X size={18} />
          </button>
        </dialog>,
        document.body,
      )}
    </>
  )
}
