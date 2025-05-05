import './App.css'
import { useState, useEffect } from 'react'
import React from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({ setIsPositive, setShowMessage, setMessage }) => {
    //komponentin tilan määritys
    const [users, setUsers] = useState([])
    const [lisäysTila, setLisäysTila] = useState(false)
    const [muokkausTila, setMuokkausTila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaUser, setMuokattavaUser] = useState(false)
    const [search, setSearch] = useState("")
    const [accesslevelId, setAccesslevelId] = useState(null)

    //tarkistetaan käyttäjän accesslevelId localStoragesta
    useEffect(() => {
        const savedAccesslevelId = localStorage.getItem('accesslevelId')
        setAccesslevelId(savedAccesslevelId)

        //jos käyttäjällä on accesslevelId 1, ladataan käyttäjätiedot
        if (savedAccesslevelId === '1') {
            UserService.getAll()
                .then(data => {
                    setUsers(data)
                })
        }
    }, [lisäysTila, reload, muokkausTila])

    //hakukentän onChange tapahtumakäsittelijä
    const handleSearchInputChange = (event) => {
        setSearch(event.target.value.toLowerCase())
    }

    const editUsers = (user) => {
        setMuokattavaUser(user)
        setMuokkausTila(true)
    }

    const deleteUser = (user) => {
        let vastaus = window.confirm(`Remove User ${user.userName}`)

        if (vastaus === true) {
            UserService.remove(user.userId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Succesfully removed ${user.userName}`)
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

    //jos käyttäjällä ei ole oikeuksia (accesslevelId !== '1'), näytetään viesti
    if (accesslevelId !== '1') {
        return <div>Sinulla ei ole oikeuksia nähdä käyttäjälistaa.</div>
    }

    return (
        <>
            <h2><nobr>Users</nobr>
                {lisäysTila && <UserAdd setLisäysTila={setLisäysTila}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {muokkausTila && <UserEdit setMuokkausTila={setMuokkausTila} muokattavaUser={muokattavaUser}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                <br></br>
                {!lisäysTila && !muokkausTila && <button className="nappi" onClick={() => setLisäysTila(true)}>Add new</button>}</h2>

            {!lisäysTila && !muokkausTila &&
                <input placeholder='Search by Last Name' value={search} onChange={handleSearchInputChange} />
            }

            <hr></hr>

            {!lisäysTila && !muokkausTila &&
                <table id="userTable" className='table'>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Access level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(u => {
                            const lowerCaseName = u.lastName.toLowerCase()
                            if (lowerCaseName.indexOf(search) > -1) {
                                return (
                                    <tr key={u.userId}>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            {parseInt(u.accesslevelId) === 1 ? (
                                                <span className="badge bg-success">Admin</span>
                                            ) : parseInt(u.accesslevelId) === 2 ? (
                                                <span className="badge bg-secondary">User</span>
                                            ) : (
                                                <span className="badge bg-light text-dark">Unknown</span>
                                            )}
                                        </td>
                                        <td><button className="btn btn-secondary w-100" onClick={() => editUsers(u)}>Edit</button> </td>
                                        <td><button className="btn btn-dark w-100" onClick={() => deleteUser(u)}>Delete</button> </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            }
        </>
    )
}

export default UserList