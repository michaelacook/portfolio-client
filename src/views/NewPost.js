import React, { useState, useEffect, useContext, useRef, Fragment } from "react"
import { useHistory } from "react-router-dom"
import { Button, Container, Header, Icon } from "semantic-ui-react"
import Form from "../components/Form"
import Context from "../context/Provider"
import MarkDownCheatSheet from "../components/MarkDownCheatSheet"

export default function NewPost(props) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [numberOfTags, setNumberOfTags] = useState(0)
  const [errors, setErrors] = useState("")
  const tagsRefContainer = useRef("")
  const history = useHistory()
  const { service, user } = useContext(Context)
  const state = history.location.state

  /**
   * If previous location is preview, set state to display previous values
   */
  useEffect(() => {
    if (state) {
      if (state.title && state.body) {
        setTitle(state.title)
        setBody(state.body)
      }
      if (state.tags) {
        setTags(state.tags)
      }
    }
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
      .then((postId) => {
        history.push(`/posts/${postId}`)
      })
      .catch((error) => {
        setErrors(error.message)
      })
  }

  function cancel(e) {
    e.preventDefault()
    history.push("/")
  }

  /**
   * Send current state to preview for display
   * @param {Object} e - browser event
   */
  function sendStateToPreview(e) {
    e.preventDefault()
    if (title && body) {
      history.push({
        pathname: "/posts/new/preview",
        state: {
          title,
          body,
          tags,
        },
      })
    }
  }

  /**
   * Remove a tag from state and display
   * @param {Object} e - browser event
   */
  function removeTag(e) {
    const index = e.target.getAttribute("data-index")
    setTags((prevTags) =>
      prevTags.filter((tag, i) => {
        return i != index
      })
    )
  }

  /**
   * Add a tag to state
   * Runs when the user keyDowns the enter key
   * @param {Object} e - browser event
   */
  function addTag(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const val = e.target.value
      setTags([...tags, val])
      tagsRefContainer.current.value = ""
    }
  }

  /**
   * Map over tags and return an array of tag elements
   */
  function createTagElements() {
    if (tags) {
      const tagElements = tags.map((tag, i) => {
        return (
          <div
            onClick={(e) => removeTag(e)}
            className="tag badge bg-green text-white mr-2 mb-2 p-2"
            key={i}
            data-index={i}
          >
            {tag}
            &times;
          </div>
        )
      })
      return tagElements
    }
  }

  /**
   * Handle browser submit event
   * @param {Object} e - browser event
   */
  function submit(e) {
    e.preventDefault()
  }

  return (
    <Container>
      <Form
        submit={publishPost}
        elements={() => (
          <Fragment>
            <Header style={{ marginTop: "30px" }} as="h3">
              New Post
            </Header>
            <div class="col p-0">
              <input
                type="text"
                value={title}
                name="title"
                class="form-control mb-4"
                placeholder="Title - this should be the same as the title you put in the body!"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={body}
                name="body"
                class="form-control mb-2"
                placeholder="Blog in markdown!"
                rows="15"
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <MarkDownCheatSheet />
              <div className="tags mt-4 mb-4">
                {createTagElements()}
                <input
                  onKeyDown={(e) => addTag(e)}
                  ref={tagsRefContainer}
                  type="text"
                  placeholder="Tags..."
                  class="form-control mt-2"
                />
              </div>
              <div>
                <Button onClick={(e) => sendStateToPreview(e)}>Preview</Button>
                <Button type="submit" color="green">
                  <Icon name="thumbs up" />
                  Publish
                </Button>
                <Button color="red" onClick={cancel}>
                  <Icon name="minus circle" />
                  Cancel
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      />
    </Container>
  )
}
