import { useState } from 'react'
import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import PurchaseDetails from '../../components/PurchaseDetails/PurchaseDetails.jsx'
import PurchaseSummary from '../../components/PurchaseSummary/PurchaseSummary.jsx'
import PurchaseTable from '../../components/PurchaseTable/PurchaseTable.jsx'
import { formatPurchaseCurrency, getPurchaseTotal, purchaseDemoLabel, purchaseDemoOrders } from '../../data/purchaseDemo.js'
import './PurchasesPage.css'

const suppliers = [...new Set(purchaseDemoOrders.map((order) => order.supplier))].sort((first, second) => first.localeCompare(second))
const statuses = [...new Set(purchaseDemoOrders.map((order) => order.status))]

function PurchasesPage() {
  const [query, setQuery] = useState('')
  const [supplier, setSupplier] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('recent')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredOrders = purchaseDemoOrders.filter((order) => {
    const itemText = order.items.map((item) => `${item.name} ${item.sku}`).join(' ')
    const matchesQuery = !normalizedQuery || [order.number, order.supplier, order.status, order.requestedBy, itemText]
      .some((field) => field.toLowerCase().includes(normalizedQuery))
    const matchesSupplier = supplier === 'all' || order.supplier === supplier
    const matchesStatus = status === 'all' || order.status === status
    return matchesQuery && matchesSupplier && matchesStatus
  })

  const sortedOrders = [...filteredOrders].sort((first, second) => {
    if (sort === 'value-high') return getPurchaseTotal(second) - getPurchaseTotal(first)
    if (sort === 'expected') return first.expectedAt.localeCompare(second.expectedAt)
    if (sort === 'oldest') return first.orderedAt.localeCompare(second.orderedAt)
    return second.orderedAt.localeCompare(first.orderedAt)
  })

  const hasFilters = Boolean(query || supplier !== 'all' || status !== 'all' || sort !== 'recent')

  function resetFilters() {
    setQuery('')
    setSupplier('all')
    setStatus('all')
    setSort('recent')
  }

  function exportVisibleOrders() {
    const columns = ['Purchase order', 'Supplier', 'Status', 'Items', 'Ordered', 'Expected', 'Order value', 'Requested by', 'Destination']
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = sortedOrders.map((order) => [
      order.number,
      order.supplier,
      order.status,
      order.items.map((item) => `${item.quantity} ${item.unit} ${item.name}`).join('; '),
      order.orderedAt,
      order.expectedAt,
      formatPurchaseCurrency(getPurchaseTotal(order)),
      order.requestedBy,
      order.destination,
    ])
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-purchases-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  return (
    <div className="page-shell purchases-page">
      <header className="page-header purchases-page__header">
        <div>
          <p className="eyebrow">PROCUREMENT</p>
          <h1>Purchases</h1>
          <p className="purchases-page__subtitle">Review supplier orders, expected deliveries, and sample purchase commitments.</p>
        </div>
        <div className="page-header__actions purchases-page__actions">
          <button type="button" className="btn btn-secondary" onClick={exportVisibleOrders} disabled={!sortedOrders.length}><Download size={16} /> Export CSV</button>
          <button type="button" className="btn btn-primary" disabled title="Purchase order creation will be available when the purchasing service is connected."><Plus size={16} /> New purchase order</button>
        </div>
      </header>

      <div className="notice-box purchases-page__notice"><strong>Demo purchase orders · read only.</strong> {purchaseDemoLabel}</div>

      <PurchaseSummary orders={filteredOrders} />

      <section className="panel purchases-workspace" aria-labelledby="purchases-table-heading">
        <div className="purchases-workspace__heading">
          <div><p className="eyebrow eyebrow--muted">SUPPLIER ORDERS</p><h2>Purchase register</h2></div>
          <span className="purchases-result-count">{sortedOrders.length} of {purchaseDemoOrders.length} orders</span>
        </div>

        <div className="purchases-toolbar">
          <label className="purchases-search">
            <Search size={16} />
            <span className="visually-hidden">Search purchase orders</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search PO, supplier, material..." />
          </label>
          <label className="purchases-filter"><span>Supplier</span><select value={supplier} onChange={(event) => setSupplier(event.target.value)}>
            <option value="all">All suppliers</option>{suppliers.map((supplierName) => <option key={supplierName} value={supplierName}>{supplierName}</option>)}
          </select></label>
          <label className="purchases-filter"><span>Order status</span><select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>{statuses.map((orderStatus) => <option key={orderStatus} value={orderStatus}>{orderStatus}</option>)}
          </select></label>
          <label className="purchases-filter purchases-filter--sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="recent">Recently ordered</option><option value="oldest">Oldest order</option><option value="expected">Soonest expected</option><option value="value-high">Highest value</option>
          </select></label>
          {hasFilters && <button type="button" className="purchases-reset" onClick={resetFilters}><RotateCcw size={14} /> Reset</button>}
        </div>

        <PurchaseTable orders={sortedOrders} onSelect={setSelectedOrder} />
      </section>

      <PurchaseDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  )
}

export default PurchasesPage