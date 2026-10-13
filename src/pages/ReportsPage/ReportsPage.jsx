import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { formatInventoryCurrency, inventoryDemoItems } from '../../data/inventoryDemo.js'
import { formatPurchaseCurrency, getPurchaseTotal, purchaseDemoOrders } from '../../data/purchaseDemo.js'
import { formatSalesCurrency, getSalesOrderTotal, getSalesOutstanding, salesDemoOrders } from '../../data/salesDemo.js'
import { productDemoItems } from '../../data/productDemo.js'
import AIInsightCard from '../../components/AIInsightCard/AIInsightCard.jsx'
import DemandTrendChart from '../../components/DemandTrendChart/DemandTrendChart.jsx'
import SalesDetails from '../../components/SalesDetails/SalesDetails.jsx'
import SalesTable from '../../components/SalesTable/SalesTable.jsx'
import './ReportsPage.css'

const saleStatusTone = { Completed: 'success', Processing: 'processing', 'Awaiting payment': 'warning', Draft: 'muted', Cancelled: 'danger' }
const purchaseStatusTone = { Received: 'success', 'In transit': 'processing', 'Awaiting approval': 'warning', Draft: 'muted' }
const productCategoryBySku = new Map(productDemoItems.map((product) => [product.sku, product.category]))

function formatShortDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
}

function ReportsPage() {
  const [period, setPeriod] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const latestSampleDate = useMemo(() => {
    const dates = [...salesDemoOrders.map((order) => order.soldAt), ...purchaseDemoOrders.map((order) => order.orderedAt)]
    return dates.sort((first, second) => second.localeCompare(first))[0]
  }, [])

  const filteredSales = useMemo(() => {
    if (period === 'all') return salesDemoOrders
    const dayCount = period === '7' ? 7 : 30
    const cutoff = new Date(`${latestSampleDate}T00:00:00Z`)
    cutoff.setUTCDate(cutoff.getUTCDate() - (dayCount - 1))
    const cutoffString = cutoff.toISOString().slice(0, 10)
    return salesDemoOrders.filter((order) => order.soldAt >= cutoffString)
  }, [latestSampleDate, period])

  const filteredPurchases = useMemo(() => {
    if (period === 'all') return purchaseDemoOrders
    const dayCount = period === '7' ? 7 : 30
    const cutoff = new Date(`${latestSampleDate}T00:00:00Z`)
    cutoff.setUTCDate(cutoff.getUTCDate() - (dayCount - 1))
    const cutoffString = cutoff.toISOString().slice(0, 10)
    return purchaseDemoOrders.filter((order) => order.orderedAt >= cutoffString)
  }, [latestSampleDate, period])

  const billableSales = filteredSales.filter((order) => order.status !== 'Draft' && order.status !== 'Cancelled')
  const salesValue = billableSales.reduce((total, order) => total + getSalesOrderTotal(order), 0)
  const collections = billableSales.reduce((total, order) => total + order.amountPaid, 0)
  const outstanding = billableSales.reduce((total, order) => total + getSalesOutstanding(order), 0)
  const stockValue = inventoryDemoItems.reduce((total, item) => total + item.onHand * item.unitCost, 0)
  const metrics = [
    { title: 'Recorded sales value', value: formatSalesCurrency(salesValue), change: `${billableSales.length} billable sample orders`, tone: 'good', note: 'Draft and cancelled orders excluded' },
    { title: 'Recorded collections', value: formatSalesCurrency(collections), change: 'Sample payments', tone: 'neutral', note: 'Not connected to a payment gateway' },
    { title: 'Outstanding balance', value: formatSalesCurrency(outstanding), change: 'Sample balance', tone: outstanding > 0 ? 'warning' : 'good', note: 'Calculated from sample sale totals' },
    { title: 'On-hand inventory value', value: formatInventoryCurrency(stockValue), change: `${inventoryDemoItems.length} catalog items`, tone: 'neutral', note: 'Quantity × sample unit cost' },
  ]

  const categorySales = new Map()
  for (const order of billableSales) {
    for (const item of order.items) {
      const category = productCategoryBySku.get(item.sku) || 'Uncategorized'
      categorySales.set(category, (categorySales.get(category) || 0) + item.quantity * item.unitPrice)
    }
  }
  const categoryChartData = [...categorySales.entries()]
    .map(([periodName, sales]) => ({ period: periodName, sales }))
    .sort((first, second) => second.sales - first.sales)

  const salesStatuses = Object.entries(saleStatusTone).map(([status, tone]) => ({
    status,
    tone,
    count: filteredSales.filter((order) => order.status === status).length,
  })).filter((item) => item.count)
  const purchaseStatuses = Object.entries(purchaseStatusTone).map(([status, tone]) => ({
    status,
    tone,
    count: filteredPurchases.filter((order) => order.status === status).length,
  })).filter((item) => item.count)

  function exportReport() {
    const columns = ['Record type', 'Reference', 'Date', 'Party', 'Status', 'Amount', 'Payment status']
    const salesRows = filteredSales.map((order) => [
      'Sale', order.number, order.soldAt, order.customer, order.status,
      formatSalesCurrency(getSalesOrderTotal(order)), order.paymentStatus,
    ])
    const purchaseRows = filteredPurchases.map((order) => [
      'Purchase', order.number, order.orderedAt, order.supplier, order.status,
      formatPurchaseCurrency(getPurchaseTotal(order)), 'Not available in demo data',
    ])
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const csv = [columns, ...salesRows, ...purchaseRows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-operational-report-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  const periodLabel = period === 'all' ? 'All sample activity' : `Latest ${period} sample days through ${formatShortDate(latestSampleDate)}`

  return (
    <div className="page-shell reports-page">
      <header className="page-header reports-page__header">
        <div><p className="eyebrow">OPERATIONAL REPORTING</p><h1>Reports</h1><p className="reports-page__subtitle">Sales, purchasing, and inventory rollups from the local demo records.</p></div>
        <div className="page-header__actions reports-page__actions">
          <label className="reports-period"><span>Reporting window</span><select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="7">Latest 7 sample days</option><option value="30">Latest 30 sample days</option><option value="all">All sample activity</option></select></label>
          <button type="button" className="btn btn-secondary" onClick={exportReport}><Download size={16} /> Export CSV</button>
        </div>
      </header>

      <div className="notice-box reports-page__notice"><strong>Demo report · not accounting output.</strong> Values are calculated from illustrative frontend records and are not connected to a live ledger, payment processor, or inventory service.</div>

      <div className="reports-period-label">{periodLabel}</div>
      <div className="metrics-grid reports-metrics-grid">{metrics.map((metric) => <AIInsightCard key={metric.title} {...metric} />)}</div>

      <div className="two-column-grid reports-overview-grid">
        <DemandTrendChart data={categoryChartData} title="Sales value by material category" subtitle="Sample billable orders in the selected window" />
        <section className="panel reports-status-panel">
          <div className="panel__header"><div><p className="eyebrow eyebrow--muted">ORDER FLOW</p><h2>Transaction status</h2></div></div>
          <div className="reports-status-section"><h3>Sales orders</h3><ul>{salesStatuses.map((item) => <li key={item.status}><span className={`reports-status-dot reports-status-dot--${item.tone}`} /><span>{item.status}</span><strong>{item.count}</strong></li>)}</ul></div>
          <div className="reports-status-section"><h3>Purchase orders</h3><ul>{purchaseStatuses.map((item) => <li key={item.status}><span className={`reports-status-dot reports-status-dot--${item.tone}`} /><span>{item.status}</span><strong>{item.count}</strong></li>)}</ul></div>
        </section>
      </div>

      <section className="panel reports-sales-panel" aria-labelledby="reports-sales-heading">
        <div className="panel__header"><div><p className="eyebrow eyebrow--muted">SALES DETAIL</p><h2 id="reports-sales-heading">Sales included in this report</h2><p>{filteredSales.length} sample records in the selected window</p></div></div>
        <SalesTable orders={[...filteredSales].sort((first, second) => second.soldAt.localeCompare(first.soldAt))} onSelect={setSelectedOrder} />
      </section>

      <SalesDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  )
}

export default ReportsPage