import React from "react"
import { Link } from "react-router-dom"

export default function ProjectLink({ id, title, img_url }) {
  return (
    <span>
      <Link to={`/projects/${id}`}>
        <img
          style={{ width: 300 }}
          src={img_url}
          className="portfolio-img rounded"
        />
        <h5 className="text-center">{title.toUpperCase()}</h5>
      </Link>
    </span>
  )
}