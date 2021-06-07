import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom"
import { Provider } from "./context/Provider"
import { socket } from "./socket"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"
import Home from "./views/Home"
import About from "./views/About"
import Admin from "./views/Admin"
import Footer from "./components/Footer"
import NewPost from "./views/NewPost"
import PostView from "./views/PostView"
import PreviewPost from "./views/PreviewPost"
import NewProject from "./views/NewProject"
import Project from "./views/Project"
import SignIn from "./views/SignIn"
import SignOut from "./components/SignOut"
import Search from "./views/Search"
import Posts from "./views/Posts"
import Messages from "./views/Messages"
import MessageView from "./views/MessageView"
import Contact from "./views/Contact"
import Service from "./Service"
import Cookies from "js-cookie"

export default function App() {
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  )
  const [messages, setMessages] = useState([])
  const history = useHistory()

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user") || null))

    async function getMessages() {
      const messages = await Service.getMessages(user.email, user.password)
      setMessages(messages)
    }

    if (user) {
      getMessages()
    }
  }, [])

  function receiveMessage(msg) {
    setMessages([...messages, msg])
  }

  function getMessages() {
    Service.getMessages(user.email, user.password).then((messages) => {
      setMessages(messages)
    })
  }

  function addMessageToState(message) {
    setMessages([...messages, message])
  }

  socket.on("message", receiveMessage)

  /**
   * Call Service.authenticate, get user and persist in session
   * @param {String} emailAddress
   * @param {String} password
   */
  async function signIn(emailAddress, password, setCookie = false) {
    const response = await Service.authenticate(emailAddress, password)
    const { firstName, lastName, email } = response
    const user = {
      firstName,
      lastName,
      email,
      password,
    }
    if (setCookie) {
      Cookies.set("user", JSON.stringify(user), {
        expires: 28,
      })
    }
    setUser(user)
    getMessages()
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
        <Route
          path="*"
          render={() => <Navbar user={user} messages={messages} />}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/blog" component={Posts} />
          <Route exact path="/contact">
            <Contact addMessageToState={addMessageToState} />
          </Route>
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
          <PrivateRoute exact path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute exact path="/messages">
            <Messages messages={messages} />
          </PrivateRoute>
          <PrivateRoute exact path="/messages/:subject">
            <MessageView />
          </PrivateRoute>
        </Switch>
        <Route path="*" component={Footer} />
      </BrowserRouter>
    </Provider>
  )
}
