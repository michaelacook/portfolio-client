import React from "react"

// reusable form component

export default function Form(props) {
  function submit(e) {
    e.preventDefault()
    props.submit()
  }

  return <form onSubmit={submit}>{props.elements()}</form>
}
