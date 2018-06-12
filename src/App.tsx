import * as React from 'react';
import './App.css';
import EPeditor from './components/EPeditor';
import Playground from './components/Playground';

const playgroundUrl: string = 'https://jsplayground.taobao.org/raxplayground/f1d1a5c7-dfb7-41cb-8da1-f442e1b4910a';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <EPeditor title="Hello" />
        <Playground url={playgroundUrl} />
      </div>
    );
  }
}

export default App;
