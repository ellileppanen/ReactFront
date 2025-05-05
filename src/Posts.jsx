import { useState, useEffect } from 'react'
import './App.css'
import React from 'react'

const Posts = () => {

    //komponentin tilan määritys
const [posts,setPosts] = useState([])   

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json()) //muunnetaan json data javascriptiksi
  .then(oliot => setPosts(oliot))
},[]
)

  return (
    <>
        <h2>Posts from typicode</h2>
        
        {
          posts && posts.map(p=>
            <div className='posts' key={p.id}>
            <p id='id'>{p.id}</p>
            <p id='titteli'>{p.title}</p>
            <p id='keho'>{p.body}</p>
            </div>
          )
        }
    </>
  )
}

export default Posts
