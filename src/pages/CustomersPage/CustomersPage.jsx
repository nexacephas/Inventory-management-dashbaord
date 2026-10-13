import { useState } from 'react'
import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import CustomerDetails from '../../components/CustomerDetails/CustomerDetails.jsx'
import CustomerSummary from '../../components/CustomerSummary/CustomerSummary.jsx'
import CustomerTable from '../../components/CustomerTable/CustomerTable.jsx'
import { formatCustomerCurrency, getCustomerActivity, customerDemoLabel, customerDemoRecords } from '../../data/customerDemo.js'
import './CustomersPage.css'

const categories = [...new Set(customerDemoRecords.flatMap((customer) => customer.categories))].sort((first, second) => first.localeCompare(second))

function CustomersPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [activity, setActivity] = useState('all')
  const [sort, setSort] = useState('name')
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredCustomers = customerDemoRecords.filter((customer) => {
    const orderText = customer.orders.map((order) => `${order.number} ${order.items.map((item) => `${item.name} ${item.sku}`).join(' ')}`).join(' ')
    const matchesQuery = !normalizedQuery || [customer.name, orderText, customer.categories.join(' ')].some((field) => field.toLowerCase().includes(normalizedQuery))
    const matchesCategory = category === 'all' || customer.categories.includes(category)
    const matchesActivity = activity === 'all' || getCustomerActivity(customer).key === activity
    return matchesQuery && matchesCategory && matchesActivity
  })

  const sortedCustomers = [...filteredCustomers].sort((first, second) => {
    if (sort === 'balance-high') return second.outstandingBalance - first.outstandingBalance || first.name.localeCompare(second.name)
    if (sort === 'orders-high') return second.orders.length - first.orders.length || first.name.localeCompare(second.name)
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

  function exportVisibleCustomers() {
    const columns = ['Customer', 'Materials purchased', 'Sales orders', 'Order references', 'Billed value', 'Collected', 'Outstanding balance', 'Last order', 'Account activity']
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = sortedCustomers.map((customer) => [
      customer.name,
      customer.categories.join('; '),
      customer.orders.length,
      customer.orders.map((order) => order.number).join('; '),
      formatCustomerCurrency(customer.billedValue),
      formatCustomerCurrency(customer.collectedValue),
      formatCustomerCurrency(customer.outstandingBalance),
      customer.lastOrderAt || 'No sample order',
      getCustomerActivity(customer).label,
    ])
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-customers-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  return (
    <div className="page-shell customers-page">
      <header className="page-header customers-page__header">
        <div><p className="eyebrow">CUSTOMER ACCOUNTS</p><h1>Customers</h1><p className="customers-page__subtitle">Review customer relationships, materials purchased, and sample account balances.</p></div>
        <div className="page-header__actions customers-page__actions">
          <button type="button" className="btn btn-secondary" onClick={exportVisibleCustomers} disabled={!sortedCustomers.length}><Download size={16} /> Export CSV</button>
          <button type="button" className="btn btn-primary" disabled title="Customer creation will be available when the customer service is connected."><Plus size={16} /> Add customer</button>
        </div>
      </header>

      <div className="notice-box customers-page__notice"><strong>Demo customer directory · read only.</strong> {customerDemoLabel}</div>

      <CustomerSummary customers={filteredCustomers} />

      <section className="panel customers-workspace" aria-labelledby="customers-table-heading">
        <div className="customers-workspace__heading"><div><p className="eyebrow eyebrow--muted">CUSTOMER REGISTER</p><h2>Accounts and activity</h2></div><span className="customers-result-count">{sortedCustomers.length} of {customerDemoRecords.length} customers</span></div>
        <div className="customers-toolbar">
          <label className="customers-search"><Search size={16} /><span className="visually-hidden">Search customers</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customer, sale, material..." /></label>
          <label className="customers-filter"><span>Material category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}</select></label>
          <label className="customers-filter"><span>Account activity</span><select value={activity} onChange={(event) => setActivity(event.target.value)}><option value="all">All activity</option><option value="balance">Balance due</option><option value="current">Sales history</option><option value="draft">Draft only</option></select></label>
          <label className="customers-filter customers-filter--sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="name">Customer name</option><option value="balance-high">Highest balance</option><option value="orders-high">Most orders</option><option value="recent">Recent order</option></select></label>
          {hasFilters && <button type="button" className="customers-reset" onClick={resetFilters}><RotateCcw size={14} /> Reset</button>}
        </div>
        <CustomerTable customers={sortedCustomers} onSelect={setSelectedCustomer} />
      </section>

      <CustomerDetails customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  )
}

export default CustomersPage