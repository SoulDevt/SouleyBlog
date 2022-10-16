import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from "moment"
import { AuthContext } from '../context/authContext'


function Single() {

  const [post, setPost] = useState({})
  const location = useLocation()

  const postId = location.pathname.split('/')[2];

  const {currentUser} = useContext(AuthContext)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      }catch(err) {
        console.log(err)
      }
    }
    fetchData()

  },[postId])

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
        <div className="info">
          <span>{post.username}</span>
          {/* Install Moment library for the date */}
          <p>Posted {moment(post.date).fromNow()}</p> 
        </div>
        {/* check username from context and username logged */}
{ currentUser.username === post.username && <div className="edit">
          <Link to={`/write?edit=2`}>
            <img src={Edit} alt="" />
          </Link>
          <img src={Delete} alt="" />
        </div>}
        </div>
        <h1>{post.title}</h1>
        {/* don't need a p tag for the post.desc because the editor give it automatic */}
        {post.desc}
      </div>
        <Menu/>
    </div>
  )
}

export default Single