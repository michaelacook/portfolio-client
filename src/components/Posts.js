import React, { useEffect, useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Content from "./Content"
import Context from "./Provider"

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [keyword, setKeyword] = useState("")
  const [paginatedPosts, setPaginatedPosts] = useState([])
  const [page, setPage] = useState(0)
  const [errors, setErrors] = useState("")
  const { service, user } = useContext(Context)
  const history = useHistory()

  function deletePost(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { email, password } = user
      service.deletePost(id, email, password).then(() => {
        setPosts(posts.filter((post) => post.id !== id))
      })
    }
  }

  useEffect(() => {
    service
      .getAllPosts()
      .then((posts) => {
        if (posts.length >= 4) {
          setPaginatedPosts(chunk(posts, 4))
          setPosts(chunk(posts, 4)[0])
        } else {
          setPosts(posts)
        }
      })
      .catch((error) => {
        setErrors(error.message)
      })
  }, [])

  function search(e) {
    e.preventDefault()
    history.push(`/posts/search/${keyword}`)
  }

  function displayPaginationNav() {
    const buttons = []
    for (let i = 0; i < paginatedPosts.length; i++) {
      buttons.push(
        <li className="page-item" key={i}>
          <a
            onClick={() => setPosts(paginatedPosts[i])}
            className="page-link"
            href="#"
          >
            {i + 1}
          </a>
        </li>
      )
    }
    return (
      <nav className="mt-3">
        <ul className="pagination pagination-sm">{buttons}</ul>
      </nav>
    )
  }

  function chunk(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )
  }

  return (
    <Content>
      <h1>Blog</h1>
      <div className="d-flex justify-content-between mt-5 mb-3">
        <p className="lead">Notes, tutorials, opinions and more!</p>
        <div className="col-3-lg col-4-md">
          <div className="input-group">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search..."
            />
            <div className="input-group-append">
              <button
                onClick={(e) => search(e)}
                className="btn bg-blue text-white"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="col mb-5 mt-5 pl-0">
        {!posts.length ? (
          <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          posts.map((post) => {
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
                {user ? (
                  <span className="d-block">
                    <button className="btn btn-sm btn-success mr-2">
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </span>
                ) : null}
              </div>
            )
          })
        )}
        {paginatedPosts ? displayPaginationNav() : null}
      </div>
    </Content>
  )
}
