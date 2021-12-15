import React from 'react'
import { Card } from 'react-bootstrap'

interface Props {
  user: {
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
  } | null
}

const UserCard = (props: Props) => {
  if (!props.user) {
    return null
  }
  const { email, first_name, last_name, avatar } = props.user

  return (
    <Card>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{email}</Card.Title>
        <Card.Text>
          {first_name} {last_name}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserCard
