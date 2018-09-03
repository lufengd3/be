import * as React from 'react';
import './demo.css';

interface Iprops {
  color?: string;
  scale?: number;
  opacity?: number;
}

interface Istate {
  style?: {}
}

class Demo extends React.Component<Iprops, Istate> {
  // constructor(props: Iprops) {
  //   super(props);
  // }

  public render() {
    const {props} = this;
    const textStyle = {
      color: props.color || '#333333',
      opacity: props.opacity || 1,
      scale: props.scale || 1
    };

    return (
      <div className="demo-container">
        <span className="demo-text" style={textStyle}>Demo</span>
      </div>
    );
  }
}

export default Demo;