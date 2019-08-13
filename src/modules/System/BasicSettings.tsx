import React, { KeyboardEvent, ReactElement } from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Tooltip,
    Input,
    Table,
    Card,
    DatePicker,
    Row,
    Col,
    Modal,
    message,
    Statistic,
    Popconfirm,
    Badge,
    BackTop,
    Tag,
    Divider,
    Checkbox
} from 'antd';
import classNames from 'classnames';
import {
    WrappedFormUtils,
    FormComponentProps,
    RcBaseFormProps,
} from 'antd/lib/form/Form';
import { dateFormater, MoneyFormatter } from '../../utils/utils';
import System from '../../models/System';
import moment from 'moment';
import PreviewImg from '../../components/PreviewImg';
import RadioSomeOne from '../../components/Radio/index'
import { inject, observer } from 'mobx-react';
import './index.less'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;
interface Props extends FormComponentProps {
    form: WrappedFormUtils;
    system: System;
}
interface State {
    visible: boolean;
    isShowModal: boolean;
    loading: boolean
}
@Form.create()
@inject('system')
@observer
export default class BasicSettings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false,
            loading: true,
            isShowModal: false,
        };
    }
    componentDidMount() {
       
    }
    handleSubmit = (e: KeyboardEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.system.saveSystemSetting({
                    data :{
                        ...values
                    }
                })
            }
        });
    };
    render() {
        // const info = this.props.MessageMana.SystemList;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const data = [ "开启","关闭"]
        const video =["单列","双列"]
        const image= ["全屏","窗口"]
        const page = ["自动","手动"]
        const status = [ "详细","简化","关闭"]
        const player = ["Ckplayer","Chplayer"]
        const upload = [ "外部","本地",]
        const plainOptions = ['时事新闻', '搞笑短剧', '微拍福利','性感热舞','美女视频','微拍自拍'];
        return (
            <Card title="基础设置" bordered={false}
            // loading={this.state.loading}
            >
                <BackTop className="ant-back-top-inner" />
                <Form onSubmit={this.handleSubmit} className="Basic">
                    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="网站名称"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入网站名称',
                                        },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入网站名称"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="首页标题"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name1', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入首页标题',
                                        },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入首页标题"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="关键词"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name2', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入关键词',
                                        },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入关键词"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="描述"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name3', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入描述',
                                        },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入描述"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="试看时间"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name4', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入试看时间',
                                        },
                                    ],
                                })(
                                    <InputNumber min={1} max={10000}  placeholder="请输入试看时间"  style={{width:"180px"}}/>
                                )}
                                <span className="ant-form-text"> S</span>
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="访问统计"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择访问统计状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="视频排序"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('end', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择视频排序状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={video} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="热搜展现"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择热搜展现状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="首页幻灯"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择首页幻灯状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="首页统计"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择首页统计状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="视频广告"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择视频广告状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="视频展现"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择视频展现状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={image} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="自动注册"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择自动注册状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="翻页模式"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择翻页模式状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={page} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="在线统计"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择在线统计状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={status} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="系统公告"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择系统公告状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="聊天系统"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('start', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择聊天系统状态',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={data} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="播放器"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('player', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择播放器',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={player} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="会员上传"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('player', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择会员上传',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={upload} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="后台上传"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('player', {
                                    initialValue:  0,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择后台上传',
                                        },
                                    ],
                                })(
                                   <RadioSomeOne data={upload} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="VIP试用时间"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name4', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入VIP试用时间',
                                        },
                                    ],
                                })(
                                    <InputNumber min={1} max={10000}  placeholder="请输入VIP试用时间"  style={{width:"180px"}}/>
                                )}
                                <span className="ant-form-text"> S</span>
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="云上传"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入云上传地址',
                                        },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入云上传地址"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="手机版网址"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入手机版网址',
                                        },
                                    ],
                                })(
                                    <Input
                                        placeholder="请输入手机版网址"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col xl={20} md={24} sm={24}>
                            <FormItem
                                label="首页内容"
                                {...formItemLayout}
                                className="form-inline-item"
                            >
                                {getFieldDecorator('name', {
                                    // initialValue:  '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入首页内容',
                                        },
                                    ],
                                })(
                                    <CheckboxGroup
                                    options={plainOptions}
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
                                    保存
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );
    }
}
