import { useEffect } from 'react'
import { CalendarClock, Package, ShoppingCart, X } from 'lucide-react'
import { formatSupplierCurrency, getSupplierActivity } from '../../data/supplierDemo.js'
import './SupplierDetails.css'

function SupplierDetails({ supplier, onClose }) {
  useEffect(() => {
    if (!supplier) return undefined
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
  }, [supplier, onClose])

  if (!supplier) return null
  const activity = getSupplierActivity(supplier)

  return (
    <div className="supplier-detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="supplier-detail" role="dialog" aria-modal="true" aria-labelledby="supplier-detail-title">
        <header className="supplier-detail__header"><div><p className="eyebrow">Supplier record</p><h2 id="supplier-detail-title">{supplier.name}</h2></div><button type="button" className="icon-button" aria-label="Close supplier details" onClick={onClose}><X size={17} /></button></header>
        <span className={`supplier-activity supplier-activity--${activity.key}`}>{activity.label}</span>
        <div className="supplier-detail__metrics"><div><strong>{supplier.products.length}</strong><span>Linked products</span></div><div><strong>{supplier.purchaseOrders.length}</strong><span>Sample purchase orders</span></div><div><strong>{supplier.openOrderCount}</strong><span>Open sample orders</span></div></div>
        <section className="supplier-detail__section"><div className="supplier-detail__section-title"><Package size={16} /><h3>Catalog coverage</h3></div><div className="supplier-detail__products">{supplier.products.map((product) => <div key={product.sku}><span><strong>{product.name}</strong><small>{product.sku} · {product.category}</small></span><span>{product.unit}</span></div>)}</div></section>
        <section className="supplier-detail__section"><div className="supplier-detail__section-title"><ShoppingCart size={16} /><h3>Sample order history</h3></div>{supplier.purchaseOrders.length ? <div className="supplier-detail__orders">{supplier.purchaseOrders.map((order) => <div key={order.number}><span><strong>{order.number}</strong><small>{order.status}</small></span><span>{formatSupplierCurrency(order.items.reduce((total, item) => total + item.quantity * item.unitCost, 0))}</span></div>)}</div> : <p className="supplier-detail__empty">No matching sample purchase orders.</p>}</section>
        <div className="supplier-detail__last-order"><CalendarClock size={15} /><span>Last sample order</span><strong>{supplier.lastOrderAt ? new Date(`${supplier.lastOrderAt}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : 'None in sample data'}</strong></div>
        <div className="supplier-detail__notice">Read-only supplier sample. No contact information or live supplier service is configured.</div>
      </aside>
    </div>
  )
}

export default SupplierDetails