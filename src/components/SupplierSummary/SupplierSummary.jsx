import { Boxes, ClipboardList, CircleDollarSign, Truck } from 'lucide-react'
import { formatSupplierCurrency } from '../../data/supplierDemo.js'
import './SupplierSummary.css'

function SupplierSummary({ suppliers }) {
  const productCount = suppliers.reduce((total, supplier) => total + supplier.products.length, 0)
  const openOrders = suppliers.reduce((total, supplier) => total + supplier.openOrderCount, 0)
  const orderValue = suppliers.reduce((total, supplier) => total + supplier.totalOrderValue, 0)
  const metrics = [
    { label: 'Suppliers in view', value: suppliers.length, note: 'From the sample catalog', icon: Truck, tone: 'green' },
    { label: 'Linked products', value: productCount, note: 'Catalog records by supplier', icon: Boxes, tone: 'blue' },
    { label: 'Open sample orders', value: openOrders, note: 'Draft, approval, or transit', icon: ClipboardList, tone: 'amber' },
    { label: 'Sample order value', value: formatSupplierCurrency(orderValue), note: 'Illustrative order history', icon: CircleDollarSign, tone: 'neutral' },
  ]

  return (
    <section className="supplier-summary" aria-label="Supplier summary">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => (
        <article className="supplier-summary__card" key={label}>
          <span className={`supplier-summary__icon supplier-summary__icon--${tone}`}><Icon size={18} /></span>
          <div className="supplier-summary__copy"><span>{label}</span><strong>{typeof value === 'number' ? value.toLocaleString() : value}</strong><small>{note}</small></div>
        </article>
      ))}
    </section>
  )
}

export default SupplierSummary