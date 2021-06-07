import React, { useState, useContext } from "react"
import Context from "./Provider"
import Content from "./Content"
import { Button, Form, Grid, Header } from "semantic-ui-react"

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
      <Header
        as="h1"
        style={{
          marginTop: "22px",
        }}
      >
        Contact
      </Header>
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
          <Grid stretched relaxed fluid stackable container={true}>
            <Grid.Row>
              <Grid.Column computer={13} mobile={16}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column computer={13} mobile={16}>
                <Form.Field required>
                  <label>Subject</label>
                  <input
                    placeholder="Name"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value)
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column computer={13} mobile={16}>
                <Form.Field required>
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column computer={13} mobile={16}>
                <Form.Field required>
                  <label>Message</label>
                  <Form.TextArea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                    }}
                  ></Form.TextArea>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column computer={13} mobile={16}>
                <Form.Field>
                  <Button onClick={handleSend}>Send</Button>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      ) : (
        <p>Thanks! Your message was sent</p>
      )}
    </Content>
  )
}
