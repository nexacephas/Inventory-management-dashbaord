import { formatInventoryCurrency, inventoryDemoItems } from './inventoryDemo.js'

export const productDemoLabel = 'Illustrative product catalog only. These records are frontend samples and are not connected to live product, price, or supplier services.'

const productDescriptions = {
  'CEM-425-001': 'High-strength cement for structural concrete work.',
  'CEM-325-002': 'General-purpose cement for blockwork and site applications.',
  'STL-REB-001': 'Reinforcement steel used in reinforced-concrete construction.',
  'PVC-110-004': 'Large-diameter PVC pipe for building drainage systems.',
  'BLK-STD-010': 'Standard concrete masonry blocks for wall construction.',
  'SND-SHARP-003': 'Sharp sand for concrete mixing and general site use.',
  'TIL-CER-025': 'Ceramic floor tiles for interior and exterior finishes.',
  'ROF-ALU-009': 'Aluminium roofing sheets for weather-resistant roof covering.',
  'BDG-WIR-006': 'Binding wire for securing reinforcement bars.',
  'PNT-EML-014': 'Interior emulsion paint supplied in 20-litre buckets.',
  'PLY-MRN-018': 'Moisture-resistant plywood for temporary and finishing work.',
  'CAB-2C5-021': '2.5mm electrical cable for building wiring installations.',
}

export const productDemoItems = inventoryDemoItems.map((item) => ({
  ...item,
  description: productDescriptions[item.sku],
  status: item.sku === 'PLY-MRN-018' ? 'Inactive' : 'Active',
}))

export { formatInventoryCurrency as formatProductCurrency }