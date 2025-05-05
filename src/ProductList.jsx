import { useState, useEffect } from 'react'
import './App.css'
import React from 'react'
import ProductService from './services/Product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({ setIsPositive, setShowMessage, setMessage }) => {

  //komponentin tilan määritys
  const [products, setProducts] = useState([])
  const [lisäysTila, setLisäysTila] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    ProductService.getAll()
      .then(data => {
        setProducts(data)
      })
  }, [lisäysTila, reload, muokkausTila]
  )

  //hakukentän onChange tapahtumakäsittelijä
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkausTila(true)
  }

  return (
    <>
          <h2 >
              <span> Products </span>
              {!lisäysTila && (
                  <button className="btn btn-primary" onClick={() => setLisäysTila(true)}>
                      Add new
                  </button>
              )}
          </h2>

      {!lisäysTila && !muokkausTila &&
        <input placeholder='Search by Product Name' value={search} onChange={handleSearchInputChange} />
      }

      {lisäysTila && <ProductAdd setLisäysTila={setLisäysTila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

      {muokkausTila && <ProductEdit setMuokkausTila={setMuokkausTila} muokattavaProduct={muokattavaProduct}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
        reloadNow={reloadNow} reload={reload} />}

      {
        !lisäysTila && !muokkausTila && products && products.map(p => {
          const lowerCaseName = p.productName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return (
              <Product key={p.productId} product={p} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editProduct={editProduct}
              />
            )
          }
          return null
        }
        )
      }
    </>
  )
}

export default ProductList