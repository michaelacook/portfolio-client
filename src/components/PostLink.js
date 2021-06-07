import React from "react"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { Button, Card, Image } from "semantic-ui-react"
import Context from "../context/Provider"

export default function PostLink({ post }) {
  return (
    <React.Fragment>
      <Card raised fluid>
        <Image
          src={
            "https://michael-cook-portfolio-api.herokuapp.com/static/images/nodelogo.png"
          }
        />
        <Card.Content>
          <Card.Header>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </Card.Header>
          <Card.Description>
            <ReactMarkdown source={post.body.substring(0, 75) + "..."} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          {post.tags.map((tag) => (
            <Button size="tiny" compact style={{ margin: "2px" }}>
              {tag}
            </Button>
          ))}
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}
