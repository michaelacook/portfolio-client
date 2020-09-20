import React from "react"
import { Link } from "react-router-dom"
import Content from "./Content"

export default function Admin() {
  return (
    <Content>
      <h1>Admin Dashboard</h1>

      <div className="row">
        <div className="col-4 pb-3 border rounded mr-4">
          <h5 className="mt-2">Manage Posts</h5>
          <Link to="/posts/new" className="btn btn-lg btn-outline-success">New Post</Link>
        </div>

        <div className="col-4 pb-3 border rounded">
          <h5 className="mt-2">Manage Projects</h5>
          <Link to="/projects/new" className="btn btn-lg btn-outline-success">New Project</Link>
        </div>
      </div>
    </Content>
  )
}