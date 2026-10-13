import { useEffect } from 'react'
import { CalendarClock, MapPin, Package, Truck, X } from 'lucide-react'
import { formatInventoryCurrency, getInventoryStatus } from '../../data/inventoryDemo.js'
import './InventoryDetails.css'

function InventoryDetails({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [item, onClose])

  if (!item) return null
  const status = getInventoryStatus(item)

  return (
    <div className="inventory-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="inventory-detail" role="dialog" aria-modal="true" aria-labelledby="inventory-detail-title">
        <header className="inventory-detail__header">
          <div><p className="eyebrow">Inventory item</p><h2 id="inventory-detail-title">{item.name}</h2></div>
          <button type="button" className="icon-button" aria-label="Close item details" onClick={onClose}><X size={17} /></button>
        </header>
        <span className={`inventory-status inventory-status--${status.key}`}>{status.label}</span>
        <p className="inventory-detail__sku">{item.sku} <span>·</span> {item.category}</p>
        <section className="inventory-detail__quantity">
          <span>On-hand quantity</span>
          <strong>{item.onHand.toLocaleString()} <small>{item.unit}</small></strong>
          <div><i style={{ width: `${Math.min(100, (item.onHand / Math.max(item.reorderPoint * 2, 1)) * 100)}%` }} /></div>
          <small>Reorder point: {item.reorderPoint.toLocaleString()} {item.unit}</small>
        </section>
        <dl className="inventory-detail__list">
          <div><dt><Package size={15} /> Estimated value</dt><dd>{formatInventoryCurrency(item.onHand * item.unitCost)}</dd></div>
          <div><dt><MapPin size={15} /> Storage location</dt><dd>{item.location}</dd></div>
          <div><dt><Truck size={15} /> Supplier</dt><dd>{item.supplier}</dd></div>
          <div><dt><CalendarClock size={15} /> Last updated</dt><dd>{new Date(`${item.updatedAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</dd></div>
        </dl>
        <div className="inventory-detail__notice">Read-only demo record. Editing stock requires a connected inventory service.</div>
      </aside>
    </div>
  )
}

export default InventoryDetails