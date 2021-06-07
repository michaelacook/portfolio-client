import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Content from "../components/Content"
import Context from "../context/Provider"

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

      <div className="row mt-5">
        <div className="col-4 pb-3 border rounded mr-4">
          <h5 className="mt-2">Manage Posts</h5>
          <Link to="/posts/new" className="btn btn-lg btn-link">
            New Post
          </Link>
        </div>

        <div className="col-4 pb-3 border rounded">
          <h5 className="mt-2">Manage Projects</h5>
          <Link to="/projects/new" className="btn btn-lg btn-link">
            New Project
          </Link>
        </div>
      </div>
    </Content>
  )
}
