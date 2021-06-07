import React from "react"
import Content from "../components/Content"
import {
  Checkbox,
  Button,
  Header,
  Grid,
  Menu,
  Segment,
  Label,
  List,
} from "semantic-ui-react"
import { Link, useHistory } from "react-router-dom"

export default function Messages({ messages }) {
  const history = useHistory()

  function sendMessageToView(e, msg) {
    e.preventDefault()
    history.push({
      pathname: `messages/${msg.subject}`,
      state: msg,
    })
  }

  return (
    <Content>
      <Header as="h1">Messages {`(${messages.length})`}</Header>

      <Grid style={{ marginTop: "30px" }}>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item name="inbox" active={true}>
              {messages.filter((msg) => !msg.read).length ? (
                <Label color="red">
                  {messages.filter((msg) => !msg.read).length}
                </Label>
              ) : null}
              Inbox
            </Menu.Item>
            <Menu.Item name="Archived" active={false} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <List relaxed divided>
              {messages.length ? (
                messages.map((msg) => (
                  <List.Item>
                    <List.Content>
                      <List.Header
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <Checkbox
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                              paddingBottom: "12px",
                            }}
                          />
                          <div
                            style={{
                              display: "inline-block",
                              verticalAlign: "super",
                            }}
                          >
                            <div
                              onClick={(e) => {
                                sendMessageToView(e, msg)
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                }}
                              >
                                {msg.name || msg.from} {"  "}
                              </span>
                              <span style={{ color: "grey" }}>
                                - {msg.subject} {msg.content.substr(0, 45)}
                                <small>
                                  {msg.content.length > 45 ? "..." : null}
                                </small>
                              </span>
                            </div>
                          </div>
                        </span>

                        <span>
                          <Button icon="archive" size="tiny" />
                          <Button icon="trash" size="tiny" />
                        </span>
                      </List.Header>
                      {/* <List.Description>.</List.Description> */}
                    </List.Content>
                  </List.Item>
                ))
              ) : (
                <Header as="h4">You have no messages.</Header>
              )}
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    </Content>
  )
}
