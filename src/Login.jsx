import './App.css'
import React, { useState } from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({  setIsPositive, setMessage, setShowMessage, setLoggedInUser }) => {

    // Komponentin tilan määritys

    const [UserName, setUsername] = useState('')
    const [Password, setPassword] = useState('')


    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
        event.preventDefault()
        var userForAuth = {
            username: UserName,
            password: md5(Password) // Salataan md5 kirjaston metodilla
        }

        LoginService.authenticate(userForAuth)
            .then(response => {
                if (response.status === 200) {

                    console.log ("kirjautuminen onnistui, data on : ")
                    console.log(response.data)

                    // Talletetaan tietoja selaimen local storageen
                    localStorage.setItem("username", response.data.username)
                    localStorage.setItem("accesslevelId", response.data.accesslevelId)
                    localStorage.setItem("token", response.data.token)

                    //asetetaan app komponentissa olevaan stateen
                    setLoggedInUser(response.data.username)

                    setMessage(`Logged in as: ${userForAuth.username} `)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000)
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

    // Kenttien tyhjennys
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    } 

    return (

        <div id="loginWindow" className="container mt-4">
            <h2 className="mb-4">Sisäänkirjautumen</h2>

            <form onSubmit={handleSubmit} id="userAddForm">
                
                <div className="mb-3">
                    <input
                        id='UsernameInput'
                        type="text"
                        className="form-control"
                        value={UserName}
                        placeholder="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        id='PasswordInput'
                        type="password"
                        className="form-control"
                        value={Password}
                        placeholder="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <div className="d-flex gap-2">
                    <input type="submit" value="Login" className="btn btn-dark w-100" />
                    <input
                        type="button"
                        value="Empty"
                        className="btn btn-secondary w-100"
                        onClick={() => emptyFields()}
                    />
                </div>
            </form>
        </div>
    )
}

export default Login