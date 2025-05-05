import { useState } from 'react'
import './App.css'
import React from 'react'
import UserService from './services/User'

const UserEdit = ({setMuokkausTila, setIsPositive, setShowMessage, setMessage, muokattavaUser}) => {

    
//komponentin tilan määritys
const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
const [newEmail, setNewEmail] = useState(muokattavaUser.email)
const [newUserName, setNewUserName] = useState(muokattavaUser.userName)
const [newPassword, setNewPassword] = useState(muokattavaUser?.password || "")
const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)


//onSubmit tapahtumakäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
        userId : newUserId,
        FirstName : newFirstName,
        LastName : newLastName,
        Email : newEmail,
        UserName : newUserName,
        Password : newPassword,
        AccesslevelId : newAccesslevelId
    }
    
    UserService.update(newUser)
    .then(response => {
        if (response.status === 200){
            setMessage("Edited user: " + newUser.UserName)
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
  <h2 className="mb-4">User Edit</h2>

  <form onSubmit={handleSubmit}>
  <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newFirstName}
                        placeholder="First name"
                        onChange={({ target }) => setNewFirstName(target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={newLastName}
                        placeholder="Last name"
                        onChange={({ target }) => setNewLastName(target.value)}
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
                        onChange={({ target }) => setNewUserName(target.value)}
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        placeholder="Password"
                        onChange={({ target }) => setNewPassword(target.value)}
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

export default UserEdit