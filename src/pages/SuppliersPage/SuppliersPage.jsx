import { useState } from 'react'
import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import SupplierDetails from '../../components/SupplierDetails/SupplierDetails.jsx'
import SupplierSummary from '../../components/SupplierSummary/SupplierSummary.jsx'
import SupplierTable from '../../components/SupplierTable/SupplierTable.jsx'
import { formatSupplierCurrency, getSupplierActivity, supplierDemoLabel, supplierDemoRecords } from '../../data/supplierDemo.js'
import './SuppliersPage.css'

const categories = [...new Set(supplierDemoRecords.flatMap((supplier) => supplier.categories))].sort((first, second) => first.localeCompare(second))

function SuppliersPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [activity, setActivity] = useState('all')
  const [sort, setSort] = useState('name')
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredSuppliers = supplierDemoRecords.filter((supplier) => {
    const productText = supplier.products.map((product) => `${product.name} ${product.sku} ${product.category}`).join(' ')
    const orderText = supplier.purchaseOrders.map((order) => order.number).join(' ')
    const matchesQuery = !normalizedQuery || [supplier.name, productText, orderText].some((field) => field.toLowerCase().includes(normalizedQuery))
    const matchesCategory = category === 'all' || supplier.categories.includes(category)
    const matchesActivity = activity === 'all' || getSupplierActivity(supplier).key === activity
    return matchesQuery && matchesCategory && matchesActivity
  })

  const sortedSuppliers = [...filteredSuppliers].sort((first, second) => {
    if (sort === 'products-high') return second.products.length - first.products.length || first.name.localeCompare(second.name)
    if (sort === 'orders-high') return second.purchaseOrders.length - first.purchaseOrders.length || first.name.localeCompare(second.name)
    if (sort === 'recent') return (second.lastOrderAt || '').localeCompare(first.lastOrderAt || '') || first.name.localeCompare(second.name)
    return first.name.localeCompare(second.name)
  })

  const hasFilters = Boolean(query || category !== 'all' || activity !== 'all' || sort !== 'name')

  function resetFilters() {
    setQuery('')
    setCategory('all')
    setActivity('all')
    setSort('name')
  }

  function exportVisibleSuppliers() {
    const columns = ['Supplier', 'Materials supplied', 'Product count', 'Catalog SKUs', 'Sample purchase orders', 'Open orders', 'Last sample order', 'Sample order value', 'Activity']
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = sortedSuppliers.map((supplier) => [
      supplier.name,
      supplier.categories.join('; '),
      supplier.products.length,
      supplier.products.map((product) => product.sku).join('; '),
      supplier.purchaseOrders.map((order) => order.number).join('; '),
      supplier.openOrderCount,
      supplier.lastOrderAt || 'No sample order',
      formatSupplierCurrency(supplier.totalOrderValue),
      getSupplierActivity(supplier).label,
    ])
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-suppliers-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  return (
    <div className="page-shell suppliers-page">
      <header className="page-header suppliers-page__header">
        <div><p className="eyebrow">SUPPLY NETWORK</p><h1>Suppliers</h1><p className="suppliers-page__subtitle">Review which partners supply your catalog and the purchase activity represented in the demo.</p></div>
        <div className="page-header__actions suppliers-page__actions">
          <button type="button" className="btn btn-secondary" onClick={exportVisibleSuppliers} disabled={!sortedSuppliers.length}><Download size={16} /> Export CSV</button>
          <button type="button" className="btn btn-primary" disabled title="Supplier creation will be available when the supplier service is connected."><Plus size={16} /> Add supplier</button>
        </div>
      </header>

      <div className="notice-box suppliers-page__notice"><strong>Demo supplier directory · read only.</strong> {supplierDemoLabel}</div>

      <SupplierSummary suppliers={filteredSuppliers} />

      <section className="panel suppliers-workspace" aria-labelledby="suppliers-table-heading">
        <div className="suppliers-workspace__heading">
          <div><p className="eyebrow eyebrow--muted">PARTNER DIRECTORY</p><h2>Supplier coverage</h2></div>
          <span className="suppliers-result-count">{sortedSuppliers.length} of {supplierDemoRecords.length} suppliers</span>
        </div>

        <div className="suppliers-toolbar">
          <label className="suppliers-search"><Search size={16} /><span className="visually-hidden">Search suppliers</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search supplier, product, SKU..." /></label>
          <label className="suppliers-filter"><span>Material category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}</select></label>
          <label className="suppliers-filter"><span>Sample activity</span><select value={activity} onChange={(event) => setActivity(event.target.value)}><option value="all">All suppliers</option><option value="open">Open orders</option><option value="history">Purchase history</option><option value="catalog">Catalog only</option></select></label>
          <label className="suppliers-filter suppliers-filter--sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Supplier name</option><option value="products-high">Most catalog products</option><option value="orders-high">Most sample orders</option><option value="recent">Recent sample activity</option></select></label>
          {hasFilters && <button type="button" className="suppliers-reset" onClick={resetFilters}><RotateCcw size={14} /> Reset</button>}
        </div>

        <SupplierTable suppliers={sortedSuppliers} onSelect={setSelectedSupplier} />
      </section>

      <SupplierDetails supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
    </div>
  )
}

export default SuppliersPage