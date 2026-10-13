export const inventoryDemoLabel = 'Illustrative inventory demo data only. Records are stored in this frontend sample and are not connected to live stock or backend services.'

export const inventoryDemoItems = [
  { sku: 'CEM-425-001', name: 'Cement 42.5R', category: 'Cement', onHand: 320, unit: 'bags', reorderPoint: 400, unitCost: 10500, location: 'Main Yard', supplier: 'Apex Build Supply', updatedAt: '2026-10-12' },
  { sku: 'CEM-325-002', name: 'Cement 32.5R', category: 'Cement', onHand: 185, unit: 'bags', reorderPoint: 200, unitCost: 8500, location: 'Main Yard', supplier: 'Apex Build Supply', updatedAt: '2026-10-11' },
  { sku: 'STL-REB-001', name: 'Reinforcement Steel', category: 'Steel', onHand: 24, unit: 'tons', reorderPoint: 35, unitCost: 980000, location: 'Steel Bay', supplier: 'Ironline Metals', updatedAt: '2026-10-12' },
  { sku: 'PVC-110-004', name: 'PVC Pipe 110mm', category: 'Plumbing', onHand: 42, unit: 'pieces', reorderPoint: 80, unitCost: 25000, location: 'Block A', supplier: 'Urban Plumbing Ltd', updatedAt: '2026-10-10' },
  { sku: 'BLK-STD-010', name: 'Concrete Blocks', category: 'Masonry', onHand: 1400, unit: 'pieces', reorderPoint: 900, unitCost: 950, location: 'Outdoor Bay', supplier: 'Stonefield Works', updatedAt: '2026-10-12' },
  { sku: 'SND-SHARP-003', name: 'Sharp Sand', category: 'Aggregates', onHand: 68, unit: 'trips', reorderPoint: 50, unitCost: 48000, location: 'Aggregate Yard', supplier: 'Northgate Quarry', updatedAt: '2026-10-09' },
  { sku: 'TIL-CER-025', name: 'Ceramic Floor Tiles', category: 'Finishes', onHand: 96, unit: 'boxes', reorderPoint: 120, unitCost: 23000, location: 'Finishes Store', supplier: 'Tilecraft Nigeria', updatedAt: '2026-10-12' },
  { sku: 'ROF-ALU-009', name: 'Aluminium Roofing Sheets', category: 'Roofing', onHand: 210, unit: 'sheets', reorderPoint: 150, unitCost: 18500, location: 'Roofing Bay', supplier: 'Crestline Roofing', updatedAt: '2026-10-08' },
  { sku: 'BDG-WIR-006', name: 'Binding Wire', category: 'Steel', onHand: 160, unit: 'coils', reorderPoint: 100, unitCost: 6800, location: 'Steel Bay', supplier: 'Ironline Metals', updatedAt: '2026-10-11' },
  { sku: 'PNT-EML-014', name: 'Emulsion Paint 20L', category: 'Finishes', onHand: 48, unit: 'buckets', reorderPoint: 60, unitCost: 32000, location: 'Finishes Store', supplier: 'ColorHouse Trade', updatedAt: '2026-10-07' },
  { sku: 'PLY-MRN-018', name: 'Marine Plywood', category: 'Timber', onHand: 22, unit: 'sheets', reorderPoint: 40, unitCost: 25000, location: 'Block B', supplier: 'Timberline Depot', updatedAt: '2026-10-06' },
  { sku: 'CAB-2C5-021', name: 'Electrical Cable 2.5mm', category: 'Electrical', onHand: 500, unit: 'metres', reorderPoint: 250, unitCost: 2500, location: 'Block C', supplier: 'BrightWire Distributors', updatedAt: '2026-10-12' },
]

export function getInventoryStatus(item) {
  if (item.onHand <= 0) return { key: 'out', label: 'Out of stock' }
  if (item.onHand <= item.reorderPoint) return { key: 'low', label: 'Reorder needed' }
  return { key: 'healthy', label: 'In stock' }
}

export function formatInventoryCurrency(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)
}