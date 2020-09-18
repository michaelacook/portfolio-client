import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom"
import { Provider } from "./Provider"
import PrivateRoute from "./PrivateRoute"
import Navbar from "./Navbar"
import Home from "./Home"
import About from "./About"
import AdminNav from "./AdminNav"
import Footer from "./Footer"
import NewPost from "./NewPost"
import PostView from "./PostView"
import PreviewPost from "./PreviewPost"
import NewProject from "./NewProject"
import Project from "./Project"
import SignIn from "./SignIn"
import SignOut from "./SignOut"
import Search from "./Search"
import Posts from "./Posts"
import Service from "../Service"
import Cookies from "js-cookie"

export default function App() {
  const [user, setUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user") || null))
  }, [])

  /**
   * Call Service.authenticate, get user and persist in session
   * @param {String} emailAddress
   * @param {String} password
   */
  async function signIn(emailAddress, password) {
    const response = await Service.authenticate(emailAddress, password)
    const { firstName, lastName, email } = response
    const user = {
      firstName,
      lastName,
      email,
      password,
    }
    Cookies.set("user", JSON.stringify(user), {
      expires: 28,
    })
    setUser(user)
  }

  /**
   * End user session
   */
  function signOut() {
    Cookies.remove("user")
    setUser(null)
  }

  return (
    <Provider
      value={{
        service: Service,
        signIn,
        user,
      }}
    >
      <BrowserRouter>
        <Route path="*" render={() => <Navbar user={user} />} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/blog" component={Posts} />
          <PrivateRoute exact path="/posts/new">
            <NewPost />
          </PrivateRoute>
          <Route exact path="/posts/:id" component={PostView} />
          <PrivateRoute exact path="/posts/new/preview">
            <PreviewPost />
          </PrivateRoute>
          <Route exact path="/posts/search/:keyword" component={Search} />
          <PrivateRoute exact path="/projects/new">
            <NewProject />
          </PrivateRoute>
          <Route exact path="/projects/:id" component={Project} />
          <Route exact path="/signin" component={SignIn} />
          <PrivateRoute exact path="/signout">
            <SignOut signOut={signOut} />
          </PrivateRoute>
        </Switch>
        <Route path="*" component={Footer} />
      </BrowserRouter>
    </Provider>
  )
}
