import { useState } from 'react'
import './App.css'
import React from 'react'
import CustomerService from './services/Customer'

const Customer = ({ customer, editCustomer, setIsPositive, setShowMessage, setMessage, reload, reloadNow }) => {

    //komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteCustomer = (customer) => {
        let vastaus = window.confirm(`Remove Customer ${customer.companyName}`)

        if (vastaus === true) {
            CustomerService.remove(customer.customerId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Succesfully removed ${customer.companyName}`)
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

        <div className='customerDiv'>
            <h4 onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
                {customer.companyName} , {customer.country}
            </h4>

            {showDetails && (
                <div className='customerDetails'>
                    <h3>{customer.companyName}</h3>
                    <button className="nappi" onClick={() => editCustomer(customer)}>Edit</button>
                    <button className="nappi" onClick={() => deleteCustomer(customer)}>Delete</button>

                    <table >
                        <thead>
                            <tr>
                                <th>Contact person</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{customer.contactName}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{customer.city}</td>
                                <td>{customer.country}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Customer