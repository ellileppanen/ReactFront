import { useState, useEffect } from 'react'
import './App.css'
import React from 'react'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({ setIsPositive, setShowMessage, setMessage }) => {

  //komponentin tilan määritys
  const [customers, setCustomers] = useState([])
  const [showCustomers, setShowCustomers] = useState(false)
  const [lisäysTila, setLisäysTila] = useState(false)
  const [muokkausTila, setMuokkausTila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const token =localStorage.getItem('token')
      CustomerService
        .setToken(token)

    CustomerService.getAll()
      .then(data => {
        setCustomers(data)
      })
  }, [lisäysTila, reload, muokkausTila]
  )

  //hakukentän onChange tapahtumakäsittelijä
  const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
  }

  const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkausTila(true)
  }

  return (
    <>
      <h2><nobr style={{ cursor: 'pointer' }}
        onClick={() => setShowCustomers(!showCustomers)}>Customers </nobr>
        {!lisäysTila && <button className="btn btn-dark" onClick={() => setLisäysTila(true)}> Add new</button>}</h2>

      {!lisäysTila && !muokkausTila &&
        <input placeholder='Search by Company Name' value={search} onChange={handleSearchInputChange} />
      }

      {lisäysTila && <CustomerAdd setLisäysTila={setLisäysTila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

      {muokkausTila && <CustomerEdit setMuokkausTila={setMuokkausTila} muokattavaCustomer={muokattavaCustomer}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

      {
        !lisäysTila && !muokkausTila && showCustomers && customers && customers.map(c => {
          const lowerCaseName = c.companyName.toLowerCase()
          if (lowerCaseName.indexOf(search) > -1) {
            return (
              <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                editCustomer={editCustomer}
              />
            )
          }
        }
        )
      }
    </>
  )
}

export default CustomerList