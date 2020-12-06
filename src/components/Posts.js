import React, { useEffect, useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Loader,
  Segment,
} from "semantic-ui-react"
import Context from "./Provider"

export default () => {
  const [posts, setPosts] = useState([])
  const [keyword, setKeyword] = useState("")
  const [paginatedPosts, setPaginatedPosts] = useState([])
  const [page, setPage] = useState(0)
  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(true)
  const [slow, setSlow] = useState(false)
  const { service, user } = useContext(Context)
  const history = useHistory()

  const deletePost = (id) => {
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
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const search = (e) => {
    e.preventDefault()
    history.push(`/posts/search/${keyword}`)
  }

  const displayPaginationNav = () => {
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

  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )
  }

  setTimeout(() => {
    setSlow(true)
  }, 6000)

  return (
    <React.Fragment>
      {loading ? (
        <Dimmer active>
          <Loader>
            {slow
              ? "Whoops, the server's a bit slow right now..."
              : "Loading..."}
          </Loader>
        </Dimmer>
      ) : (
        <Container>
          <Header as="h1" style={{ marginTop: "22px" }}>
            Blog
          </Header>
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

          <Divider />
          {posts.map((post) => {
            return (
              <Segment stacked raised key={post.id}>
                <small style={{ color: "#6E7B8E" }}>
                  {new Date(post.createdAt).toDateString()}
                </small>
                <Link to={`/posts/${post.id}`}>
                  <Header as="h5" style={{ margin: "7px 0 7px 0" }}>
                    {post.title}
                  </Header>
                </Link>
                <small style={{ color: "#73757D" }}>
                  {post.body.substring(0, 75)} ...
                </small>
              </Segment>
            )
          })}
          {paginatedPosts ? displayPaginationNav() : null}
        </Container>
      )}
    </React.Fragment>
  )
}
