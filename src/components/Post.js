import React from "react"
import ReactMarkdown from "react-markdown"
import CodeBlock from "./CodeBlock"

export default function Post({ input }) {
  return <ReactMarkdown source={input} renderers={{ code: CodeBlock }} />
}
