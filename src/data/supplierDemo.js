import { productDemoItems } from './productDemo.js'
import { getPurchaseTotal, purchaseDemoOrders } from './purchaseDemo.js'

export const supplierDemoLabel = 'Supplier relationships below are derived from the illustrative product catalog and purchase-order samples. Contact details and live supplier records are not connected.'

const productsBySupplier = new Map()
for (const product of productDemoItems) {
  const products = productsBySupplier.get(product.supplier) || []
  products.push(product)
  productsBySupplier.set(product.supplier, products)
}

export const supplierDemoRecords = [...productsBySupplier.entries()].map(([name, products]) => {
  const purchaseOrders = purchaseDemoOrders.filter((order) => order.supplier === name)
  const sortedOrders = [...purchaseOrders].sort((first, second) => second.orderedAt.localeCompare(first.orderedAt))
  const openOrderCount = purchaseOrders.filter((order) => order.status !== 'Received').length

  return {
    name,
    products,
    categories: [...new Set(products.map((product) => product.category))].sort((first, second) => first.localeCompare(second)),
    purchaseOrders: sortedOrders,
    openOrderCount,
    lastOrderAt: sortedOrders[0]?.orderedAt || null,
    totalOrderValue: purchaseOrders.reduce((total, order) => total + getPurchaseTotal(order), 0),
  }
})

export function getSupplierActivity(supplier) {
  if (supplier.openOrderCount > 0) return { key: 'open', label: 'Open orders' }
  if (supplier.purchaseOrders.length > 0) return { key: 'history', label: 'Purchase history' }
  return { key: 'catalog', label: 'Catalog only' }
}

export function formatSupplierCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)
}