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
    Divider
} from 'antd';
import classNames from 'classnames';
import {
    WrappedFormUtils,
    FormComponentProps,
    RcBaseFormProps,
} from 'antd/lib/form/Form';
import { dateFormater, MoneyFormatter } from '../../utils/utils';
import Member from '../../models/Member';
import moment from 'moment';
import PreviewImg from '../../components/PreviewImg';
import CreateMember from './CreateMember'
import { inject, observer } from 'mobx-react';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
interface Props extends FormComponentProps {
    form: WrappedFormUtils;
    member: Member;
}
interface State {
    columns: any;
    visible: boolean;
    currItem: any;
    pagination: any;
    loading: boolean,
    vipStatusMaps: any
}
@Form.create()
@inject('member')
@observer
export default class MemberList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false,
            loading: true,
            vipStatusMaps: {
                "0": "非会员",
                "1": "普通会员",
                "2": "VIP会员"
            },
            currItem: {},
            pagination: {
                pageSize: 20,
                current: 1,
                total: 20,
            },
            columns: [
                {
                    title: '推广ID',
                    dataIndex: 'spread_id',
                    key: 'spread_id',
                },
                {
                    title: '用户名',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '注册IP',
                    dataIndex: 'ip',
                    key: 'ip',
                },
                {
                    title: '注册时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    render: (text: string, record: any) => (
                        <span>
                            {dateFormater(text)}
                        </span>
                    )
                },
                {
                    title: '会员类型',
                    dataIndex: 'vip',
                    key: 'vip',
                    render: (text: number, record: any) => (
                        <span>
                            {this.state.vipStatusMaps[record.vip]}
                        </span>
                    )
                },
                {
                    title: '操作',
                    dataIndex: 'play',
                    key: 'play',
                    render: (text: string, record: any) => (
                        <span>
                            <a href="#" onClick={() => this.CreateMember(record)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定删除吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.DeleteRecord} >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </span>
                    ),
                },
            ],
        };
    }
    componentDidMount() {
        this.getMemberList();
    }
    DeleteRecord = (e: any) => {

    }
    getMemberList = (params: any = {}) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let payload = {
                    ...values,
                };
                if (!params.page) {
                    params.page = 1;
                }
                if (params.page === 1) {
                    params.ts = new Date().valueOf();
                } else {
                    params.ts = this.props.member.memberPage.ts;
                }
                if (!params.pageSize) {
                    params.pageSize = 20;
                }
                if (payload.timeRange) {
                    if (payload.timeRange.length !== 0) {
                        payload.start_at = parseInt(payload.timeRange[0].valueOf());
                        payload.end_at = parseInt(payload.timeRange[1].valueOf());
                    } else {
                        payload.start_at = 0;
                        payload.end_at = 0;
                    }
                }
                payload = {
                    ...payload,
                    ...params,
                };
                this.props.member.getMemberPage({
                    data: {
                        ...payload,
                    },

                    callback: res => {
                        if (res.code === 200) {
                            this.setState({
                                loading: false
                            })
                        }
                    },
                });
            } else {
                console.log('saveBuyManagementInfo parameters error');
            }
        });
    };
    //分页
    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        const pager = {
            ...this.state.pagination,
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.getMemberList({
            pageSize: pagination.pageSize,
            page: pagination.current,
        });
        window.scroll(0, 0);
    };
    handleSubmit = (e: KeyboardEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getMemberList(values);
            }
        });
    };
    isCreateMember = (bool: boolean) => {
        this.setState({
            visible: bool,
        });
    };
    CreateMember = (item: any) => {
        this.isCreateMember(true);
        this.setState({
            currItem: item,
        })
    };
    PropsInfo = (bool: boolean) => {
        this.isCreateMember(false);
    };
    render() {
        const info = this.props.member.memberPage;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title="会员列表" bordered={false}
            // loading={this.state.loading}
            >
                {this.state.visible && (
                    <Modal
                        visible={this.state.visible}
                        width={700}
                        onCancel={() => this.isCreateMember(false)}
                        footer={null}
                    >
                        <CreateMember
                            form={this.props.form}
                            member={this.props.member}
                            data={this.state.currItem}
                            onClose={() => {
                                this.PropsInfo(false);
                                this.getMemberList({
                                    pageSize: this.state.pagination.pageSize,
                                    page: this.state.pagination.current,
                                });
                            }}
                        />
                    </Modal>
                )}
                <BackTop className="ant-back-top-inner" />
                <div className="tableList">
                    <Form onSubmit={this.handleSubmit}>
                        <Row
                            gutter={{ md: 8, lg: 24, xl: 48 }}
                            style={{ marginTop: '20px' }}
                        >
                            <Col xl={10} md={24} sm={24}>
                                <FormItem
                                    label="会员名"
                                    {...formItemLayout}
                                    className="form-inline-item"
                                >
                                    {getFieldDecorator('name')(
                                        <Input placeholder="会员名" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col xl={10} md={24} sm={24}>
                                <FormItem
                                    label="会员类型"
                                    {...formItemLayout}
                                    className="form-inline-item"
                                >
                                    {getFieldDecorator('vip')(
                                        <Select  style={{ width: 200 }} placeholder="请选择会员类型">
                                            <Option value={0}>非会员</Option>
                                            <Option value={1}>普通会员</Option>
                                            <Option value={2}>VIP会员</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col
                                xl={10}
                                md={24}
                                sm={24}
                                offset={2}
                                style={{ marginBottom: '10px' }}
                            >
                                <div className="submitButtons">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="listsearch"
                                    >
                                        查询
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Col
                        xl={12}
                        md={24}
                        sm={24}
                        offset={2}
                        style={{ marginBottom: '10px' }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="listsearch"
                            onClick={this.CreateMember}
                        >
                            添加会员
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Table
                            columns={this.state.columns}
                            rowKey="id"
                            dataSource={info.list}
                            pagination={{
                                ...this.state.pagination,
                                total: info.total,
                                // current: info.page,
                                showQuickJumper: true,
                                hideOnSinglePage: true
                            }}
                            onChange={this.handleTableChange}
                        />

                    </Col>
                </div>
            </Card>
        );
    }
}
