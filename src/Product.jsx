import { useState } from 'react'
import './App.css'
import React from 'react'
import ProductService from './services/Product'

const Product = ({ product, editProduct, setIsPositive, setShowMessage, setMessage, reload, reloadNow }) => {

    //komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Remove Product ${product.productName}`)

        if (vastaus === true) {
            ProductService.remove(product.productId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Succesfully removed ${product.productName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) //scrollataan ylös jotta nähdään alert

                        //Ilmoituksen piilotus
                        setTimeout(() => {
                            setShowMessage(false)
                        }, 5000)
                        reloadNow(!reload)
                    }
                })

                .catch(error => {
                    setMessage(error)
                    setIsPositive(false)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) //scrollataan ylös jotta nähdään alert

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 6000)

                })
        }
        else {
            setMessage(`Poisto peruttu`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) //scrollataan ylös jotta nähdään alert

            //Ilmoituksen piilotus
            setTimeout(() => {
                setShowMessage(false)
            }, 5000)
        }

    }


    return (

        <div className='productDiv'>
            <h4 onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
                {product.productName}
            </h4>

            {showDetails && (
                <div className='productDetails'>
                    <h3>{product.productName}</h3>
                    <button className="nappi" onClick={() => editProduct(product)}>Edit</button>
                    <button className="nappi" onClick={() => deleteProduct(product)}>Delete</button>

                    <table >
                        <thead>
                            <tr>
                                <th>Quantity Per Unit</th>
                                <th>Unit Price</th>
                                <th>Units In Stock</th>
                                <th>Discontinued</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.quantityPerUnit}</td>
                                <td>{product.unitPrice}$</td>
                                <td>{product.unitsInStock}</td>
                                <td style={{ fontSize: '1.2rem'}}>
                                    {product.discontinued ? '✔' : '✖'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Product