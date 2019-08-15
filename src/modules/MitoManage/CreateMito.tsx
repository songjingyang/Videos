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
import UploadImg from './../../components/UploadImg'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import PreviewImg from '../../components/PreviewImg';
import { number } from 'prop-types';
import Mito from '../../models/Mito'
import './CreateMito.less'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const { Dragger } = Upload;
interface Props {
  form: WrappedFormUtils;
  mito: Mito;
  onClose: any;
  data: any;
}
interface State {
  status: boolean;
  fileList: any;
}
@inject('mito')
@observer
export default class CreateMito extends React.Component<Props, State> {
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
        this.props.mito.CreateMito({
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
  getImgUrl = (imgUrl: any) => {
    this.props.form.setFieldsValue({
      cover_url: imgUrl
    })
  }
  render() {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info:any) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    
    // const info = this.props.advert.defaultAdvert
    let baseUrl = window.location.protocol + '//' + document.domain + ":" + window.location.port + '/api'
    return (
      <Card bordered={false} title={this.props.data.id ? '编辑会员' : '添加会员'} className="CreateMito">
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="美图名称"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入美图名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入美图名称"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="分类"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请选择分类',
                    },
                  ],
                })(
                    <Select defaultValue="lucy" style={{ width: 200 }} placeholder = "请选择分类">
                    <Option value={0}>日本美女</Option>
                    <Option value={1}>韩国美女</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="标签"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请选择标签',
                    },
                  ],
                })(
                    <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择标签"
                    defaultValue={['a10', 'c12']}
                  >
                    {children}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="上传封面"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('cover_url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请上传封面',
                    },
                  ],
                })(
                    <UploadImg getImgUrl={this.getImgUrl} pos={this.props.form.getFieldValue("pos")} type={this.props.form.getFieldValue("type")} />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="封面图片"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入封面图片',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入封面图片"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="VIP权限"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('type', {
                //   initialValue: this.props.data.id ? info.type : ""
                //   // (this.props.form.getFieldValue("pos")===8?1:"")
                //   ,
                  rules: [
                    {
                      required: true,
                      message: '请选择VIP权限',
                    },
                  ],
                })(
                  <RadioGroup >
                    <Radio value={1}>普通资源</Radio>
                    <Radio value={2}>VIP资源</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="置顶推荐"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('type', {
                //   initialValue: this.props.data.id ? info.type : ""
                //   // (this.props.form.getFieldValue("pos")===8?1:"")
                //   ,
                  rules: [
                    {
                      required: true,
                      message: '请选择是否置顶推荐',
                    },
                  ],
                })(
                  <RadioGroup >
                    <Radio value={1}>开启置顶</Radio>
                    <Radio value={2}>关闭置顶</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="上传封面"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('cover_url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请上传封面',
                    },
                  ],
                })(
                  <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                  <p className="ant-upload-hint">
                  支持单个或批量上传,可以把文件拖到此处上传！
                  </p>
                </Dragger>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="大组图"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入大组图',
                    },
                  ],
                })(
                  <TextArea
                    placeholder="大组图 "
                    autosize={{ minRows: 2, maxRows: 6 }}
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="图片介绍"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入图片介绍',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入图片介绍"
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


