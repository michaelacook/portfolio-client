import React, { Fragment, useState, useEffect, useContext, useRef } from "react"
import { useHistory } from "react-router-dom"
import bsCustomFileInput from "bs-custom-file-input"
import Content from "../components/Content"
import Context from "../context/Provider"
import Form from "../components/Form"

export default function NewProject(props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [repo_url, setRepo_url] = useState("")
  const [live_link, setLive_link] = useState("")
  const [img, setImg] = useState("")
  const [imgFileName, setImgFileName] = useState("")
  const [technologies, setTechnologies] = useState([])
  const [errors, setErrors] = useState("")
  const { service, user } = useContext(Context)
  const history = useHistory()
  const techTagsRefContainer = useRef("")

  useEffect(() => {
    bsCustomFileInput.init()
    console.log(user)
  }, [])

  /**
   * Add file and file name to state
   * @param {Object} e - browser event object
   */
  function setFile(e) {
    const file = e.target.files[0]
    setImg(file)
    setImgFileName(file.name)
  }

  /**
   * Add a project
   * @param {Object} e - browser event object
   */
  async function publishProject(e) {
    e.preventDefault()
    const { email, password } = user
    service
      .addProject(
        {
          title,
          description,
          repo_url,
          live_link,
          technologies,
          imgFileName,
        },
        email,
        password
      )
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        setErrors(error.message)
        console.log(error)
        console.log(error.message)
        console.log(error.stack)
      })
    const formData = new FormData()
    formData.append("img", img)
    await service.uploadImage(formData, email, password)
  }

  /**
   * Add a technology to state
   * Runs when the user keyDowns the enter key
   * @param {Object} e - browser event
   */
  function addTechTag(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const val = e.target.value
      setTechnologies([...technologies, val])
      techTagsRefContainer.current.value = ""
    }
  }

  /**
   * Map over tags and return an array of tag elements
   */
  function createTechTagagElements() {
    if (technologies) {
      const tagElements = technologies.map((tag, i) => {
        return (
          <div
            // onClick={(e) => removeTag(e)}
            className="tag badge bg-green text-white mr-2 mb-2 p-2"
            key={i}
            data-index={i}
          >
            {tag}
            &times;
          </div>
        )
      })
      return tagElements
    }
  }

  /**
   *
   * @param {Object} e - browser event
   */
  function cancel(e) {
    e.preventDefault()
    history.push("/")
  }

  return (
    <Content>
      <Form
        elements={() => (
          <Fragment>
            <h3>New Project</h3>
            <div className="row p-0">
              <div className="col-7-lg col-10-md col-sm">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control mb-3"
                  type="text"
                  placeholder="Title"
                />
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  placeholder="Description...in markdown!"
                  rows="15"
                ></textarea>
              </div>

              <div className="col-7-lg col-10-md col-sm mb-4">
                <input
                  onChange={(e) => setRepo_url(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Repo link"
                />
                <input
                  onChange={(e) => setLive_link(e.target.value)}
                  className="form-control"
                  placeholder="Live link"
                />
                <div className="custom-file">
                  <input
                    onChange={(e) => setFile(e)}
                    type="file"
                    class="custom-file-input"
                    id="picUpload"
                  />
                  <label for="picUpload" className="custom-file-label">
                    Choose a picture
                  </label>
                </div>
              </div>
            </div>

            <div className="col-6 mt-4 mb-4 p-0">
              {createTechTagagElements()}
              <input
                onKeyDown={(e) => addTechTag(e)}
                ref={techTagsRefContainer}
                type="text"
                placeholder="Technologies"
                className="form-control mt-2"
              />
            </div>

            <div>
              <button
                class="btn btn-lg bg-green text-light mr-2"
                // onClick={(e) => sendStateToPreview(e)}
              >
                Preview
              </button>
              <button
                onClick={publishProject}
                className="btn btn-lg bg-blue text-light mr-2"
              >
                Publish
              </button>
              <button
                className="btn btn-lg btn-secondary text-light"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          </Fragment>
        )}
      />
    </Content>
  )
}
