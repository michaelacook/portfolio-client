import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { Button, Card, Icon, Image } from "semantic-ui-react"
import Context from "../context/Provider"

export default function ProjectLink({
  id,
  title,
  img_url,
  repoUrl,
  liveLink,
  description,
}) {
  const { user, service } = useContext(Context)
  const history = useHistory()

  /**
   * Delete a project when button is clicked
   */
  function deleteProject() {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const { id, email, password } = user
      service.deleteProject(id, email, password).then(() => {
        history.push("/")
      })
    }
  }

  return (
    <React.Fragment>
      <Card raised fluid>
        <Image src={img_url} />
        <Card.Content>
          <Card.Header textAlign="center">{title}</Card.Header>
          <Card.Description>
            <ReactMarkdown source={description} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Button as="a" href={liveLink} target="_blank" compact>
            Live Demo
          </Button>
          <Button as="a" href={repoUrl} target="_blank" compact>
            <Icon name="github" />
            Repo
          </Button>
          {user ? (
            <Button compact color="red" onClick={() => deleteProject()}>
              <Icon name="warning circle" />
              Delete
            </Button>
          ) : null}
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}
