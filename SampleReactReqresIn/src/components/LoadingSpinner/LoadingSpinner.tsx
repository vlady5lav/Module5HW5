import React, { ReactElement } from 'react';
import { Container, Spinner } from 'react-bootstrap';

const LoadingSpinner = (): ReactElement => (
  <Container className="centered">
    <span>Loading... </span>
    <Spinner animation="border" role="status" className="centered">
      <span className="centered hidden">hiddenText</span>
    </Spinner>
  </Container>
);

export default LoadingSpinner;
