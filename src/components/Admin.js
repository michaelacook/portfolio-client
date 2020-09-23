import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Content from "./Content"
import Context from "./Provider"

export default function Admin() {
  const { service, user } = useContext(Context)
  const [projects, setProjects] = useState([])
  const [projectToDelete, setProjectToDelete] = useState(null)

  useEffect(() => {
    service.getProjects().then((projects) => {
      setProjects(projects)
    })
  }, [])

  /**
   * Send request to delete a project
   */
  function deleteProject() {
    const { email, password } = user
    service.deleteProject(projectToDelete, email, password)
  }

  return (
    <Content>
      <h1>Admin Dashboard</h1>

      <div className="row">
        <div className="col-4 pb-3 border rounded mr-4">
          <h5 className="mt-2">Manage Posts</h5>
          <Link to="/posts/new" className="btn btn-lg btn-outline-success">
            New Post
          </Link>
        </div>

        <div className="col-4 pb-3 border rounded">
          <h5 className="mt-2">Manage Projects</h5>
          <Link to="/projects/new" className="btn btn-lg btn-outline-success">
            New Project
          </Link>
          <label htmlFor="">Delete a project</label>
          <select
            onChange={(e) => setProjectToDelete(e.target.value)}
            class="form-control"
          >
            <option>Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          <button
            onClick={deleteProject}
            className="btn btn-sm btn-block btn-primary"
          >
            Go
          </button>
        </div>
      </div>
    </Content>
  )
}
