import React, { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import Content from "./Content"
import Context from "./Provider"

export default function Search() {
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState("")
  const { service } = useContext(Context)
  const { keyword } = useParams()

  useEffect(() => {
    service
      .searchPosts(keyword)
      .then((posts) => {
        setPosts(posts)
      })
      .catch((error) => {
        setErrors(error.message)
      })
  }, [])

  return (
    <Content>
      <h3>Search Results for "{keyword}":</h3>
      <div className="mt-5">
        <div className="col mb-5 mt-5 pl-0">
          {posts.map((post) => {
            return (
              <div className="mt-3 p-2 rounded-lg post-link" key={post.id}>
                <small className="text-muted">
                  {new Date(post.createdAt).toDateString()}
                </small>
                <Link to={`/posts/${post.id}`}>
                  <h5 className="mt-2 mb-2">{post.title}</h5>
                </Link>
                <small className="text-secondary">
                  {post.body.substring(0, 75)} ...
                </small>
              </div>
            )
          })}
        </div>
      </div>
    </Content>
  )
}
