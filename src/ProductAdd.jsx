import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductAdd = ({ setLisäysTila, setIsPositive, setMessage, setShowMessage }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    quantityPerUnit: '',
    unitPrice: '',
    unitsInStock: '',
    discontinued: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    ProductService.create(newProduct)
      .then(response => {
        setIsPositive(true)
        setMessage(`Product "${newProduct.productName}" added successfully!`)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 5000)
        setLisäysTila(false)
      })
      .catch(error => {
        setIsPositive(false)
        setMessage("Failed to add product: " + error.message)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 5000)
      })
  }

  return (
    <div className="container mt-4">
  <h3 className="mb-4">Add New Product</h3>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="productName">Product Name</label>
      <input
        type="text"
        className="form-control"
        id="productName"
        name="productName"
        value={newProduct.productName}
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="quantityPerUnit">Quantity per Unit</label>
      <input
        type="number"
        className="form-control"
        id="quantityPerUnit"
        name="quantityPerUnit"
        value={newProduct.quantityPerUnit}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="unitPrice">Unit Price</label>
      <input
        type="number"
        className="form-control"
        id="unitPrice"
        name="unitPrice"
        value={newProduct.unitPrice}
        onChange={handleChange}
        step="0.01"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="unitsInStock">Units in Stock</label>
      <input
        type="number"
        className="form-control"
        id="unitsInStock"
        name="unitsInStock"
        value={newProduct.unitsInStock}
        onChange={handleChange}
      />
    </div>

    <div className="form-check mb-3">
    <label className="form-check-label" htmlFor="discontinued">
        Discontinued
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        id="discontinued"
        name="discontinued"
        checked={newProduct.discontinued}
        onChange={handleChange}
      />
      
    </div>

    <div className="d-flex gap-2">
      <button className="btn btn-dark w-100" type="submit">Save</button>
      <button className="btn btn-secondary w-100" type="button" onClick={() => setLisäysTila(false)}>Cancel</button>
    </div>
  </form>
</div>
  )
}

export default ProductAdd