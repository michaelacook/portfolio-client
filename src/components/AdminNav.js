import React from "react"
import { Link } from "react-router-dom"

export default function AdminNav() {
  return (
    <div className="alert alert-secondary shadow">
      <div className="container d-flex justify-content-between pl-5 pr-5">
        <span>
          <Link to="/projects/new" className="btn btn-outline-primary mr-2 pt-4 pb-4">
            New Project
          </Link>
          <Link to="/posts/new" className="btn btn-outline-primary mr-2 pt-4 pb-4">
            New Post
          </Link>
        </span>
        <span>
          <Link to="/signout" className="btn btn-outline-primary pt-4 pb-4">
            Sign Out
          </Link>
        </span>
      </div>
    </div>
  )
}
