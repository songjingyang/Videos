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
import Advert from '../../models/Advert';
import moment from 'moment';
import PreviewImg from '../../components/PreviewImg';
import CreateAdvert from './CreateAdvert'
import { inject, observer } from 'mobx-react';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
interface Props extends FormComponentProps {
    form: WrappedFormUtils;
    advert: Advert;
}
interface State {
    columns: any;
    visible: boolean;
    currItem: any;
    pagination: any;
    loading: boolean;
    selectedRowKeys: any;
    selectedRows: any,
}
@Form.create()
@inject('advert')
@observer
export default class AdvertisingList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false,
            loading: true,
            currItem: {},
            selectedRowKeys: [],
            selectedRows: [],
            pagination: {
                pageSize: 20,
                current: 1,
                total: 20,
            },
            columns: [
                {
                    title: '缩略图',
                    dataIndex: 'cover_url',
                    key: 'cover_url',
                    render: (recode: any, text: string) => (
                        <PreviewImg alt="img" src={text} />
                    )
                },
                {
                    title: '广告名称',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '广告位置',
                    dataIndex: 'cate_id',
                    key: 'cate_id',
                },

                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text: string, record: any) => {
                        let config: any = {
                            0: <Badge status="error" text="停用" />,
                            1: <Badge status="success" text="启用" />,
                        };
                        return config[record.status];
                    },
                },
                {
                    title: '开始时间',
                    dataIndex: 'start_at',
                    key: 'start_at',
                    render: (text: string, record: any) => (
                        <span>
                            {dateFormater(text)}
                        </span>
                    )
                },
                {
                    title: '结束时间',
                    dataIndex: 'end_at',
                    key: 'end_at',
                    render: (text: string, record: any) => (
                        <span>
                            {dateFormater(text)}
                        </span>
                    )
                },
                {
                    title: '操作',
                    dataIndex: 'play',
                    key: 'play',
                    render: (text: string, record: any) => (
                        <span>
                            <a href="#" onClick={() => this.CreateAdvert(record)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定删除吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.DeleteRecord} >
                                <a href="#">删除</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定启用吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.DeleteRecord} >
                                <a href="#">启用</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定停用吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={this.DeleteRecord} >
                                <a href="#">停用</a>
                            </Popconfirm>
                        </span>
                    ),
                },
            ],
        };
    }
    componentDidMount() {
        this.getAdvertList();
    }
    DeleteRecord = (e: any) => {

    }
    onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
    }

    getAdvertList = (params: any = {}) => {
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
                    params.ts = this.props.advert.advertPage.ts;
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
                this.props.advert.getAdvertPage({
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
        this.getAdvertList({
            pageSize: pagination.pageSize,
            page: pagination.current,
        });
        window.scroll(0, 0);
    };
    handleSubmit = (e: KeyboardEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getAdvertList(values);
            }
        });
    };
    isCreateAdvert = (bool: boolean) => {
        this.setState({
            visible: bool,
        });
    };
    CreateAdvert = (item: any) => {
        this.isCreateAdvert(true);
        this.setState({
            currItem: item,
        })
    };
    PropsInfo = (bool: boolean) => {
        this.isCreateAdvert(false);
    };
    render() {
        const info = this.props.advert.advertPage;
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
            <Card title="广告列表" bordered={false}
                loading={this.state.loading}
            >
                {this.state.visible && (
                    <Modal
                        visible={this.state.visible}
                        width={700}
                        onCancel={() => this.isCreateAdvert(false)}
                        footer={null}
                    >
                        <CreateAdvert
                            form={this.props.form}
                            advert={this.props.advert}
                            data={this.state.currItem}
                            onClose={() => {
                                this.PropsInfo(false);
                                this.getAdvertList({
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
                                    label="搜索内容"
                                    {...formItemLayout}
                                    className="form-inline-item"
                                >
                                    {getFieldDecorator('name')(
                                        <Input placeholder="搜索内容" />
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
                            onClick={this.CreateAdvert}
                        >
                            添加广告
                        </Button>
                    </Col>
                    <Col span={24}>
                        <div style={{ marginBottom: 16 }}>
                            <Button
                                type="primary"
                                // onClick={this.AllDelete}
                                disabled={!hasSelected}
                            // loading={loading}
                            >
                                一键删除
                            </Button>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}
                            </span>
                        </div>
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
                            rowSelection={rowSelection}
                            onChange={this.handleTableChange}
                        />
                    </Col>
                </div>
            </Card>
        );
    }
}
