import { CircleDollarSign, Layers3, Package, ShieldAlert } from 'lucide-react'
import { formatInventoryCurrency, getInventoryStatus } from '../../data/inventoryDemo.js'
import './InventorySummary.css'

function InventorySummary({ items }) {
  const totalValue = items.reduce((total, item) => total + item.onHand * item.unitCost, 0)
  const needsRestock = items.filter((item) => getInventoryStatus(item).key !== 'healthy').length
  const categories = new Set(items.map((item) => item.category)).size
  const metrics = [
    { label: 'Products in view', value: items.length.toLocaleString(), note: 'Demo catalog items', icon: Package, tone: 'green' },
    { label: 'Estimated stock value', value: formatInventoryCurrency(totalValue), note: 'On-hand quantity × sample cost', icon: CircleDollarSign, tone: 'blue' },
    { label: 'Restock attention', value: needsRestock.toLocaleString(), note: 'At or below reorder point', icon: ShieldAlert, tone: 'amber' },
    { label: 'Material categories', value: categories.toLocaleString(), note: 'Categories in this sample', icon: Layers3, tone: 'neutral' },
  ]

  return (
    <section className="inventory-summary" aria-label="Inventory summary">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => (
        <article className="inventory-summary__card" key={label}>
          <span className={`inventory-summary__icon inventory-summary__icon--${tone}`}><Icon size={18} /></span>
          <div className="inventory-summary__copy">
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </div>
        </article>
      ))}
    </section>
  )
}

export default InventorySummary