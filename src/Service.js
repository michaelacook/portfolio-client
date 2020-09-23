// interact with the API
import apiURL from "./api_url"

export default class Service {
  /**
   * Base HTTP request method
   * @param {String} url - API endpoint
   * @param {String} method - HTTP verb, default GET
   * @param {Object} body - HTTP payload, default null
   * @param {Object} credentials - username (email) and password for Basic auth, default null
   * Headers must be an object
   * body must be a JSON string
   * @return {String} JSON stringified object
   */
  static request(
    url,
    method = "GET",
    body = null,
    credentials = null,
    headers = { "Content-Type": "application/json; charset=utf-8" }
  ) {
    const options = {
      method,
      headers: {},
    }

    if (headers != null) {
      options["headers"] = headers
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    if (credentials) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      )
      options.headers["Authorization"] = `Basic ${encodedCredentials}`
    }
    return fetch(url, options)
  }

  /**
   * Send GET request with Authorization header to authenticate with server
   * @param {String} email
   * @param {String} password
   * @return {Object} user on response status 200
   * @return {Promise} error on response status 401
   */
  static async authenticate(emailAddress, password) {
    const response = await Service.request(`${apiURL}/user`, "GET", null, {
      emailAddress,
      password,
    })
    if (response.status === 200) {
      const user = await response.json().then((data) => data)
      return user
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 401) {
      throw new Error("Not Authorized")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Get all projects from the server
   */
  static async getProjects() {
    const response = await Service.request(`${apiURL}/projects`)
    if (response.status === 200) {
      return response.json().then((data) => data)
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Get a single project from the server
   */
  static async getOneProject(id) {
    const response = await Service.request(`${apiURL}/projects/${id}`)
    if (response.status === 200) {
      return response.json().then((data) => data)
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Delete a project
   */
  static async deleteProject(id, emailAddress, password) {
    const response = await Service.request(
      `${apiURL}/projects/${id}/delete`,
      "DELETE",
      null,
      { emailAddress, password }
    )
    if (response.status === 204) {
      return Promise.resolve(true)
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Add a project
   * @param {Object} payload - http body--must contain title, description, technologies
   * @param {String} email
   * @param {String} password
   */
  static async addProject(payload, emailAddress, password) {
    const response = await Service.request(
      `${apiURL}/projects/add`,
      "POST",
      payload,
      { emailAddress, password }
    )
    if (response.status === 201) {
      return true
    } else if (response.status === 401) {
      throw new Error("Not Authorized")
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Upload a project image
   * @param {Object} payload - http body
   * @return {Promise} true on success
   * @return {Promise} string on fail
   */
  static async uploadImage(payload, email, password) {
    try {
      const encodedCredentials = btoa(`${email}:${password}`)

      const options = {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
      const response = await fetch(`${apiURL}/projects/upload`, {
        method: "POST",
        body: payload,
        options,
      })
      return true
    } catch (error) {
      Promise.reject(error.message)
    }
  }

  /**
   * Add a post
   * @param {Object} payload - http body
   * @param {String} email
   * @param {String} password
   */
  static async addPost(payload, emailAddress, password) {
    const response = await Service.request(
      `${apiURL}/posts/add`,
      "POST",
      payload,
      { emailAddress, password }
    )
    if (response.status === 201) {
      const postId = await response.json()
      return postId
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 401) {
      throw new Error("Not Authorized")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Get a single post from the database
   * @param {Number} id - PK for post
   */
  static async getOnePost(id) {
    const response = await Service.request(`${apiURL}/posts/${id}`)
    if (response.status === 200) {
      const post = await response.json()
      return post
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Get an array of all posts
   */
  static async getAllPosts() {
    const response = await Service.request(`${apiURL}/posts`)
    if (response.status === 200) {
      const posts = await response.json()
      return posts
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }

  /**
   * Search posts by title
   * @param {String} keyword - passed by user
   */
  static async searchPosts(keyword) {
    const response = await Service.request(`${apiURL}/posts/search/${keyword}`)
    if (response.status === 200) {
      const posts = await response.json()
      return posts
    } else if (response.status === 400) {
      throw new Error("Bad Request")
    } else if (response.status === 500) {
      throw new Error("Server Error")
    }
  }
}
