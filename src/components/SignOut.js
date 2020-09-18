import React from "react"
import { useHistory } from "react-router-dom"

export default function SignOut({ signOut }) {
  const history = useHistory()
  signOut()
  history.push("/")
  return null
}
