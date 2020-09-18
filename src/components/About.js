import React from "react"
import ReactMarkdown from "react-markdown"
import CodeBlock from "./CodeBlock"
import Content from "./Content"
import input from "../about-text"

export default function About() {
  return (
    <Content>
      <h1 className="text-center mb-5">About Me</h1>
      <div className="p-0 custom-container">
        <ReactMarkdown source={input} renderers={{ code: CodeBlock }} />
      </div>
    </Content>
  )
}
