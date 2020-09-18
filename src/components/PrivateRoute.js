import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import Context from "./Provider"

export default function PrivateRoute({ children, componentProps, ...rest }) {
  const { user } = useContext(Context)

  return (
    <Route {...rest} render={() => (user ? children : <Redirect to="/" />)} />
  )
}
