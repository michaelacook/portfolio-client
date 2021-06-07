import React, { useState, useEffect, useContext } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Post from "./Post"
import Tags from "../components/Tags"
import Content from "../components/Content"
import Context from "../context/Provider"

export default function Project() {
  const [project, setProject] = useState("")
  const { service } = useContext(Context)
  const { id } = useParams()

  useEffect(() => {
    service.getOneProject(id).then((project) => {
      setProject(project)
      console.log(project)
    })
  }, [])

  return (
    <Content>
      <div className="d-flex justify-content-between">
        <div>
          {!project ? (
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : null}
          <h1>{project.title}</h1>
          <h5>Technologies:</h5>
          <Tags tags={project.technologies} />
        </div>

        <div className="col-5 mt-5 ml-3">
          <a
            className="btn btn-block btn-success"
            href={project.repo_url}
            target="_blank"
          >
            View Repo
          </a>
          <a
            className="btn btn-block btn-primary"
            href={project.live_link}
            target="_blank"
          >
            View Live Demo
          </a>
        </div>
      </div>

      <img className="img-fluid mt-3 mb-2 shadow" src={project.img_url} />
      <h4>Description</h4>
      <Post input={project.description} />
    </Content>
  )
}
