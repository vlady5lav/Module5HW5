import React from 'react';
import { Card } from 'react-bootstrap';

interface Props {
  resource: {
    id: string;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
  } | null;
}

const ResourceCard = (props: Props) => {
  if (!props.resource) {
    return null;
  }
  const { id, name, year, color, pantone_value } = props.resource;

  return (
    <Card key={id}>
      <Card.Header>{id ? React.createElement('span', null, `ID: ${id}`) : React.createElement('span', { className: 'hidden' }, 'hiddenText')}</Card.Header>
      <Card.Body>
        <Card.Title>
          &quot;{name.toUpperCase()}&quot;
          <br />
          <br />
        </Card.Title>
        <Card.Text>
          Year: {year}
          <br />
          Color: &quot;{color}&quot;
          <br />
          Pantone Value:
          <br />
          &quot;{pantone_value}&quot;
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ backgroundColor: `${color}` }}>{React.createElement('span', { className: 'hidden' }, 'hiddenText')}</Card.Footer>
    </Card>
  );
};

export default ResourceCard;
