import type { ImageCredit } from '@/assets/catalog-assets'

type ImageCreditLinkProps = {
  credit: ImageCredit
}

/** Credit pill for a public-domain image. The artwork title is hidden on narrow screens. */
export function ImageCreditLink({ credit }: ImageCreditLinkProps) {
  return (
    <a className="image-credit" href={credit.source} target="_blank" rel="noreferrer">
      {credit.title ? <span className="image-credit-title">{credit.title} - </span> : 'Portrait: '}
      {credit.artist}, {credit.year}
    </a>
  )
}
