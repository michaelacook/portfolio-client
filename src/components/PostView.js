import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
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
  const { service } = useContext(Context)
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

  return (
    <Content>
      <h1 className="mb-5">{title}</h1>
      <small className="text-muted">&#x1F550; Published {date}</small>
      <Tags tags={tags} />
      <article className="mt-3">
        <Post input={body} />
      </article>
    </Content>
  )
}
