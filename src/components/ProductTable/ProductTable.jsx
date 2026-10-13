import { ArrowUpRight } from 'lucide-react'
import { formatProductCurrency } from '../../data/productDemo.js'
import './ProductTable.css'

function ProductTable({ products, onSelect }) {
  if (!products.length) {
    return <div className="product-empty"><strong>No products match those filters.</strong><span>Try another search or reset the current filters.</span></div>
  }

  return (
    <div className="product-table-scroll">
      <table className="product-table">
        <thead>
          <tr>
            <th scope="col">Product</th><th scope="col">Category</th><th scope="col">Base unit</th><th scope="col">Unit cost</th><th scope="col">Stock on hand</th><th scope="col">Supplier</th><th scope="col">Status</th><th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.sku}>
              <td data-label="Product"><strong className="product-table__name">{product.name}</strong><small className="product-table__sku">{product.sku}</small></td>
              <td data-label="Category">{product.category}</td>
              <td data-label="Base unit">{product.unit}</td>
              <td data-label="Unit cost">{formatProductCurrency(product.unitCost)}</td>
              <td data-label="Stock on hand">{product.onHand.toLocaleString()} {product.unit}</td>
              <td data-label="Supplier">{product.supplier}</td>
              <td data-label="Status"><span className={`product-status product-status--${product.status.toLowerCase()}`}>{product.status}</span></td>
              <td data-label="Details"><button type="button" className="product-table__view" onClick={() => onSelect(product)} aria-label={`View ${product.name} details`}><ArrowUpRight size={16} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable