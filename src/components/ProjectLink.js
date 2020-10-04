import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import Context from "./Provider"

export default function ProjectLink({ id, title, img_url }) {
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
    <span>
      <span className="text-wrap">
        <Link to={`/projects/${id}`}>
          <img
            style={{ width: 300 }}
            src={img_url}
            className="portfolio-img rounded"
          />
          <h5 className="text-center">{title.toUpperCase()}</h5>
        </Link>
        <span className="d-block d-flex justify-content-center p-0">
          {user ? (
            <span>
              <button className="btn btn-sm btn-success mr-2">Edit</button>
              <button
                onClick={() => deleteProject()}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </span>
          ) : null}
        </span>
      </span>
    </span>
  )
}
