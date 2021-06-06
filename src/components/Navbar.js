import React from "react"
import { NavLink } from "react-router-dom"
import { Container, Segment, Menu } from "semantic-ui-react"
import NotificationBadge from "./NotificationBadge"

export default function Navbar({ user, messages }) {
  return (
    <Segment inverted style={{ borderRadius: "0" }}>
      <Menu inverted secondary>
        <Container>
          <Menu.Item header as={NavLink} to="/" exact>
            Michael Cook
          </Menu.Item>
          <Menu.Item as={NavLink} to="/about" name="About" />
          <Menu.Item as={NavLink} to="/blog" name="Blog" />
          <Menu.Item as={NavLink} to="/contact" name="Contact" />
          {user ? (
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/messages">
                Messages
                <NotificationBadge messages={messages} />
              </Menu.Item>
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
