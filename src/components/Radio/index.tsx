import React from 'react';

import { Modal,Radio  } from 'antd';
interface Props {
  data :any
}
interface State {
  value:string
}
export default class RadioSomeOne extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value : ""
    };
  }
  componentWillReceiveProps(nextProps: any) {
    console.log('nextProps', nextProps);
    if ('value' in nextProps) {
      this.setState({
       value :nextProps.value
      });
    }
  }
  render() {
    const RadioGroup = Radio.Group 
    console.log(this.state.value)
    return (
        <RadioGroup >
          {
            this.props.data.map((item:any,index:number)=>(
              <Radio key={index} value={index} checked={+this.state.value===index?true:false} >{item}</Radio>
            ))
          }
        </RadioGroup>
    );
  }
}
