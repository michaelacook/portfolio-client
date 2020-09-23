import React, { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import Content from "./Content"
import Context from "./Provider"
import ProjectLink from "./ProjectLink"

export default function Home() {
  const [projects, setProjects] = useState([])
  const [errors, setErrors] = useState("")
  const { service } = useContext(Context)

  useEffect(() => {
    service
      .getProjects()
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => {
        setErrors(error.message)
      })
  }, [])

  return (
    <Content>
      <h2>Hey, I'm Michael🖖</h2>
      <p className="lead">
        I'm a web developer and JavaScript enthusiast seeking my first
        professional opportunity. This site is where I share the projects I'm
        most proud of, and write about technology.
      </p>
      <hr />
      <div className="d-flex justify-content-between flex-wrap mt-5">
        {projects.map((project) => (
          <ProjectLink
            title={project.title}
            id={project.id}
            img_url={project.img_url}
          />
        ))}
      </div>
      <hr />
      <p className="text-center">
        <small className="text-secondary">
          This site was built as a Single Page Application using React.js and
          the Express framework on the server side. Like what I've done? Have a
          look at the <a href="#">repo</a>.
        </small>
      </p>
    </Content>
  )
}
