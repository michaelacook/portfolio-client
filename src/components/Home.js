import React, { useState, useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import Content from "./Content"
import Context from "./Provider"
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Loader,
} from "semantic-ui-react"
import ProjectLink from "./ProjectLink"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [slow, setSlow] = useState(false)
  const [projects, setProjects] = useState([])
  const [errors, setErrors] = useState("")
  const { service, user } = useContext(Context)

  useEffect(() => {
    service
      .getProjects()
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => {
        setErrors(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  setTimeout(() => {
    setSlow(true)
  }, 6000)

  return (
    <React.Fragment>
      {loading ? (
        <Dimmer active>
          <Loader>
            {slow
              ? "Whoops, the server's a bit slow right now..."
              : "Loading..."}
          </Loader>
        </Dimmer>
      ) : (
        <Container>
          <Header as="h2" style={{ marginTop: "22px" }}>
            Hey, I'm Michael🖖
          </Header>
          <p className="lead">
            I'm a software developer and JavaScript enthusiast. My favourite
            technologies are Node, Express, PostgreSQL, and React but I also
            dabble in PHP. This site is where I share the projects I'm most
            proud of and write about technology.
          </p>
          <Divider />
          <Grid
            stretched
            relaxed
            fluid
            stackable
            centered
            style={{ marginTop: "22px" }}
          >
            {projects.map((project) => (
              <Grid.Column tablet={8} computer={5}>
                <ProjectLink
                  title={project.title}
                  description={project.description}
                  repoUrl={project.repo_url}
                  liveLink={project.live_link}
                  id={project.id}
                  img_url={project.img_url}
                />
              </Grid.Column>
            ))}
          </Grid>
          <div className="d-flex justify-content-between flex-wrap mt-5">
            {user ? (
              <Link
                className="btn btn-lg btn-block btn-success"
                to="/projects/new"
              >
                New Project
              </Link>
            ) : null}
          </div>
        </Container>
      )}
    </React.Fragment>
  )
}
