import React from "react"
import { NavLink } from "react-router-dom"
import AdminNav from "./AdminNav"

export default function Navbar({ user }) {
  return (
    <div>
      <nav class="navbar bg-green shadow">
        <div class="container d-flex justify-content-between">
          <NavLink
            style={{ fontSize:18 }}
            exact
            to="/"
            className="navbar-brand text-light font-weight-bold"
            href="index.html"
          >
          {/* 💾  */}
            Michael Cook
          </NavLink>
          {user ? (
            <span>
              <NavLink to="/about" className="text-light mr-2">
                About
              </NavLink>
              <NavLink to="/blog" className="text-light mr-2">
                Blog
              </NavLink>
              <NavLink to="/admin" className="text-light">
                Admin
              </NavLink>
            </span>
          ) : (
            <span>
              <NavLink to="/about" className="text-light mr-2">
                About
              </NavLink>
              <NavLink to="/blog" className="text-light">
                Blog
              </NavLink>
            </span>
          )}
        </div>
      </nav>
    </div>
  )
}
