import React from 'react';

interface Props {
  error: string | null;
}

const ErrorMessage = (props: Props) => {
  if (!props.error) {
    return null;
  }

  return <p style={{ color: 'red', fontSize: 14 }}>{props.error}</p>;
};

export default ErrorMessage;
