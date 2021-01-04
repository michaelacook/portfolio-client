import React from "react"
import { Button } from "semantic-ui-react"

/**
 * Map over array of tags and return styled elements
 * Render styled tag elements
 * @param {Array} destructure tags array from props
 */
export default function Tags({ tags }) {
  return (
    <div style={{ marginTop: "15px", marginBottom: "15px" }}>
      {tags.map((tag) => (
        <Button size="tiny" compact>
          {tag}
        </Button>
      ))}
    </div>
  )
}
