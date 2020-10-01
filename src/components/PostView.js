import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import Post from "./Post"
import Content from "./Content"
import Context from "./Provider"
import Tags from "./Tags"

export default function ViewPost() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [date, setDate] = useState("")
  const [errors, setErrors] = useState("")
  const { service, user } = useContext(Context)
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    service
      .getOnePost(id)
      .then((data) => {
        setTitle(data.title)
        setBody(data.body)
        setTags(data.tags)
        setDate(new Date(data.createdAt).toDateString())
      })
      .catch((error) => {
        setErrors(error.message)
      })
  }, [])

  function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const { email, password } = user
      service
        .deletePost(id, email, password)
        .then(() => {
          history.push("/admin")
        })
        .catch((error) => {
          setErrors(error.message)
        })
    }
  }

  return (
    <Content>
      <h1 className="mb-5">{title}</h1>
      <small className="text-muted">&#x1F550; Published {date}</small>
      <Tags tags={tags} />
      <article className="mt-3">
        <Post input={body} />
      </article>
      {user ? (
        <button onClick={deletePost} className="btn btn-block btn-danger">
          Delete Post
        </button>
      ) : null}
    </Content>
  )
}
