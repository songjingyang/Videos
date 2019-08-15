import React, { KeyboardEvent, ReactElement } from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Row,
  Col,
  Button,
  Upload,
  Icon,
  Rate,
  Tooltip,
  Input,
  Card,
  DatePicker,
  message,
  notification,
} from 'antd';
import moment from 'moment';
import {
  WrappedFormUtils,
  FormComponentProps,
  RcBaseFormProps,
} from 'antd/lib/form/Form';
import urlMaps from '../../common/urlMaps'
import UploadImg from '../../components/UploadImg'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import PreviewImg from '../../components/PreviewImg';
import { number } from 'prop-types';
import System from '../../models/System'
// import './CreateAdvert.less'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
interface Props {
  form: WrappedFormUtils;
  system: System;
  onClose: any;
  data: any;
}
interface State {
  status: boolean;
  fileList: any;
}
@inject('system')
@observer
export default class CreateNav extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: true,
      fileList: [],
    };
  }
  componentDidMount() {
    // this.props.data.id && this.props.advert.getDefaultAdvert({
    //   data: {
    //     id: this.props.data.id
    //   }
    // })
  }
  handleSubmit = (e: KeyboardEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.system.CreateNav({
          data: {
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              message.success('保存成功');
              if (this.props.onClose) {
                this.props.onClose();
              }
            }
          },
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    // const info = this.props.advert.defaultAdvert
    let baseUrl = window.location.protocol + '//' + document.domain + ":" + window.location.port + '/api'
    return (
      <Card bordered={false} title={this.props.data.id ? '编辑导航' : '添加导航'}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="导航名称"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入导航名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入账号"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="导航链接"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入导航链接',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入导航链接"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="导航排序"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入导航排序',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入导航排序"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="导航设置"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                    },
                  ],
                })(
                    <RadioGroup>
                         <Radio value={1}>普通导航</Radio>
                         <Radio value={2}>VIP导航</Radio>
                    </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col xl={12} md={24} sm={24} offset={6}>
              <div className="submitButtons">
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  确定
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}


