import { useState } from 'react'
import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import SalesDetails from '../../components/SalesDetails/SalesDetails.jsx'
import SalesSummary from '../../components/SalesSummary/SalesSummary.jsx'
import SalesTable from '../../components/SalesTable/SalesTable.jsx'
import { formatSalesCurrency, getSalesOrderTotal, getSalesOutstanding, salesDemoLabel, salesDemoOrders } from '../../data/salesDemo.js'
import './SalesPage.css'

const customers = [...new Set(salesDemoOrders.map((order) => order.customer))].sort((first, second) => first.localeCompare(second))
const orderStatuses = [...new Set(salesDemoOrders.map((order) => order.status))]
const paymentStatuses = [...new Set(salesDemoOrders.map((order) => order.paymentStatus))]

function SalesPage() {
  const [query, setQuery] = useState('')
  const [customer, setCustomer] = useState('all')
  const [orderStatus, setOrderStatus] = useState('all')
  const [paymentStatus, setPaymentStatus] = useState('all')
  const [sort, setSort] = useState('recent')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredOrders = salesDemoOrders.filter((order) => {
    const itemText = order.items.map((item) => `${item.name} ${item.sku}`).join(' ')
    const matchesQuery = !normalizedQuery || [order.number, order.customer, order.status, order.paymentStatus, itemText]
      .some((field) => field.toLowerCase().includes(normalizedQuery))
    const matchesCustomer = customer === 'all' || order.customer === customer
    const matchesOrderStatus = orderStatus === 'all' || order.status === orderStatus
    const matchesPaymentStatus = paymentStatus === 'all' || order.paymentStatus === paymentStatus
    return matchesQuery && matchesCustomer && matchesOrderStatus && matchesPaymentStatus
  })

  const sortedOrders = [...filteredOrders].sort((first, second) => {
    if (sort === 'oldest') return first.soldAt.localeCompare(second.soldAt)
    if (sort === 'value-high') return getSalesOrderTotal(second) - getSalesOrderTotal(first)
    if (sort === 'balance-high') return getSalesOutstanding(second) - getSalesOutstanding(first)
    return second.soldAt.localeCompare(first.soldAt)
  })

  const hasFilters = Boolean(query || customer !== 'all' || orderStatus !== 'all' || paymentStatus !== 'all' || sort !== 'recent')

  function resetFilters() {
    setQuery('')
    setCustomer('all')
    setOrderStatus('all')
    setPaymentStatus('all')
    setSort('recent')
  }

  function exportVisibleSales() {
    const columns = ['Sale', 'Customer', 'Order status', 'Payment status', 'Items', 'Date', 'Sale value', 'Amount paid', 'Outstanding balance', 'Recorded by']
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = sortedOrders.map((order) => [
      order.number,
      order.customer,
      order.status,
      order.paymentStatus,
      order.items.map((item) => `${item.quantity} ${item.unit} ${item.name}`).join('; '),
      order.soldAt,
      formatSalesCurrency(getSalesOrderTotal(order)),
      formatSalesCurrency(order.amountPaid),
      formatSalesCurrency(getSalesOutstanding(order)),
      order.recordedBy,
    ])
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-sales-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  return (
    <div className="page-shell sales-page">
      <header className="page-header sales-page__header">
        <div><p className="eyebrow">CUSTOMER ORDERS</p><h1>Sales</h1><p className="sales-page__subtitle">Review customer orders, recorded payments, and balances across materials sales.</p></div>
        <div className="page-header__actions sales-page__actions">
          <button type="button" className="btn btn-secondary" onClick={exportVisibleSales} disabled={!sortedOrders.length}><Download size={16} /> Export CSV</button>
          <button type="button" className="btn btn-primary" disabled title="Sale creation will be available when the sales service is connected."><Plus size={16} /> Record sale</button>
        </div>
      </header>

      <div className="notice-box sales-page__notice"><strong>Demo sales · read only.</strong> {salesDemoLabel}</div>

      <SalesSummary orders={filteredOrders} />

      <section className="panel sales-workspace" aria-labelledby="sales-table-heading">
        <div className="sales-workspace__heading">
          <div><p className="eyebrow eyebrow--muted">SALES REGISTER</p><h2>Customer orders</h2></div>
          <span className="sales-result-count">{sortedOrders.length} of {salesDemoOrders.length} sales</span>
        </div>

        <div className="sales-toolbar">
          <label className="sales-search"><Search size={16} /><span className="visually-hidden">Search sales</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sale, customer, material..." /></label>
          <label className="sales-filter"><span>Customer</span><select value={customer} onChange={(event) => setCustomer(event.target.value)}><option value="all">All customers</option>{customers.map((customerName) => <option key={customerName} value={customerName}>{customerName}</option>)}</select></label>
          <label className="sales-filter"><span>Order status</span><select value={orderStatus} onChange={(event) => setOrderStatus(event.target.value)}><option value="all">All order statuses</option>{orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label className="sales-filter"><span>Payment</span><select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)}><option value="all">All payment statuses</option>{paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          <label className="sales-filter sales-filter--sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recent">Most recent</option><option value="oldest">Oldest sale</option><option value="value-high">Highest sale value</option><option value="balance-high">Highest balance</option></select></label>
          {hasFilters && <button type="button" className="sales-reset" onClick={resetFilters}><RotateCcw size={14} /> Reset</button>}
        </div>

        <SalesTable orders={sortedOrders} onSelect={setSelectedOrder} />
      </section>

      <SalesDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  )
}

export default SalesPage