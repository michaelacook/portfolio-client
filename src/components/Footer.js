import React from "react"
import { Container, Divider } from "semantic-ui-react"

export default function Footer() {
  return (
    <Container style={{ marginTop: "50px", marginBottom: "25px" }}>
      <Divider />
      <p className="text-center">
        <small className="text-secondary">
          This site was built as a Single Page Application using React.js and
          the Express framework. Like what I've done? Have a look at the{" "}
          <a
            target="_blank"
            href="https://github.com/michaelacook/portfolio-client"
          >
            repo
          </a>
          .
        </small>
      </p>
      <div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a href="https://github.com/michaelacook" target="_blank">
              <img
                class="mr-2"
                src="https://img.icons8.com/small/16/000000/github.png"
              />
            </a>
            <a href="https://www.linkedin.com/in/michael-cook-47151118a/">
              <img
                class="mr-2"
                src="https://img.icons8.com/small/16/000000/linkedin.png"
              />
            </a>
            {/* <a>
              <img src="https://img.icons8.com/small/16/000000/twitter.png" />
            </a> */}
            {/* 
          <div>
            <a href="https://icons8.com/icon/44411/twitter">Twitter icon by Icons8</a>
            <a href="https://icons8.com/icon/44900/github">GitHub icon by Icons8</a>
            <a href="https://icons8.com/icon/44914/linkedin">LinkedIn icon by Icons8</a>
          </div>
          */}
          </div>
        </div>
      </div>
    </Container>
  )
}
