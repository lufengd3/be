import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import Demo from './demo';
import './index.css';

interface Istate {
  duration: number;
  elmProperty: { key: string | number | undefined };
  eventType: { key: string | number | undefined };
  exitExpression?: string;
  value: {
    color: string
  }
}

const eventTypeOptions = [
  { key: 'pan', text: '滑动' },
  { key: 'timing', text: '时间' },
  { key: 'scroll', text: '滚动' },
  // { key: 'orientation', text: 'orientation' }
];
const elmPropertyOptions = [
  { key: 'size', text: '大小' },
  { key: 'color', text: '颜色' },
  { key: 'bgcolor', text: '背景色' },
  { key: 'opacity', text: '透明度' },
  { key: 'translate', text: '位置' },
  { key: 'scale', text: '缩放' },
  { key: 'rotate', text: '旋转' },
];

class Playground extends React.Component<{}, Istate> {
  constructor(props: {}) {
    super(props);

    this.state = {
      duration: 0,
      elmProperty: elmPropertyOptions[0],
      eventType: eventTypeOptions[0],
      exitExpression: this.getExitExpression(0),
      value: {
        color: "#333333"
      }
    };
  }

  public getExitExpression = (duration: number): string => {
    return `t>${duration}`;
  }

  public changeEventType = (item: IDropdownOption): void => {
    this.setState({ 
      eventType: item 
    });
  }

  public changeElmProperty = (item: IDropdownOption): void => {
    this.setState({
      elmProperty: item
    });
  }

  public updateExitExpression = (value: any): void => {
    // tslint:disable-next-line
    this.setState({
      duration: value,
      exitExpression: this.getExitExpression(value)
    });
  }

  public getDurationTool = (): JSX.Element | null => {
    const {eventType, duration} = this.state;

    if (eventType.key !== 'timing') {
      return null;
    }

    return (
      <div className="conf-group">
        <Slider
          label="duration"
          min={0}
          max={5000}
          step={10}
          defaultValue={duration}
          showValue={true}
          // tslint:disable-next-line:jsx-no-lambda
          onChange={this.updateExitExpression}
        />
      </div>
    );
  }

  public getColorTool = (): JSX.Element | null => {
    const {elmProperty, value} = this.state;

    if (elmProperty.key !== 'color' && elmProperty.key !== 'bgcolor') {
      return null;
    }

    return <ColorPicker color={value.color} onColorChanged={this.handleColorChange} />;
  }

  public handleColorChange = (color: string): void => {
    this.setState((prevState) => {
      const currentValue = prevState.value;
      currentValue.color = color;

      return {
        value: currentValue
      };
    })
  }

  public render() {
    const { eventType, elmProperty, exitExpression, value } = this.state;
    const durationTool = this.getDurationTool();
    const colorTool = this.getColorTool();

    return (
      <div className="editor-container">
        <div className="conf-group">
          <Dropdown
            label="触发方式"
            selectedKey={eventType.key}
            onChanged={this.changeEventType}
            // defaultSelectedKey={'timing'}
            options={eventTypeOptions}
          />
        </div>

        <div className="conf-group">
          <Dropdown
            label="改变属性"
            selectedKey={elmProperty.key}
            onChanged={this.changeElmProperty}
            // defaultSelectedKey={'timing'}
            options={elmPropertyOptions}
          />
        </div>
        
        {/* <div className="conf-group">
          <Dropdown
            label="变化曲线"
            selectedKey={selectedItem ? selectedItem.key : undefined}
            onChanged={this.changeState}
            defaultSelectedKey={'timing'}
            options={[
              { key: 'size', text: '匀速' },
              { key: 'color', text: '颜色' }
            ]}
          />
        </div> */}

        {durationTool}
        {colorTool}

        <Demo color={value.color} />

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