import React from 'react';

import { Modal } from 'antd';
interface Props {
  alt: string;
  src: string;
}
interface State {
  previewVisible: boolean;
}
export default class PreviewImg extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      previewVisible: false,
    };
  }
  componentWillReceiveProps(nextProps: any) {}
  hidePreview = () => {
    this.setState({
      previewVisible: false,
    });
  };
  showPreview = () => {
    this.setState({
      previewVisible: true,
    });
  };
  render() {
    return (
      <span>
        <img
          {...this.props}
          alt={this.props.alt}
          onClick={this.showPreview}
          style={{ height: '50px', width: '50px' }}
        />
        {this.props.src && (
          <Modal
            visible={this.state.previewVisible}
            footer={null}
            onCancel={this.hidePreview}
          >
            <img alt="" style={{ width: '100%' }} src={this.props.src} />
          </Modal>
        )}
      </span>
    );
  }
}
