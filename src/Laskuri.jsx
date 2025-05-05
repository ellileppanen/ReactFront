import { useState } from 'react'
import './App.css'
import React from 'react'

//props otettu vastaan suoraan nimellä
const Laskuri = ({huomio}) => {

    //komponentin tilan määritys
const [luku,setLuku] = useState(0)   

  return (
    <>
        <h3>{luku}</h3>
        <button onClick={()=> setLuku(luku + 1)}>+</button>
        <button onClick={()=> setLuku(luku -1)}>-</button>
        <button onClick={()=> setLuku(luku == 0)}>nollaus</button>

        <p><button onClick={huomio}>Huomio</button></p>
    </>
  )
}

export default Laskuri
