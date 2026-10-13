export const purchaseDemoLabel = 'Illustrative purchase-order demo data only. Orders are not sent to suppliers and do not update inventory.'

export const purchaseDemoOrders = [
  {
    number: 'PO-2026-0142', supplier: 'Apex Build Supply', status: 'Awaiting approval', orderedAt: '2026-10-12', expectedAt: '2026-10-16', requestedBy: 'Adebayo O.', destination: 'Main Yard',
    items: [
      { sku: 'CEM-425-001', name: 'Cement 42.5R', quantity: 420, unit: 'bags', unitCost: 10500 },
      { sku: 'CEM-325-002', name: 'Cement 32.5R', quantity: 180, unit: 'bags', unitCost: 8500 },
    ],
  },
  {
    number: 'PO-2026-0141', supplier: 'Ironline Metals', status: 'In transit', orderedAt: '2026-10-10', expectedAt: '2026-10-14', requestedBy: 'Mariam K.', destination: 'Steel Bay',
    items: [
      { sku: 'STL-REB-001', name: 'Reinforcement Steel', quantity: 12, unit: 'tons', unitCost: 980000 },
      { sku: 'BDG-WIR-006', name: 'Binding Wire', quantity: 40, unit: 'coils', unitCost: 6800 },
    ],
  },
  {
    number: 'PO-2026-0140', supplier: 'Northgate Quarry', status: 'Received', orderedAt: '2026-10-09', expectedAt: '2026-10-11', requestedBy: 'Tunde A.', destination: 'Aggregate Yard',
    items: [{ sku: 'SND-SHARP-003', name: 'Sharp Sand', quantity: 60, unit: 'trips', unitCost: 48000 }],
  },
  {
    number: 'PO-2026-0139', supplier: 'Urban Plumbing Ltd', status: 'Draft', orderedAt: '2026-10-08', expectedAt: '2026-10-15', requestedBy: 'Adebayo O.', destination: 'Block A',
    items: [{ sku: 'PVC-110-004', name: 'PVC Pipe 110mm', quantity: 90, unit: 'pieces', unitCost: 25000 }],
  },
  {
    number: 'PO-2026-0138', supplier: 'Tilecraft Nigeria', status: 'Received', orderedAt: '2026-10-06', expectedAt: '2026-10-08', requestedBy: 'Mariam K.', destination: 'Finishes Store',
    items: [{ sku: 'TIL-CER-025', name: 'Ceramic Floor Tiles', quantity: 80, unit: 'boxes', unitCost: 23000 }],
  },
  {
    number: 'PO-2026-0137', supplier: 'Apex Build Supply', status: 'In transit', orderedAt: '2026-10-05', expectedAt: '2026-10-13', requestedBy: 'Tunde A.', destination: 'Main Yard',
    items: [{ sku: 'CEM-325-002', name: 'Cement 32.5R', quantity: 300, unit: 'bags', unitCost: 8500 }],
  },
  {
    number: 'PO-2026-0136', supplier: 'BrightWire Distributors', status: 'Awaiting approval', orderedAt: '2026-10-03', expectedAt: '2026-10-17', requestedBy: 'Adebayo O.', destination: 'Block C',
    items: [{ sku: 'CAB-2C5-021', name: 'Electrical Cable 2.5mm', quantity: 2500, unit: 'metres', unitCost: 2500 }],
  },
  {
    number: 'PO-2026-0135', supplier: 'Crestline Roofing', status: 'Received', orderedAt: '2026-10-01', expectedAt: '2026-10-06', requestedBy: 'Mariam K.', destination: 'Roofing Bay',
    items: [{ sku: 'ROF-ALU-009', name: 'Aluminium Roofing Sheets', quantity: 100, unit: 'sheets', unitCost: 18500 }],
  },
]

export function getPurchaseTotal(order) {
  return order.items.reduce((total, item) => total + item.quantity * item.unitCost, 0)
}

export function formatPurchaseCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)
}