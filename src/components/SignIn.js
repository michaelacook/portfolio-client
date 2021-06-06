import React, { useContext, useState, Fragment } from "react"
import { Button, Checkbox, Header, Grid, Input } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import Form from "./Form"
import Content from "./Content"
import Context from "./Provider"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [staySignedIn, setStaySignedIn] = useState(false)
  const history = useHistory()
  const { service, signIn } = useContext(Context)

  function submit() {
    signIn(email, password, staySignedIn)
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
            <Header as="h1">Sign In</Header>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    fluid
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    value={email}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    fluid
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    value={password}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button onClick={submit}>Sign In</Button>
                  <br />
                  <Checkbox
                    onChange={(e) => {
                      setStaySignedIn(!staySignedIn)
                    }}
                    style={{ marginTop: "10px" }}
                    label="Keep me signed in"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        )}
      />
    </Content>
  )
}
