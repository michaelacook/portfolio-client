import React from "react"
import { NavLink } from "react-router-dom"
import { Button, Container, Segment, Menu } from "semantic-ui-react"
import AdminNav from "./AdminNav"

export default function Navbar({ user }) {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Container>
          <Menu.Item header as={NavLink} to="/" exact>
            Michael Cook
          </Menu.Item>
          <Menu.Item as={NavLink} to="/about" name="About" />
          <Menu.Item as={NavLink} to="/blog" name="Blog" />
          {user ? (
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/posts/new" name="New Post" />
              <Menu.Item as={NavLink} to="/admin" name="Admin" />
              <Menu.Item as={NavLink} to="/signout" name="Signout" />
            </Menu.Menu>
          ) : null}
        </Container>
      </Menu>
    </Segment>
  )
}
