import React from "react"

// wrap all children in the properly styled div element

export default function Content(props) {
  return <div className="container content p-5">{props.children}</div>
}
