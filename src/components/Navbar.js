import React from "react"
import { NavLink } from "react-router-dom"
import AdminNav from "./AdminNav"

export default function Navbar({ user }) {
  return (
    // <div>
    //   <nav class="navbar bg-green shadow">
    //     <div class="container d-flex justify-content-between">
    //       <NavLink
    //         style={{ fontSize: 18 }}
    //         exact
    //         to="/"
    //         className="navbar-brand text-light font-weight-bold"
    //         href="index.html"
    //       >
    //         Michael Cook
    //       </NavLink>
    //       {user ? (
    //         <span className="">
    //           <NavLink to="/about" className="text-light mr-2">
    //             About
    //           </NavLink>
              // <NavLink to="/blog" className="text-light mr-2">
              //   Blog
              // </NavLink>
    //           <NavLink to="/admin" className="text-light mr-2">
    //             Admin
    //           </NavLink>
    //           <NavLink to="/signout" className="text-light mr">
    //             Sign Out
    //           </NavLink>
    //         </span>
    //       ) : (
    //         <span>
    //           <NavLink to="/about" className="text-light mr-2">
    //             About
    //           </NavLink>
    //           <NavLink to="/blog" className="text-light">
    //             Blog
    //           </NavLink>
    //         </span>
    //       )}
    //     </div>
    //   </nav>
    // </div>

    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-green shadow">
        <div className="container pl-5 pr-5 pb-2 pt-2">
          <NavLink exact to="/" className="navbar-brand text-light font-weight-bold">
            Michael Cook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLink to="/about" className="text-light mr-2">
              About
            </NavLink>
            <NavLink to="/blog" className="text-light mr-2">
              Blog
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  )
}
