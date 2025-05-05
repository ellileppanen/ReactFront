import './App.css'
import React, { useState } from 'react'
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({ setLisäysTila, setIsPositive, setMessage, setShowMessage }) => {

    // Komponentin tilan määritys
    // Id arvo määritellään tietokannassa automaattisesti
    const [newFirstName, setNewFirstname] = useState('')
    const [newLastName, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)
    const [newUserName, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatchError, setPasswordMatchError] = useState('')


    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            setPasswordMatchError('Passwords do not match')
            return
        }
        var newUser = {
            firstname: newFirstName,
            lastname: newLastName,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            username: newUserName,
            password: md5(newPassword) // Salataan md5 kirjaston metodilla
        }

        console.log(newUser)

        UserService.create(newUser)
            .then(response => {
                if (response.status === 200) {
                    setMessage(`Added new User: ${newUser.firstname} ${newUser.lastname}`)
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

    //salasanakentän muutosten käsittely ja tarkistetaan match
    const handlePasswordChange = (value) => {
        setNewPassword(value)
        if (confirmPassword && value !== confirmPassword) {
            setPasswordMatchError('Passwords do not match')
        } else {
            setPasswordMatchError('')
        }
    }

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value)
        if (newPassword && value !== newPassword) {
            setPasswordMatchError('Passwords do not match')
        } else {
            setPasswordMatchError('')
        }
    }

    return (

        <div id="addNew" className="container mt-4">
            <h2 className="mb-4">Add New User</h2>

            <form onSubmit={handleSubmit} id="userAddForm">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newFirstName}
                        placeholder="First name"
                        onChange={({ target }) => setNewFirstname(target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newLastName}
                        placeholder="Last name"
                        onChange={({ target }) => setNewLastname(target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        value={newEmail}
                        placeholder="Email"
                        onChange={({ target }) => setNewEmail(target.value)}
                    />
                </div>

                <div className="mb-3">
                    <select
                        className="form-control"
                        value={newAccesslevelId}
                        onChange={({ target }) => setNewAccesslevelId(parseInt(target.value))}
                    >
                        <option value={1}>Admin</option>
                        <option value={2}>User</option>
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newUserName}
                        placeholder="Username"
                        onChange={({ target }) => setNewUsername(target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        placeholder="Password"
                        onChange={({ target }) => handlePasswordChange(target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        required
                    />
                    {/* Näytetään virheviesti jos salasanat eivät täsmää */}
                    {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}
                </div>

                
                {/* save button on käytössä kun molemmissa salasanakentissä on täsmäävät salasanat */}
                <div className="d-flex gap-2">
                    <input 
                    type="submit" 
                    value="Save" 
                    className="btn btn-dark w-100"
                    disabled={
                        passwordMatchError !== '' ||
                        newPassword === '' ||
                        confirmPassword === ''
                    }
                    />
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

export default UserAdd