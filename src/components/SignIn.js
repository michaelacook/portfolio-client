import React, { useContext, useState, Fragment } from "react"
import { useHistory } from "react-router-dom"
import Form from "./Form"
import Content from "./Content"
import Context from "./Provider"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const { service, signIn } = useContext(Context)

  function submit() {
    signIn(email, password)
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        console.log(error)
        setError(error.message)
      })
  }

  return (
    <Content>
      <Form
        submit={submit}
        elements={() => (
          <Fragment>
            <div class="d-flex justify-content-center mt-5">
              <div class="col-10-sm col-5">
                <h3 class="text-center">Sign In</h3>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  class="form-control mb-3"
                  placeholder="Email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  class="form-control mb-3"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  class="btn btn-lg btn-block bg-blue text-white"
                >
                  Sign In
                </button>
                {error ? (
                  <h5 class="text-danger text-center">{error}</h5>
                ) : null}
              </div>
            </div>
          </Fragment>
        )}
      />
    </Content>
  )
}
