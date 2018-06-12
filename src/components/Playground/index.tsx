import * as React from 'react';

export interface IProps {
  url: string;
}

function Playground({url}: IProps) {
  if (!url) {
    throw new Error('need playground url');
  }

  return (
    <iframe src={url}></iframe>
  );
}

export default Playground;