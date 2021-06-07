import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Header, Segment } from "semantic-ui-react"
import Content from "../components/Content"

export default function MessageView() {
  const [name, setName] = useState("")
  const [from, setFrom] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const history = useHistory()
  const state = history.location.state

  useEffect(() => {
    const { from, subject, content, sender_name } = state
    setFrom(from)
    setSubject(subject)
    setContent(content)

    if (sender_name) {
      setName(state.sender_name)
    }
  })

  return (
    <Content
      style={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: "28px",
          borderRadius: "3px",
          border: "1px solid #CACBCD",
          minHeight: "55VH",
        }}
      >
        <Header as="h3">Subject: {subject}</Header>

        <Header
          as="h4"
          style={{
            display: "inline-block",
            marginRight: "5px",
          }}
        >
          {name ? name : null}
        </Header>
        <span>{`<${from}>`}</span>

        <p style={{ whiteSpace: "pre-line" }}>{content}</p>
      </div>
    </Content>
  )
}
