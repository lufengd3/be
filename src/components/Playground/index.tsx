import * as React from 'react';
import './index.css';

export interface IProps {
  url: string;
}

function Playground({url}: IProps) {
  if (!url) {
    throw new Error('need playground url');
  }

  return (
    <iframe className="playground-container" src={url} />
  );
}

export default Playground;