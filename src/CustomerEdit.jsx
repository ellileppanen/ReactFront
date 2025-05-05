import { useState } from 'react'
import './App.css'
import React from 'react'
import CustomerService from './services/Customer'

const CustomerEdit = ({setMuokkausTila, setIsPositive, setShowMessage, setMessage, muokattavaCustomer}) => {

    window.scrollBy(0,-10000) //scrollataan ylös jotta nähdään muokkaus lomake
    
//komponentin tilan määritys
const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)

const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
const [newCity, setNewCity] = useState(muokattavaCustomer.city)
const [newRegion, setNewRegion] = useState(muokattavaCustomer.region)

const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

//onSubmit tapahtumakäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newCustomer = {
        customerId : newCustomerId,
        companyName : newCompanyName,
        contactName : newContactName,
        address : newAddress,
        city : newCity,
        region : newRegion,
        postalCode : newPostalCode,
        country : newCountry,
        phone : newPhone,
        fax : newFax
    }
    
    CustomerService.update(newCustomer)
    .then(response => {
        if (response.status === 200){
            setMessage("Edited customer: " + newCustomer.companyName)
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
  <h2 className="mb-4">Customer Edit</h2>

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        value={newCustomerId}
        disabled
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
        onClick={() => setMuokkausTila(false)}
      />
    </div>
  </form>
</div>
  )
}

export default CustomerEdit