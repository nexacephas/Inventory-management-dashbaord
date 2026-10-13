import { Ban, CircleCheck, Package, Tags } from 'lucide-react'
import './ProductSummary.css'

function ProductSummary({ products }) {
  const activeCount = products.filter((product) => product.status === 'Active').length
  const inactiveCount = products.length - activeCount
  const categoryCount = new Set(products.map((product) => product.category)).size
  const metrics = [
    { label: 'Products shown', value: products.length, note: 'Catalog records in view', icon: Package, tone: 'green' },
    { label: 'Active products', value: activeCount, note: 'Available in this demo catalog', icon: CircleCheck, tone: 'blue' },
    { label: 'Inactive products', value: inactiveCount, note: 'Not available for new activity', icon: Ban, tone: 'amber' },
    { label: 'Categories', value: categoryCount, note: 'Represented in this sample', icon: Tags, tone: 'neutral' },
  ]

  return (
    <section className="product-summary" aria-label="Product catalog summary">
      {metrics.map(({ label, value, note, icon: Icon, tone }) => (
        <article className="product-summary__card" key={label}>
          <span className={`product-summary__icon product-summary__icon--${tone}`}><Icon size={18} /></span>
          <div className="product-summary__copy"><span>{label}</span><strong>{value.toLocaleString()}</strong><small>{note}</small></div>
        </article>
      ))}
    </section>
  )
}

export default ProductSummary