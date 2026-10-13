import { useState } from 'react'
import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import ProductDetails from '../../components/ProductDetails/ProductDetails.jsx'
import ProductSummary from '../../components/ProductSummary/ProductSummary.jsx'
import ProductTable from '../../components/ProductTable/ProductTable.jsx'
import { formatProductCurrency, productDemoItems, productDemoLabel } from '../../data/productDemo.js'
import './ProductsPage.css'

const productCategories = [...new Set(productDemoItems.map((product) => product.category))].sort((first, second) => first.localeCompare(second))

function ProductsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('name')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredProducts = productDemoItems.filter((product) => {
    const matchesQuery = !normalizedQuery || [product.name, product.sku, product.category, product.supplier, product.description]
      .some((field) => field.toLowerCase().includes(normalizedQuery))
    const matchesCategory = category === 'all' || product.category === category
    const matchesStatus = status === 'all' || product.status.toLowerCase() === status
    return matchesQuery && matchesCategory && matchesStatus
  })

  const sortedProducts = [...filteredProducts].sort((first, second) => {
    if (sort === 'unit-cost-low') return first.unitCost - second.unitCost
    if (sort === 'unit-cost-high') return second.unitCost - first.unitCost
    if (sort === 'updated') return second.updatedAt.localeCompare(first.updatedAt)
    return first.name.localeCompare(second.name)
  })

  const hasFilters = Boolean(query || category !== 'all' || status !== 'all' || sort !== 'name')

  function resetFilters() {
    setQuery('')
    setCategory('all')
    setStatus('all')
    setSort('name')
  }

  function exportVisibleProducts() {
    const columns = ['SKU', 'Product', 'Category', 'Description', 'Status', 'Base unit', 'Unit cost', 'Stock on hand', 'Supplier', 'Location', 'Last updated']
    const escapeCsv = (value) => `"${String(value).replaceAll('"', '""')}"`
    const rows = sortedProducts.map((product) => [
      product.sku,
      product.name,
      product.category,
      product.description,
      product.status,
      product.unit,
      formatProductCurrency(product.unitCost),
      product.onHand,
      product.supplier,
      product.location,
      product.updatedAt,
    ])
    const csv = [columns, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const fileUrl = URL.createObjectURL(file)
    const downloadLink = document.createElement('a')
    downloadLink.href = fileUrl
    downloadLink.download = 'kephas-buildstock-products-demo.csv'
    downloadLink.style.display = 'none'
    document.body.append(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000)
  }

  return (
    <div className="page-shell products-page">
      <header className="page-header products-page__header">
        <div>
          <p className="eyebrow">BUILDING MATERIALS</p>
          <h1>Products</h1>
          <p className="products-page__subtitle">Maintain a clear catalog of materials, units, suppliers, and sample unit costs.</p>
        </div>
        <div className="page-header__actions products-page__actions">
          <button type="button" className="btn btn-secondary" onClick={exportVisibleProducts} disabled={!sortedProducts.length}><Download size={16} /> Export CSV</button>
          <button type="button" className="btn btn-primary" disabled title="Product creation will be available when the product service is connected."><Plus size={16} /> Add product</button>
        </div>
      </header>

      <div className="notice-box products-page__notice"><strong>Demo catalog · read only.</strong> {productDemoLabel}</div>

      <ProductSummary products={filteredProducts} />

      <section className="panel products-workspace" aria-labelledby="products-table-heading">
        <div className="products-workspace__heading">
          <div><p className="eyebrow eyebrow--muted">PRODUCT REGISTER</p><h2 id="products-table-heading">Material catalog</h2></div>
          <span className="products-result-count">{sortedProducts.length} of {productDemoItems.length} products</span>
        </div>

        <div className="products-toolbar">
          <label className="products-search">
            <Search size={16} />
            <span className="visually-hidden">Search products</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, SKU, supplier..." />
          </label>
          <label className="products-filter"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {productCategories.map((productCategory) => <option key={productCategory} value={productCategory}>{productCategory}</option>)}
          </select></label>
          <label className="products-filter"><span>Catalog status</span><select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select></label>
          <label className="products-filter products-filter--sort"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="name">Product name</option><option value="unit-cost-low">Lowest unit cost</option><option value="unit-cost-high">Highest unit cost</option><option value="updated">Recently updated</option>
          </select></label>
          {hasFilters && <button type="button" className="products-reset" onClick={resetFilters}><RotateCcw size={14} /> Reset</button>}
        </div>

        <ProductTable products={sortedProducts} onSelect={setSelectedProduct} />
      </section>

      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}

export default ProductsPage