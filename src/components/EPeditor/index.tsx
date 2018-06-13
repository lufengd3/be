import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import './index.css';

class Playground extends React.Component<
  {},
  {
    duration: number;
    exitExpression?: string;
    selectedItem?: { key: string | number | undefined };
  }
  > {
  constructor(props: {}) {
    super(props);

    const duration = 1;

    this.state = {
      duration,
      exitExpression: this.getExitExpression(duration),
      selectedItem: undefined,
    };
  }

  public getExitExpression = (duration: number): string => {
    return `t>${duration}`;
  }

  public changeState = (item: IDropdownOption): void => {
    this.setState({ selectedItem: item });
  }

  public updateExitExpression = (value: any): void => {
    // tslint:disable-next-line
    this.setState({
      duration: value,
      exitExpression: this.getExitExpression(value)
    });
  }

  public render() {
    const { selectedItem, exitExpression, duration } = this.state;

    return (
      <div className="editor-container">
        <div className="conf-group">
          <Dropdown
            label="EventType"
            selectedKey={selectedItem ? selectedItem.key : undefined}
            onChanged={this.changeState}
            defaultSelectedKey={'timing'}
            options={[
              { key: 'pan', text: 'pan' },
              { key: 'timing', text: 'timing' },
              { key: 'scroll', text: 'scroll' },
              { key: 'orientation', text: 'orientation' }
            ]}
          />
        </div>

        <div className="conf-group">
          <Slider
            label="duration"
            min={1}
            max={5000}
            step={10}
            defaultValue={duration}
            showValue={true}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={this.updateExitExpression}
          />
        </div>

        <div className="conf-group keep-bottom">
          <TextField placeholder="expression..." ariaLabel="copy expression here."
            multiline={true} rows={4} 
            value={exitExpression}
          />
        </div>

      </div>
    );
  }
}

export default Playground;