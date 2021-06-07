import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import Content from "../components/Content"
import Post from "./Post"
import Context from "../context/Provider"
import Tags from "../components/Tags"

export default function PreviewPost(props) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [errors, setErrors] = useState("")
  const history = useHistory()
  const state = history.location.state
  const { service, user } = useContext(Context)

  useEffect(() => {
    setTitle(state.title)
    setBody(state.body)
    setTags(state.tags || [])
  }, [])

  function publishPost() {
    const { email, password } = user
    const payload = {
      title,
      body,
      tags,
    }
    service
      .addPost(payload, email, password)
      .then((id) => {
        history.push(`/posts/${id}`)
      })
      .catch((error) => {
        setErrors(error.message)
      })
  }

  /**
   * Send state back to /posts/new to edit before publishing
   * @param {Object} e - browser event
   */
  function edit(e) {
    e.preventDefault()
    history.push({
      pathname: "/posts/new",
      state: {
        title,
        body,
        tags,
      },
    })
  }

  return (
    <Content>
      <div className="col">
        <div className="post-display mb-5">
          <Post input={body} />
        </div>
        <Tags tags={tags} />
        <hr />
        <div className="mt-4">
          <button
            class="btn btn-lg bg-green text-light mr-2"
            onClick={(e) => edit(e)}
          >
            Edit
          </button>
          <button
            onClick={publishPost}
            className="btn btn-lg bg-blue text-light"
          >
            Publish
          </button>
        </div>
      </div>
    </Content>
  )
}
