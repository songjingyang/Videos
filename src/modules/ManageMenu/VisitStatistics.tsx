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
    Tag
} from 'antd';
import classNames from 'classnames';
import {
    WrappedFormUtils,
    FormComponentProps,
    RcBaseFormProps,
} from 'antd/lib/form/Form';
import { dateFormater, MoneyFormatter } from '../../utils/utils';
import Menu from '../../models/Menu';
import moment from 'moment';
import PreviewImg from '../../components/PreviewImg';
import { inject, observer } from 'mobx-react';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
interface Props extends FormComponentProps {
    form: WrappedFormUtils;
    menu: Menu;
}
interface State {
    columns: any;
    visible: boolean;
    isShowModal: boolean;
    selectedRows: any,
    currItem: any;
    pagination: any;
    selectedRowKeys: any;
    loading: boolean
}
@Form.create()
@inject('menu')
@observer
export default class VisitStatistics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false,
            loading: true,
            isShowModal: false,
            currItem: {},
            selectedRowKeys: [],
            selectedRows: [],
            pagination: {
                pageSize: 20,
                current: 1,
                total: 20,
            },
            columns: [
                // {
                //     title: '编号',
                //     dataIndex: 'type',
                //     key: 'type',
                // },
                {
                    title: 'IP地址',
                    dataIndex: 'ip',
                    key: 'ip',
                },
                {
                    title: '地区',
                    dataIndex: 'addr',
                    key: 'addr',
                },
                {
                    title: '来源',
                    dataIndex: 'source',
                    key: 'source',
                },
                {
                    title: '访问时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
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
        this.getVisitPage();
    }
    DeleteRecord = (e: any) => {

    }
    onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
    }

    getVisitPage = (params: any = {}) => {
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
                    params.ts = this.props.menu.visitPage.ts;
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
                this.props.menu.getVisitPage({
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
        this.getVisitPage({
            pageSize: pagination.pageSize,
            page: pagination.current,
        });
        window.scroll(0, 0);
    };
    handleSubmit = (e: KeyboardEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getVisitPage(values);
            }
        });
    };
    render() {
        const info = this.props.menu.visitPage
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
            <Card title="访问统计" bordered={false}
                loading={this.state.loading}
            >
                <BackTop className="ant-back-top-inner" />
                <div className="tableList">
                    <Form onSubmit={this.handleSubmit}>
                        <Row
                            gutter={{ md: 8, lg: 24, xl: 48 }}
                            style={{ marginTop: '20px' }}
                        >
                            <Col xl={12} md={24} sm={24}>
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
