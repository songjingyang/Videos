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
import { dateFormater, MoneyFormatter, setTimes } from '../../utils/utils';
import moment from 'moment';
import PreviewImg from '../../components/PreviewImg';
import Order from '../../models/Order'
import { inject, observer } from 'mobx-react';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
interface Props extends FormComponentProps {
    form: WrappedFormUtils;
    order: Order;
}

interface State {
    columns: any;
    pagination: any;
    loading: boolean;
    selectedRows: any,
    selectedRowKeys: any;
}
@Form.create()
@inject('order')
@observer
export default class AuditWithdrawal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            pagination: {
                pageSize: 20,
                current: 1,
                total: 20,
            },
            selectedRowKeys: [],
            selectedRows: [],
            columns: [
                {
                    title: '订单ID',
                    dataIndex: 'cover_url',
                    key: 'cover_url',
                },
                {
                    title: '会员号',
                    dataIndex: 'duration',
                    key: 'duration',
                },
                {
                    title: '付款金额',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '付款方式',
                    dataIndex: 'pos',
                    key: 'pos',

                },
                {
                    title: '订单号',
                    dataIndex: 'url',
                    key: 'url',
                },
                {
                    title: '商品名称',
                    dataIndex: 'url',
                    key: 'url',
                },
                {
                    title: '付款时间',
                    dataIndex: 'start_at',
                    key: 'start_at',
                    render: (text: string, record: any) => (
                        <span>
                            {dateFormater(text)}
                        </span>
                    )
                },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status',
                    //   render: (text: string, record: any) => {
                    //     let config: any = {
                    //       0: <Badge status="error" text="停用" />,
                    //       1: <Badge status="success" text="启用" />,
                    //     };
                    //     return config[record.status];
                    //   },
                },
                {
                    title: '操作',
                    dataIndex: 'play',
                    key: 'play',
                    render: (text: string, record: any) => (
                        <span>
                            <Popconfirm
                                title="你确定确认到账吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.EditUserStatus} >
                                <a href="#">确认到账</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定删除订单吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.EditUserStatus} >
                                <a href="#">删除订单</a>
                            </Popconfirm>
                        </span>
                    ),
                },
            ],
        };
    }
    EditUserStatus = (e: any) => {

    }
    componentDidMount() {
        this.getAuditPage();
    }
    getAuditPage = (params: any = {}) => {
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
                    params.ts = this.props.order.orderPage.ts;
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
                this.props.order.getAuditPage({
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
        this.getAuditPage({
            pageSize: pagination.pageSize,
            page: pagination.current,
        });
        window.scroll(0, 0);
    };
    handleSubmit = (e: KeyboardEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getAuditPage(values);
            }
        });
    };
    onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
    }
    render() {
        const info = this.props.order.orderPage;
        const { selectedRowKeys, selectedRows } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 1;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title="提现审核"
                bordered={false}
            //   loading={this.state.loading}
            >
                <BackTop className="ant-back-top-inner" />
                <Row
                    gutter={{ md: 8, lg: 24, xl: 48 }}
                    style={{ marginTop: '20px' }}
                >
                    <Col xl={4} md={24} sm={24} offset={1}>
                    <Statistic
                        title="今日提现金额"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="transaction" />}
                        suffix="元"
                        />
                    </Col>
                    <Col xl={4} md={24} sm={24} offset={1}>
                    <Statistic
                        title="昨日提现金额"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="transaction" />}
                        suffix="元"
                        />
                    </Col>
                    <Col xl={4} md={24} sm={24} offset={1}>
                    <Statistic
                        title="总提现金额"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="transaction" />}
                        suffix="元"
                        />
                    </Col>
                    <Col xl={4} md={24} sm={24} offset={1}>
                    <Statistic
                        title="提现审核中"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="account-book" />}
                        suffix="笔"
                        />
                    </Col>
                    <Col xl={4} md={24} sm={24}>
                    <Statistic
                        title="已提现"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="account-book" />}
                        suffix="笔"
                        />
                    </Col>
                </Row>
                <div className="tableList">
                    <Form onSubmit={this.handleSubmit}>
                        <Row
                            gutter={{ md: 8, lg: 24, xl: 48 }}
                            style={{ marginTop: '20px' }}
                        >
                            <Col xl={8} md={24} sm={24}>
                                <FormItem
                                    label="会员ID"
                                    {...formItemLayout}
                                    className="form-inline-item"
                                >
                                    {getFieldDecorator('name')(
                                        <Input placeholder="会员ID" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col
                                xl={8}
                                md={24}
                                sm={24}
                            >
                                <FormItem label="选择时间"  {...formItemLayout} className="form-inline-item">
                                    {getFieldDecorator('timeRange', {})(
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
                            </Col>
                            <Col
                                xl={12}
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
                    <Col span={24}>
                        <div style={{ marginBottom: 16 }}>
                            <Button
                                type="primary"
                                // onClick={this.AllDelete}
                                disabled={!hasSelected}
                            // loading={loading}
                            >
                                一键提现
                            </Button>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}
                            </span>
                        </div>
                        <Table
                            columns={this.state.columns}
                            rowKey="id"
                            //   dataSource={info.list}
                            dataSource={[{ type: 1, nickname: 1, phone: 1, email: 1, created_at: 11111111111 }]}
                            pagination={{
                                ...this.state.pagination,
                                total: info.total,
                                // current: info.page,  //page报错
                                showQuickJumper: true,
                            }}
                            rowSelection={rowSelection}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </div>
            </Card>
        );
    }
}
