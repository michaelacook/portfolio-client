import React from "react"
import { Container } from "semantic-ui-react"

// wrap all children in the properly styled Container

export default function Content(props) {
  return (
    <Container
      className="container content"
      style={{
        minHeight: "75vh",
        padding: "40px",
      }}
    >
      {props.children}
    </Container>
  )
}
