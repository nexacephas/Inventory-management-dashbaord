import { formatInventoryCurrency, getInventoryStatus, inventoryDemoItems } from './inventoryDemo.js'
import { productDemoItems } from './productDemo.js'
import { purchaseDemoOrders } from './purchaseDemo.js'
import { formatSalesCurrency, getSalesOutstanding, salesDemoOrders } from './salesDemo.js'

const atOrBelowReorder = inventoryDemoItems
  .filter((item) => getInventoryStatus(item).key !== 'healthy')
  .sort((first, second) => (first.onHand / first.reorderPoint) - (second.onHand / second.reorderPoint))

const categoryTotals = new Map()
for (const item of inventoryDemoItems) {
  const summary = categoryTotals.get(item.category) || { category: item.category, products: 0, attentionItems: 0, estimatedValue: 0 }
  summary.products += 1
  summary.estimatedValue += item.onHand * item.unitCost
  if (getInventoryStatus(item).key !== 'healthy') summary.attentionItems += 1
  categoryTotals.set(item.category, summary)
}

const outstandingSalesBalance = salesDemoOrders.reduce((total, order) => total + getSalesOutstanding(order), 0)
const openPurchaseOrders = purchaseDemoOrders.filter((order) => order.status !== 'Received').length

export const intelligenceOverviewMetrics = [
  {
    title: 'Catalog products',
    value: inventoryDemoItems.length.toLocaleString(),
    change: 'Sample catalog',
    tone: 'neutral',
    note: 'Items represented in the current demo dataset',
  },
  {
    title: 'At/below reorder point',
    value: atOrBelowReorder.length.toLocaleString(),
    change: 'Threshold review',
    tone: 'warning',
    note: 'Calculated from each sample item reorder point',
  },
  {
    title: 'Open purchase orders',
    value: openPurchaseOrders.toLocaleString(),
    change: 'Sample order records',
    tone: 'neutral',
    note: 'Orders not marked received in the demo dataset',
  },
  {
    title: 'Outstanding sales balance',
    value: formatSalesCurrency(outstandingSalesBalance),
    change: 'Sample balance',
    tone: 'warning',
    note: 'Calculated from non-draft, non-cancelled sample sales',
  },
]

export const intelligenceAttentionItems = atOrBelowReorder.map((item) => ({
  ...item,
  shortfall: Math.max(item.reorderPoint - item.onHand, 0),
}))

export const intelligenceCategorySummary = [...categoryTotals.values()]
  .sort((first, second) => second.estimatedValue - first.estimatedValue)
  .map((category) => ({
    ...category,
    estimatedValue: formatInventoryCurrency(category.estimatedValue),
  }))

export const intelligenceOverviewMeta = {
  inventoryItems: inventoryDemoItems.length,
  lastSampleUpdate: inventoryDemoItems.reduce((latest, item) => item.updatedAt > latest ? item.updatedAt : latest, ''),
}

export const inventorySampleValue = formatInventoryCurrency(
  inventoryDemoItems.reduce((total, item) => total + item.onHand * item.unitCost, 0)
)

export const stockThresholdRows = intelligenceAttentionItems.map((item) => ({
  product: item.name,
  sku: item.sku,
  unit: item.unit,
  currentStock: item.onHand,
  reorderPoint: item.reorderPoint,
  shortfall: item.shortfall,
  supplier: item.supplier,
  location: item.location,
  status: getInventoryStatus(item).label,
}))

const productsBySku = new Map(productDemoItems.map((product) => [product.sku, product]))
const profitabilityByCategory = new Map()

for (const order of salesDemoOrders) {
  if (order.status === 'Draft' || order.status === 'Cancelled') continue
  for (const item of order.items) {
    const product = productsBySku.get(item.sku)
    if (!product) continue
    const summary = profitabilityByCategory.get(product.category) || { period: product.category, sales: 0, costBasis: 0 }
    summary.sales += item.quantity * item.unitPrice
    summary.costBasis += item.quantity * product.unitCost
    profitabilityByCategory.set(product.category, summary)
  }
}

export const profitabilitySnapshot = [...profitabilityByCategory.values()]
  .map((category) => ({
    ...category,
    grossProfit: category.sales - category.costBasis,
    grossMargin: category.sales ? ((category.sales - category.costBasis) / category.sales) * 100 : 0,
  }))
  .sort((first, second) => second.sales - first.sales)

const profitabilityTotals = profitabilitySnapshot.reduce((total, category) => ({
  sales: total.sales + category.sales,
  costBasis: total.costBasis + category.costBasis,
  grossProfit: total.grossProfit + category.grossProfit,
}), { sales: 0, costBasis: 0, grossProfit: 0 })

export const profitabilitySummary = {
  sales: formatSalesCurrency(profitabilityTotals.sales),
  costBasis: formatSalesCurrency(profitabilityTotals.costBasis),
  grossProfit: formatSalesCurrency(profitabilityTotals.grossProfit),
  grossMargin: profitabilityTotals.sales
    ? `${((profitabilityTotals.grossProfit / profitabilityTotals.sales) * 100).toFixed(1)}%`
    : '0%',
}