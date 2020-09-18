import React from "react"

/**
 * Map over array of tags and return styled elements
 * Render styled tag elements
 * @param {Array} destructure tags array from props
 */
export default function Tags({ tags }) {
  function createTagElements() {
    if (tags) {
      const tagElements = tags.map((tag, i) => {
        return (
          <div
            className="tag badge bg-green text-white mr-2 mb-3 p-2"
            key={i}
            data-index={i}
          >
            {tag}
          </div>
        )
      })
      return tagElements
    }
  }
  return <div className="mt-3">{createTagElements()}</div>
}
