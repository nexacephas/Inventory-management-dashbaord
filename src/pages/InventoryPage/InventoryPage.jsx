import { useState } from 'react'
import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import InventoryDetails from '../../components/InventoryDetails/InventoryDetails.jsx'
import InventorySummary from '../../components/InventorySummary/InventorySummary.jsx'
import InventoryTable from '../../components/InventoryTable/InventoryTable.jsx'
import { getInventoryStatus, inventoryDemoItems, inventoryDemoLabel } from '../../data/inventoryDemo.js'
import './InventoryPage.css'

const categories = [...new Set(inventoryDemoItems.map((item) => item.category))].sort((first, second) => first.localeCompare(second))

function InventoryPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('name')
  const [selectedItem, setSelectedItem] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = inventoryDemoItems.filter((item) => {
    const matchesQuery = !normalizedQuery || [item.name, item.sku, item.category, item.supplier, item.location]
      .some((field) => field.toLowerCase().includes(normalizedQuery))
    const matchesCategory = category === 'all' || item.category === category
    const matchesStatus = status === 'all' || getInventoryStatus(item).key === status
    return matchesQuery && matchesCategory && matchesStatus
  })

  const sortedItems = [...filteredItems].sort((first, second) => {
    if (sort === 'stock-low') return first.onHand - second.onHand
    if (sort === 'stock-high') return second.onHand - first.onHand
    if (sort === 'value-high') return (second.onHand * second.unitCost) - (first.onHand * first.unitCost)
    if (sort === 'updated') return second.updatedAt.localeCompare(first.updatedAt)
    return first.name.localeCompare(second.name)
  })

  const hasFilters = Boolean(query || category !== 'all' || status !== 'all' || sort !== 'name')

  function resetFilters() {
    setQuery('')
    setCategory('all')
    setStatus('all')
    setSort('name')
  }

  function exportVisibleItems() {
    const columns = ['SKU', 'Product', 'Category', 'On hand', 'Unit', 'Reorder point', 'Unit cost', 'Location', 'Supplier', 'Status', 'Last updated']
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = sortedItems.map((item) => [
      item.sku,
      item.name,
      item.category,
      item.onHand,
      item.unit,
      item.reorderPoint,
      item.unitCost,
      item.location,
      item.supplier,
      getInventoryStatus(item).label,
      item.updatedAt,
    ])
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-inventory-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  return (
    <div className="page-shell inventory-page">
      <header className="page-header inventory-page__header">
        <div>
          <p className="eyebrow">BUILDING MATERIALS</p>
          <h1>Inventory</h1>
          <p className="inventory-page__subtitle">Track quantities, reorder points, and warehouse locations across your materials.</p>
        </div>
        <div className="page-header__actions inventory-page__actions">
          <button type="button" className="btn btn-secondary" onClick={exportVisibleItems} disabled={!sortedItems.length}>
            <Download size={16} /> Export CSV
          </button>
          <button type="button" className="btn btn-primary" disabled title="Product creation will be available when the inventory service is connected.">
            <Plus size={16} /> Add product
          </button>
        </div>
      </header>

      <div className="notice-box inventory-page__notice">
        <strong>Demo inventory · read only.</strong> {inventoryDemoLabel}
      </div>

      <InventorySummary items={filteredItems} />

      <section className="panel inventory-workspace" aria-labelledby="inventory-table-heading">
        <div className="inventory-workspace__heading">
          <div>
            <p className="eyebrow eyebrow--muted">STOCK REGISTER</p>
            <h2 id="inventory-table-heading">Materials on hand</h2>
          </div>
          <span className="inventory-result-count">{sortedItems.length} of {inventoryDemoItems.length} items</span>
        </div>

        <div className="inventory-toolbar">
          <label className="inventory-search">
            <Search size={16} />
            <span className="visually-hidden">Search inventory</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, SKU, supplier..." />
          </label>
          <label className="inventory-filter">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}
            </select>
          </label>
          <label className="inventory-filter">
            <span>Stock status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All statuses</option>
              <option value="healthy">In stock</option>
              <option value="low">Reorder needed</option>
              <option value="out">Out of stock</option>
            </select>
          </label>
          <label className="inventory-filter inventory-filter--sort">
            <span>Sort by</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="name">Product name</option>
              <option value="stock-low">Lowest stock</option>
              <option value="stock-high">Highest stock</option>
              <option value="value-high">Highest value</option>
              <option value="updated">Recently updated</option>
            </select>
          </label>
          {hasFilters && <button type="button" className="inventory-reset" onClick={resetFilters}><RotateCcw size={14} /> Reset</button>}
        </div>

        <InventoryTable items={sortedItems} onSelect={setSelectedItem} />
      </section>

      <InventoryDetails item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}

export default InventoryPage