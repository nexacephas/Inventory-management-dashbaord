export const aiStatus = {
  connected: false,
  label: 'Not yet connected',
  source: 'No AI endpoints are currently configured in this build.',
  banner:
    'This module is ready for a backend-connected AI layer, but it is not connected to live data yet.',
}

export const aiDemoLabel =
  'Illustrative demo data only. Historical records are shown for screen design and workflow review; this is not live AI-generated forecasting.'

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

export const formatQuantity = (value, unit = 'units') => `${Number(value || 0).toLocaleString()} ${unit}`

export const overviewMetrics = [
  {
    title: 'Inventory health',
    value: '74 / 100',
    change: '+4.2 pts',
    tone: 'good',
    note: 'Based on stock coverage and turnover balance',
  },
  {
    title: 'National demand index',
    value: '87.4',
    change: '+6.8%',
    tone: 'neutral',
    note: 'Demo estimate built from recent demand patterns',
  },
  {
    title: 'Critical stock alerts',
    value: '06',
    change: '2 high urgency',
    tone: 'warning',
    note: 'Items below reorder threshold and coverage buffer',
  },
  {
    title: 'Projected monthly sales',
    value: formatCurrency(2450000),
    change: '+12.1%',
    tone: 'good',
    note: 'Illustrative scenario only; no live forecasting engine connected',
  },
]

export const forecastData = [
  {
    product: 'Cement 42.5R',
    unit: 'bags',
    historicalDemand: [180, 214, 190, 228, 236, 242, 260, 248],
    forecast: [250, 260, 270, 280, 290, 300, 310],
    low: [210, 220, 232, 240, 248, 252, 258],
    high: [290, 310, 325, 338, 345, 352, 366],
    confidence: 'Medium',
    coverageWarning: 'Only 38 days of transaction history are available for this item.',
  },
  {
    product: 'Reinforcement Steel',
    unit: 'tons',
    historicalDemand: [24, 29, 27, 33, 38, 35, 41, 44],
    forecast: [41, 43, 46, 49, 53, 55, 58],
    low: [33, 35, 38, 40, 43, 46, 48],
    high: [48, 51, 53, 57, 62, 64, 69],
    confidence: 'High',
    coverageWarning: '83% of expected demand history is covered by recorded invoices.',
  },
  {
    product: 'Sharp Sand',
    unit: 'trips',
    historicalDemand: [62, 58, 66, 71, 68, 74, 79, 82],
    forecast: [80, 82, 84, 86, 88, 92, 95],
    low: [70, 73, 75, 77, 80, 83, 86],
    high: [90, 94, 98, 101, 105, 109, 112],
    confidence: 'Medium',
    coverageWarning: 'Usage varies with site deliveries; seasonal effect requires manual review.',
  },
]

export const stockRiskData = [
  {
    product: 'Cement 42.5R',
    risk: 'High',
    daysRemaining: 4,
    reorderPoint: 420,
    suggestedQty: 620,
    currentStock: 312,
    unit: 'bags',
  },
  {
    product: 'PVC Pipes',
    risk: 'Medium',
    daysRemaining: 12,
    reorderPoint: 180,
    suggestedQty: 240,
    currentStock: 164,
    unit: 'pieces',
  },
  {
    product: 'Concrete Blocks',
    risk: 'Low',
    daysRemaining: 26,
    reorderPoint: 260,
    suggestedQty: 140,
    currentStock: 280,
    unit: 'pieces',
  },
  {
    product: 'Tiles',
    risk: 'Medium',
    daysRemaining: 9,
    reorderPoint: 120,
    suggestedQty: 190,
    currentStock: 105,
    unit: 'boxes',
  },
]

export const replenishmentRecommendations = [
  {
    product: 'Cement 42.5R',
    action: 'Urgent replenishment',
    qty: 620,
    reason: 'Stock is below reorder point with 4 days coverage remaining.',
    supplier: 'Apex Build Supply',
    eta: '2-3 days',
    unit: 'bags',
  },
  {
    product: 'Reinforcement Steel',
    action: 'Review order',
    qty: 240,
    reason: 'Demand outpaces historical baseline in the current 30-day cycle.',
    supplier: 'Ironline Metals',
    eta: '4 days',
    unit: 'tons',
  },
  {
    product: 'PVC Pipes',
    action: 'Prepare PO',
    qty: 180,
    reason: 'Low stock but not yet critical; replenishment likely within current week.',
    supplier: 'Urban Plumbing Ltd',
    eta: '5 days',
    unit: 'pieces',
  },
]

export const inventoryAnalysis = {
  healthScore: 74,
  inventoryValue: formatCurrency(14800000),
  slowMoving: [
    { product: 'Decorative Tiles', days: 62, value: formatCurrency(690000), reason: 'Low monthly turnover and large on-hand volume.' },
    { product: 'White Cement', days: 54, value: formatCurrency(430000), reason: 'Stock remains after project cancellation and delayed site demand.' },
  ],
  valuation: [
    { label: 'Raw materials', value: formatCurrency(6200000) },
    { label: 'Finished goods', value: formatCurrency(4100000) },
    { label: 'Work-in-progress', value: formatCurrency(2100000) },
    { label: 'Warehouse stock', value: formatCurrency(2400000) },
  ],
}

export const profitabilityData = [
  { period: 'Jan', grossMargin: 18, sales: 1500000 },
  { period: 'Feb', grossMargin: 20, sales: 1680000 },
  { period: 'Mar', grossMargin: 17, sales: 1720000 },
  { period: 'Apr', grossMargin: 21, sales: 1880000 },
  { period: 'May', grossMargin: 22, sales: 1960000 },
  { period: 'Jun', grossMargin: 24, sales: 2200000 },
]

export const chatSeed = [
  {
    role: 'assistant',
    message:
      'AI Inventory Assistant is available for review. No backend AI endpoint is currently connected, so messages are queued for future authorization only.',
  },
  {
    role: 'user',
    message: 'What products need attention this week?',
  },
  {
    role: 'assistant',
    message:
      'Based on the current demo dataset, Cement 42.5R and PVC Pipes appear in the highest risk band. Replenishment review is recommended before creating purchase orders.',
  },
]

export const categorySummary = [
  { category: 'Cement', available: 920, risk: 'High', value: formatCurrency(4500000) },
  { category: 'Steel', available: 610, risk: 'Medium', value: formatCurrency(3600000) },
  { category: 'Sand', available: 780, risk: 'Low', value: formatCurrency(2200000) },
  { category: 'Tiles', available: 420, risk: 'Medium', value: formatCurrency(1700000) },
]
