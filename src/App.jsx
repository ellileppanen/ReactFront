import React, {useState, useEffect}from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import ProductList from './ProductList'
import Message from './Message'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'

const App = () => {

//statet
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedInUser, setLoggedInUser] = useState('')

const huomio = () =>{
  alert("Huomio!")
}

//kirjautumisen tilan tarkistus
useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])

// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}

  return (

    <div className="App">
      {!loggedInUser && <Login setMessage={setMessage} setShowMessage={setShowMessage} setIsPositive={setIsPositive} setLoggedInUser={setLoggedInUser}/>}
{ loggedInUser &&
    
  <Router>
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Northwind</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
          <Nav.Link as={Link} to="/products">Products</Nav.Link>
          <Nav.Link as={Link} to="/posts">Some highlights</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
          <Nav.Link as={Link} to="/laskuri">Laskuri</Nav.Link>
        </Nav>
        <Nav>
        <button type='btn-dark' className='ms-auto'onClick={() => logout()}>Log out</button>
        </Nav>
      </Container>
    </Navbar>
    
    {/* Sisällön yläpuolelle marginaalia kiinnitettyä navbaria varten */}
    <div style={{ paddingTop: '80px' }}>
      <Container>
        <h1>Northwind Corporation</h1>
        <hr />

        {showMessage && <Message message={message} isPositive={isPositive} />}

        <Routes>
          <Route path="/customers"
          element={<CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}>
          </Route>

          <Route path="/products"
          element={<ProductList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}>
          </Route>

          <Route path="/users"
          element={<UserList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}>
          </Route>

          <Route path="/posts"
          element={<Posts />}>
          </Route>
          
          <Route path="/laskuri" 
          element={<Laskuri huomio={huomio}/>}>
        </Route>
        
        </Routes>

      </Container>
    </div>
  </Router>
}  
</div>
  )
}

export default App

