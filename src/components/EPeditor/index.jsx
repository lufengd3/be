import * as React from 'react';

export interface IProps {
  title: string;
}

function Playground({title = ''}: IProps) {
  if (!title) {
    throw new Error('need playground url');
    return null;
  }

  return (
    <div>{title}</div>
  );
}

export default Playground;