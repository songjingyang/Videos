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
export default class CreateCategory extends React.Component<Props, State> {
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
    const list = [
        // {
        //   id: 1,
        //   name: '首页浮窗',
        // },
        {
          id: 2,
          name: '首页嵌入(375*252)',
        },
        {
          id: 3,
          name: '首页底部(375*58)',
        },
        {
          id: 4,
          name: '播放页浮窗(146*95)',
        },
        {
          id: 5,
          name: '播放页嵌入(375*58)',
        },
        // {
        //   id: 6,
        //   name: '播放中插入视频',
        // },
        {
          id: 8,
          name: '开屏广告(375*667)',
        },
      ]
    // const info = this.props.advert.defaultAdvert
    let baseUrl = window.location.protocol + '//' + document.domain + ":" + window.location.port + '/api'
    return (
      <Card bordered={false} title={this.props.data.id ? '编辑分类' : '添加分类'}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="分类名称"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入分类名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入请输入分类名称账号"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="大类选择"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('pos', {
                //   initialValue: this.props.data.id ? info.pos : undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择大类',
                    },
                  ],
                })(
                  <Select placeholder={"请选择大类"}>
                    {
                      list.map((item: any, index: number) => (
                        <Option value={item.id} key={item.id}
                        // disabled ={this.props.form.getFieldValue("type")===2&&item.id ===8 ? true :false}
                        >{item.name}</Option>
                      ))
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="分类排序"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入分类排序',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入分类排序"
                  />
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


