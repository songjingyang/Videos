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
import Member from '../../models/Member'
// import './CreateAdvert.less'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
interface Props {
  form: WrappedFormUtils;
  member: Member;
  onClose: any;
  data: any;
}
interface State {
  status: boolean;
  fileList: any;
}
@inject('member')
@observer
export default class CreateMember extends React.Component<Props, State> {
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
        this.props.member.CreateMember({
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
    const defaultMember = this.props.data
    // const info = this.props.advert.defaultAdvert
    let baseUrl = window.location.protocol + '//' + document.domain + ":" + window.location.port + '/api'
    return (
      <Card bordered={false} title={this.props.data.id ? '编辑会员' : '添加会员'}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="账号"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('name', {
                  initialValue : defaultMember.name,
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入账号',
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
                label="密码"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('pass', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入密码',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入密码"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="昵称"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('nickname', {
                  initialValue : defaultMember.nickname,
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入昵称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入昵称"
                  />
                )}
              </FormItem>
            </Col>
            {/* <Col xl={24} md={24} sm={24}>
              <FormItem
                label="会员类型"
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
                         <Radio value={1}>普通会员</Radio>
                         <Radio value={2}>VIP会员</Radio>
                    </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="会员有效期"
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
                    <RangePicker
                      showTime={{
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('23:59:59', 'HH:mm:ss'),
                        ],
                      }}
                      format="YYYY-MM-DD HH:mm:ss"
                      allowClear={true}
                    />
                )}
              </FormItem>
            </Col> */}
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


