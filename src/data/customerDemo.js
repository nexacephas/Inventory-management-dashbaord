import { productDemoItems } from './productDemo.js'
import { formatSalesCurrency, getSalesOrderTotal, getSalesOutstanding, salesDemoOrders } from './salesDemo.js'

export const customerDemoLabel = 'Customer relationships below are derived from illustrative sales records. No contact details or live customer accounts are configured.'

const productBySku = new Map(productDemoItems.map((product) => [product.sku, product]))
const salesByCustomer = new Map()

for (const order of salesDemoOrders) {
  const orders = salesByCustomer.get(order.customer) || []
  orders.push(order)
  salesByCustomer.set(order.customer, orders)
}

export const customerDemoRecords = [...salesByCustomer.entries()].map(([name, orders]) => {
  const sortedOrders = [...orders].sort((first, second) => second.soldAt.localeCompare(first.soldAt))
  const billableOrders = orders.filter((order) => order.status !== 'Draft' && order.status !== 'Cancelled')
  const products = [...new Map(orders.flatMap((order) => order.items).map((item) => [item.sku, productBySku.get(item.sku)]).filter(([, product]) => product)).values()]

  return {
    name,
    orders: sortedOrders,
    products,
    categories: [...new Set(products.map((product) => product.category))].sort((first, second) => first.localeCompare(second)),
    billedValue: billableOrders.reduce((total, order) => total + getSalesOrderTotal(order), 0),
    collectedValue: billableOrders.reduce((total, order) => total + order.amountPaid, 0),
    outstandingBalance: billableOrders.reduce((total, order) => total + getSalesOutstanding(order), 0),
    lastOrderAt: sortedOrders[0]?.soldAt || null,
  }
})

export function getCustomerActivity(customer) {
  if (customer.outstandingBalance > 0) return { key: 'balance', label: 'Balance due' }
  if (customer.billedValue > 0) return { key: 'current', label: 'Sales history' }
  return { key: 'draft', label: 'Draft only' }
}

export { formatSalesCurrency as formatCustomerCurrency }