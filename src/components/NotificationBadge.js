import React from "react"

export default function NotificationBadge({ messages }) {
  return messages.filter((msg) => !msg.read).length ? (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "30%",
        backgroundColor: "#E0321C",
        textAlign: "center",
        paddingTop: "3px",
        marginLeft: "3px",
      }}
    >
      <span style={{ margin: "0 auto" }}>{messages.length}</span>
    </div>
  ) : null
}
