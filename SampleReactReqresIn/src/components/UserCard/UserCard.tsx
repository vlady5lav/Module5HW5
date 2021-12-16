import React from 'react';
import { Card } from 'react-bootstrap';

interface Props {
  user: {
    id: number | string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  } | null;
}

const UserCard = (props: Props) => {
  if (!props.user) {
    return null;
  }

  const { id, email, first_name, last_name, avatar } = props.user;

  return (
    <Card key={id}>
      <Card.Header>{id ? React.createElement('span', '', `ID: ${id}`) : React.createElement('span', { className: 'hidden' }, 'hiddenText')}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" className="avatar" src={avatar} />
        <Card.Title>{email}</Card.Title>
        <Card.Text>
          {first_name} {last_name}
        </Card.Text>
      </Card.Body>
      <Card.Footer>{React.createElement('span', { className: 'hidden' }, 'hiddenText')}</Card.Footer>
    </Card>
  );
};

export default UserCard;
