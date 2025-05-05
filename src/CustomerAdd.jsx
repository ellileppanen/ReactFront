import { useState } from 'react'
import './App.css'
import React from 'react'
import CustomerService from './services/Customer'

const CustomerAdd = ({ setLisäysTila, setIsPositive, setShowMessage, setMessage }) => {

    //komponentin tilan määritys
    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')

    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newRegion, setNewRegion] = useState('')


    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')

    //onSubmit tapahtumakäsittelijä funktio
    const handleSubmit = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalCode: newPostalCode,
            country: newCountry,
            phone: newPhone,
            fax: newFax
        }

        const token = localStorage.getItem('token')
        CustomerService
            .setToken(token)

        CustomerService.create(newCustomer)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Added new Customer: " + newCustomer.companyName)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000)

                    setLisäysTila(false)
                }
            })
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)

            })
    }


    return (

        <div id="addNew" className="container mt-4">
            <h2 className="mb-4"> Add a new Customer</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newCustomerId}
                        onChange={({ target }) => setNewCustomerId(target.value)}
                        placeholder="ID with 5 capital letters"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newCompanyName}
                        onChange={({ target }) => setNewCompanyName(target.value)}
                        placeholder="Company Name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newContactName}
                        onChange={({ target }) => setNewContactName(target.value)}
                        placeholder="Contact Name"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newAddress}
                        onChange={({ target }) => setNewAddress(target.value)}
                        placeholder="Address"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newCity}
                        onChange={({ target }) => setNewCity(target.value)}
                        placeholder="City"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newRegion}
                        onChange={({ target }) => setNewRegion(target.value)}
                        placeholder="Region"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newPostalCode}
                        onChange={({ target }) => setNewPostalCode(target.value)}
                        placeholder="Postal Code"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newCountry}
                        onChange={({ target }) => setNewCountry(target.value)}
                        placeholder="Country"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newPhone}
                        onChange={({ target }) => setNewPhone(target.value)}
                        placeholder="Phone"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newFax}
                        onChange={({ target }) => setNewFax(target.value)}
                        placeholder="Fax"
                    />
                </div>

                <div className="d-flex gap-2">
                    <input type="submit" value="Save" className="btn btn-dark w-100" />
                    <input
                        type="button"
                        value="Back"
                        className="btn btn-secondary w-100"
                        onClick={() => setLisäysTila(false)}
                    />
                </div>
            </form>
        </div>
    )
}

export default CustomerAdd