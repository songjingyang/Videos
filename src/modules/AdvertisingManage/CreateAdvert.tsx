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
import Advert from '../../models/Advert'
import './CreateAdvert.less'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
interface Props {
  form: WrappedFormUtils;
  advert: Advert;
  onClose: any;
  data: any;
}
interface State {
  status: boolean;
  fileList: any;

}
@inject('advert')
@observer
export default class CreateAdvert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: true,
      fileList: [],

    };
  }
  componentDidMount() {
    this.props.data.id && this.props.advert.getDefaultAdvert({
      data: {
        id: this.props.data.id
      }
    })
  }
  ChangeVideo = () => {
    this.props.form.setFieldsValue({
      cover_url: ""
    })
  }
  getImgUrl = (imgUrl: any) => {
    this.props.form.setFieldsValue({
      cover_url: imgUrl
    })
  }
  handleSubmit = (e: KeyboardEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // if (!err) {
      //   this.props.advert.addAdvertisement({
      //     data: {
      //       ...values,
      //       start_at: "" + parseInt(values.start_at.valueOf()),
      //       end_at: "" + parseInt(values.end_at.valueOf()),
      //       // type: 1,
      //       id: this.props.data.id
      //       // url :this.state.url
      //     },
      //     callback: res => {
      //       if (res.code === 200) {
      //         message.success('保存成功');
      //         if (this.props.onClose) {
      //           this.props.onClose();
      //         }
      //       }
      //     },
      //   });
      // }
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
    const info = this.props.advert.defaultAdvert
    let baseUrl = window.location.protocol + '//' + document.domain + ":" + window.location.port + '/api'
    return (
      <Card bordered={false} title={this.props.data.id ? '编辑会员' : '添加会员'} className="Advert">
        <Form onSubmit={this.handleSubmit}>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="广告位置"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('pos', {
                  initialValue: this.props.data.id ? info.pos : undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择位置',
                    },
                  ],
                })(
                  <Select placeholder={"请选择位置"}>
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
                label="广告图片类型"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('type', {
                  initialValue: this.props.data.id ? info.type : ""
                  // (this.props.form.getFieldValue("pos")===8?1:"")
                  ,
                  rules: [
                    {
                      required: true,
                      message: '请选择广告图片类型',
                    },
                  ],
                })(
                  <RadioGroup onChange={this.ChangeVideo}>
                    <Radio value={1}>普通图片</Radio>
                    <Radio value={2}
                    // disabled = {this.props.form.getFieldValue("pos")===8 ?true :false}
                    >Gif图片</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="广告图片"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('cover_url', {
                  initialValue: this.props.data.id ? info.cover_url : "",
                  rules: [
                    {
                      required: true,
                      message: '请上传广告图片',
                    },
                  ],
                })(
                  <UploadImg getImgUrl={this.getImgUrl} pos={this.props.form.getFieldValue("pos")} type={this.props.form.getFieldValue("type")} />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="广告名称"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('title', {
                  initialValue: this.props.data.id ? info.title : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入广告名称',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入广告名称"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="广告时长（S）"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('duration', {
                  initialValue: this.props.data.id ? info.duration : '',
                  rules: [
                    {
                      required: true,
                      message: '请输入广告时长',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入广告时长"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="链接"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('url', {
                  initialValue: this.props.data.id ? info.url : '',
                  rules: [
                    {
                      required: true,
                      // whitespace: true,
                      message: '请输入链接',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入链接"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="开始时间"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('start_at', {
                  initialValue: this.props.data.id ? moment(+info.start_at) : null,
                  rules: [
                    {
                      required: true,
                      message: '请选择开始时间',
                    },
                  ],
                })(
                  <DatePicker
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    format="YYYY-MM-DD HH:mm:ss"
                    allowClear={true}
                    placeholder="开始时间"
                  />
                )}
              </FormItem>
            </Col>
            <Col xl={24} md={24} sm={24}>
              <FormItem
                label="结束时间"
                {...formItemLayout}
                className="form-inline-item"
              >
                {getFieldDecorator('end_at', {
                  initialValue: this.props.data.id ? moment(Number(info.end_at)) : null,
                  rules: [
                    {
                      required: true,
                      message: '请选择结束时间',
                    },
                  ],
                })(
                  <DatePicker
                    showTime={{ defaultValue: moment('23:59:59', 'HH:mm:ss') }}
                    format="YYYY-MM-DD HH:mm:ss"
                    allowClear={true}
                    placeholder="结束时间"
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


