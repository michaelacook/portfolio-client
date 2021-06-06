import React, { useState, useContext } from "react"
import Context from "./Provider"
import Content from "./Content"
import { Button, Form, Header } from "semantic-ui-react"
import { socket } from "../socket"

export default function Contact({ addMessageToState }) {
  const [subject, setSubject] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [sent, setSent] = useState(false)

  const { service, user } = useContext(Context)

  function handleSend() {
    if (email && content) {
      const message = {
        subject,
        from: email,
        content,
        read: false,
        archived: false,
      }
      if (name) {
        message["sender_name"] = name
      }

      service.addMessage(message, user.email, user.password).then((message) => {
        addMessageToState(message)
        setSent(true)
      })
    }
  }

  return (
    <Content>
      <Header as="h1">Contact</Header>
      <p
        style={{
          marginBottom: "30px",
        }}
      >
        Like the site? Need an app built? Drop me a line! I would love to hear
        from you.
      </p>

      {!sent ? (
        <Form>
          <Form.Field width={13}>
            <label>Name</label>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Form.Field>

          <Form.Field width={13} required>
            <label>Subject</label>
            <input
              placeholder="Name"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
              }}
            />
          </Form.Field>

          <Form.Field width={13} required>
            <label>Email</label>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </Form.Field>

          <Form.Field width={15} required>
            <label>Message</label>
            <Form.TextArea
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            ></Form.TextArea>
          </Form.Field>

          <Form.Field>
            <Button onClick={handleSend}>Send</Button>
          </Form.Field>
        </Form>
      ) : (
        <p>Thanks! Your message was sent</p>
      )}
    </Content>
  )
}
