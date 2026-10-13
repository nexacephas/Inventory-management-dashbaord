import { useEffect } from 'react'
import { CalendarClock, MapPin, Package, Truck, X } from 'lucide-react'
import { formatProductCurrency } from '../../data/productDemo.js'
import './ProductDetails.css'

function ProductDetails({ product, onClose }) {
  useEffect(() => {
    if (!product) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="product-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="product-detail" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
        <header className="product-detail__header">
          <div><p className="eyebrow">Catalog record</p><h2 id="product-detail-title">{product.name}</h2></div>
          <button type="button" className="icon-button" aria-label="Close product details" onClick={onClose}><X size={17} /></button>
        </header>
        <span className={`product-status product-status--${product.status.toLowerCase()}`}>{product.status}</span>
        <p className="product-detail__sku">{product.sku} <span>·</span> {product.category}</p>
        <p className="product-detail__description">{product.description}</p>
        <dl className="product-detail__list">
          <div><dt><Package size={15} /> Unit of measure</dt><dd>{product.unit}</dd></div>
          <div><dt><Package size={15} /> Sample unit cost</dt><dd>{formatProductCurrency(product.unitCost)}</dd></div>
          <div><dt><Package size={15} /> Demo stock balance</dt><dd>{product.onHand.toLocaleString()} {product.unit}</dd></div>
          <div><dt><Truck size={15} /> Supplier</dt><dd>{product.supplier}</dd></div>
          <div><dt><MapPin size={15} /> Default location</dt><dd>{product.location}</dd></div>
          <div><dt><CalendarClock size={15} /> Last updated</dt><dd>{new Date(`${product.updatedAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div>
        </dl>
        <div className="product-detail__notice">Read-only demo catalog. Product edits and pricing changes require a connected product service.</div>
      </aside>
    </div>
  )
}

export default ProductDetails