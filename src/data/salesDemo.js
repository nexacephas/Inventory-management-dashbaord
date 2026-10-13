export const salesDemoLabel = 'Illustrative sales demo records only. These transactions do not create invoices, collect payments, or change inventory.'

export const salesDemoOrders = [
  {
    number: 'SO-2026-0385', customer: 'Northgate Housing Scheme', status: 'Completed', paymentStatus: 'Paid', amountPaid: 3375000, soldAt: '2026-10-12', recordedBy: 'Adebayo O.',
    items: [
      { sku: 'CEM-425-001', name: 'Cement 42.5R', quantity: 200, unit: 'bags', unitPrice: 13500 },
      { sku: 'BLK-STD-010', name: 'Concrete Blocks', quantity: 500, unit: 'pieces', unitPrice: 1350 },
    ],
  },
  {
    number: 'SO-2026-0384', customer: 'Sunrise Contractors', status: 'Processing', paymentStatus: 'Partially paid', amountPaid: 4400000, soldAt: '2026-10-11', recordedBy: 'Mariam K.',
    items: [
      { sku: 'STL-REB-001', name: 'Reinforcement Steel', quantity: 8, unit: 'tons', unitPrice: 1080000 },
      { sku: 'BDG-WIR-006', name: 'Binding Wire', quantity: 20, unit: 'coils', unitPrice: 8800 },
    ],
  },
  {
    number: 'SO-2026-0383', customer: 'Clearview Estates', status: 'Awaiting payment', paymentStatus: 'Unpaid', amountPaid: 0, soldAt: '2026-10-10', recordedBy: 'Tunde A.',
    items: [
      { sku: 'TIL-CER-025', name: 'Ceramic Floor Tiles', quantity: 90, unit: 'boxes', unitPrice: 29500 },
      { sku: 'PNT-EML-014', name: 'Emulsion Paint 20L', quantity: 15, unit: 'buckets', unitPrice: 41000 },
    ],
  },
  {
    number: 'SO-2026-0382', customer: 'Urban Civic Projects', status: 'Completed', paymentStatus: 'Partially paid', amountPaid: 1200000, soldAt: '2026-10-09', recordedBy: 'Adebayo O.',
    items: [{ sku: 'SND-SHARP-003', name: 'Sharp Sand', quantity: 30, unit: 'trips', unitPrice: 62000 }],
  },
  {
    number: 'SO-2026-0381', customer: 'Kudu Homes', status: 'Draft', paymentStatus: 'Not billed', amountPaid: 0, soldAt: '2026-10-08', recordedBy: 'Mariam K.',
    items: [{ sku: 'CEM-425-001', name: 'Cement 42.5R', quantity: 80, unit: 'bags', unitPrice: 13500 }],
  },
  {
    number: 'SO-2026-0380', customer: 'Northgate Housing Scheme', status: 'Completed', paymentStatus: 'Paid', amountPaid: 1440000, soldAt: '2026-10-06', recordedBy: 'Tunde A.',
    items: [{ sku: 'ROF-ALU-009', name: 'Aluminium Roofing Sheets', quantity: 60, unit: 'sheets', unitPrice: 24000 }],
  },
  {
    number: 'SO-2026-0379', customer: 'Sunrise Contractors', status: 'Cancelled', paymentStatus: 'Not billed', amountPaid: 0, soldAt: '2026-10-05', recordedBy: 'Mariam K.',
    items: [{ sku: 'BLK-STD-010', name: 'Concrete Blocks', quantity: 400, unit: 'pieces', unitPrice: 1350 }],
  },
  {
    number: 'SO-2026-0378', customer: 'Greenstone Developments', status: 'Completed', paymentStatus: 'Paid', amountPaid: 2720000, soldAt: '2026-10-03', recordedBy: 'Adebayo O.',
    items: [{ sku: 'CAB-2C5-021', name: 'Electrical Cable 2.5mm', quantity: 850, unit: 'metres', unitPrice: 3200 }],
  },
]

export function getSalesOrderTotal(order) {
  return order.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
}

export function getSalesOutstanding(order) {
  if (order.status === 'Draft' || order.status === 'Cancelled') return 0
  return Math.max(0, getSalesOrderTotal(order) - order.amountPaid)
}

export function formatSalesCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)
}