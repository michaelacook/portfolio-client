import React from "react"
import ReactMarkdown from "react-markdown"
import CodeBlock from "../components/CodeBlock"
import { Container, Header } from "semantic-ui-react"
import input from "../about-text"

export default function About() {
  return (
    <Container style={{ padding: "0 40px 0 40px" }}>
      <Header as="h1" style={{ marginTop: "25px" }}>
        About Me
      </Header>
      <div className="p-0 custom-container">
        {/* <img src="/images/.jpg" className="img-fluid mx-auto d-block" /> */}
        <ReactMarkdown source={input} renderers={{ code: CodeBlock }} />
      </div>
    </Container>
  )
}
