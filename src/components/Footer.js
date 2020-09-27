import React from "react"

export default function Footer() {
  return (
    <div class="footer d-flex justify-content-center p-3 fixed">
      <div>
        <div class="d-flex justify-content-center">
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
          <a>
            <img src="https://img.icons8.com/small/16/000000/twitter.png" />
          </a>
          {/* 
          <div>
            <a href="https://icons8.com/icon/44411/twitter">Twitter icon by Icons8</a>
            <a href="https://icons8.com/icon/44900/github">GitHub icon by Icons8</a>
            <a href="https://icons8.com/icon/44914/linkedin">LinkedIn icon by Icons8</a>
          </div>
          */}
        </div>
        {/* <small className="text-muted mr-2">The <a href="https://github.com/michaelacook/portfolio-api">back-end of this site</a> was built on the Express framework, and the client was built with React.</small> */}
      </div>
    </div>
  )
}
