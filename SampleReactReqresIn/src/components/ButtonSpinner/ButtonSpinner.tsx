import React, { MouseEventHandler, ReactElement } from 'react';
import { Button, Spinner } from 'react-bootstrap';

interface Props {
  isLoading: boolean;
  text?: string;
  queryString?: string | boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: string;
  onClick?: MouseEventHandler;
}

const ButtonSpinner = (props: Props): ReactElement => {
  const { isLoading, text, queryString, type, variant, onClick } = props;

  return (
    <Button disabled={!queryString} variant={variant} onClick={onClick} type={type}>
      {isLoading ? <Spinner animation="border" size="sm" /> : `${text}`}
    </Button>
  );
};

export default ButtonSpinner;
