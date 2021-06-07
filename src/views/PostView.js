import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Button, Container, Dimmer, Header, Loader } from "semantic-ui-react"
import Post from "./Post"
import Context from "../context/Provider"
import Tags from "../components/Tags"

export default function ViewPost() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [date, setDate] = useState("")
  const [errors, setErrors] = useState("")
  const { service, user } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [loaderText, setLoaderText] = useState("Loading...")
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    service
      .getOnePost(id)
      .then((data) => {
        setTitle(data.title)
        setBody(data.body)
        setTags(data.tags)
        setDate(new Date(data.createdAt).toDateString())
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        setErrors(error.message)
      })
  }, [])

  setTimeout(() => {
    setLoaderText("Whoopers, looks like the server's a bit slow...")
  }, 6000)

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
    <Container>
      {loading ? (
        <Dimmer active>
          <Loader>{loaderText}</Loader>
        </Dimmer>
      ) : (
        <React.Fragment>
          <Header as="h1" style={{ marginTop: "30px", marginBottom: "20px" }}>
            {title}
          </Header>
          <small style={{ color: "#49494A" }}>&#x1F550; Published {date}</small>
          {tags.length ? <Tags tags={tags} /> : null}
          <article style={{ marginTop: "23px" }}>
            <Post input={body} />
          </article>
          {user ? (
            <Button
              style={{ marginTop: "20px" }}
              onClick={deletePost}
              color="red"
              fluid
            >
              Delete Post
            </Button>
          ) : null}
        </React.Fragment>
      )}
    </Container>
  )
}
