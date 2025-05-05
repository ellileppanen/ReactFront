import { useState } from 'react'
import './App.css'
import React from 'react'
import ProductService from './services/Product'

const ProductEdit = ({ setMuokkausTila, setIsPositive, setShowMessage, setMessage, muokattavaProduct }) => {

  //komponentin tilan määritys
  const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
  const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
  const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
  const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
  const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
  const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)

  //onSubmit tapahtumakäsittelijä funktio
  const handleSubmit = (event) => {
    event.preventDefault()
  
    const updatedProduct = {
      productId: muokattavaProduct.productId,
      productName: newProductName,
      quantityPerUnit: newQuantityPerUnit,
      unitPrice: parseFloat(newUnitPrice),
      unitsInStock: parseInt(newUnitsInStock),
      discontinued: newDiscontinued 
    }
  
    ProductService.update(updatedProduct)
      .then(response => {
        if (response.status === 200){
            setMessage("Edited product: " + newProductName)
            setIsPositive(true)
            setShowMessage(true)
            

            setTimeout(()=>{
                setShowMessage(false)
            }, 5000)

            setMuokkausTila(false)
        }
    })
    .catch(error =>{
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(()=>{
            setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <div id="edit" className="container mt-4">
      <h2 className="mb-4">Product Edit</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            className="form-control"
            value={newProductId}
            id="productId"
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={newProductName}
            id="productName"
            onChange={({ target }) => setNewProductName(target.value)}
            placeholder="Product Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantityPerUnit">Quantity Per Unit</label>
          <input
            type="text"
            className="form-control"
            value={newQuantityPerUnit}
            id="quantityPerUnit"
            onChange={({ target }) => setNewQuantityPerUnit(target.value)}
            placeholder="Quantity Per Unit"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="number"
            className="form-control"
            value={newUnitPrice}
            id="unitPrice"
            onChange={({ target }) => setNewUnitPrice(target.value)}
            placeholder="Unit Price"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock">Units In Stock</label>
          <input
            type="number"
            className="form-control"
            value={newUnitsInStock}
            id="stock"
            onChange={({ target }) => setNewUnitsInStock(target.value)}
            placeholder="Units In Stock"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="discontinued">Discontinued </label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={newDiscontinued}
            id="discontinued"
            onChange={({ target }) => setNewDiscontinued(target.checked)}
          />
        </div>

        <div className="d-flex gap-2">
          <input type="submit" value="Save" className="btn btn-dark w-100" />
          <input
            type="button"
            value="Back"
            className="btn btn-secondary w-100"
            onClick={() => setMuokkausTila(false)}
          />
        </div>
      </form>
    </div>
  )
}

export default ProductEdit