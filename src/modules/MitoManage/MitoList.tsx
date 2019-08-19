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
import Mito from '../../models/Mito';
import moment from 'moment';
import PreviewImg from '../../components/PreviewImg';
import CreateMito from './CreateMito'
import { inject, observer } from 'mobx-react';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
interface Props extends FormComponentProps {
    form: WrappedFormUtils;
    mito: Mito;
}
interface State {
    columns: any;
    visible: boolean;
    currItem: any;
    pagination: any;
    selectedRowKeys: any;
    selectedRows: any,
    loading: boolean,
    imgType: any
}
@Form.create()
@inject('mito')
@observer
export default class MitoList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false,
            imgType: {
                0: "普通视频",
                1: "VIP视频"
            },
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
                    dataIndex: 'cover',
                    key: 'cover',
                    render: (record: any, text: any) => (
                        <PreviewImg alt="img" src={text} />
                    )
                },
                {
                    title: '图片名称',
                    dataIndex: 'title',
                    key: 'title',
                },
                {
                    title: '所属类型',
                    dataIndex: 'vip',
                    key: 'vip',
                    render: (record: any, text: number) => (
                        <span>
                            {this.state.imgType[record.vip]}
                        </span>
                    )
                },
                {
                    title: '浏览次数',
                    dataIndex: 'playCount',
                    key: 'playCount',
                },
                {
                    title: '喜欢人数',
                    dataIndex: 'like',
                    key: 'like',
                },
                {
                    title: '收藏人数',
                    dataIndex: 'star',
                    key: 'star',
                },
                {
                    title: '图片张数',
                    dataIndex: 'imgTotal',
                    key: 'imgTotal',
                },
                {
                    title: '添加时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
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
                            <a href="#" onClick={() => this.CreateMito(record)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="你确定删除吗？"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                okText="确认"
                                cancelText="取消"
                                onConfirm={() => this.DeleteRecord(record)} >
                                <a href="#">删除</a>
                            </Popconfirm>
                        </span>
                    ),
                },
            ],
        };
    }
    componentDidMount() {
        this.getMitoList();
    }
    DeleteRecord = (record: any) => {
        this.props.mito.DeleteMito({
            data: {
                id: record.id?record.id:this.state.selectedRows.map((item:any,index:number)=>{
                    return item.id
                })
            },
            callback :(res)=>{
                if(res.code===200){
                    message.success(res.msg||"操作成功")
                    this.getMitoList();
                }else{
                    message.error(res.msg||"操作失败") 
                }
            }
        })
    }
    onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
    }
    getMitoList = (params: any = {}) => {
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
                    params.ts = this.props.mito.mitoPage.ts;
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
                this.props.mito.getMitoPage({
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
        this.getMitoList({
            pageSize: pagination.pageSize,
            page: pagination.current,
        });
        window.scroll(0, 0);
    };
    handleSubmit = (e: KeyboardEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getMitoList(values);
            }
        });
    };
    isCreateMito = (bool: boolean) => {
        this.setState({
            visible: bool,
        });
    };
    CreateMito = (item: any) => {
        this.isCreateMito(true);
        this.setState({
            currItem: item,
        })
    };
    PropsInfo = (bool: boolean) => {
        this.isCreateMito(false);
    };
    render() {
        const info = this.props.mito.mitoPage;
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
            <Card title="美图管理" bordered={false}
            // loading={this.state.loading}
            >
                {this.state.visible && (
                    <Modal
                        visible={this.state.visible}
                        width={700}
                        onCancel={() => this.isCreateMito(false)}
                        footer={null}
                    >
                        <CreateMito
                            form={this.props.form}
                            mito={this.props.mito}
                            data={this.state.currItem}
                            onClose={() => {
                                this.PropsInfo(false);
                                this.getMitoList({
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
                            <Col xl={6} md={24} sm={24}>
                                <FormItem
                                    label="分类"
                                    {...formItemLayout}
                                    className="form-inline-item"
                                >
                                    {getFieldDecorator('atat')(
                                        <Select defaultValue="lucy" style={{ width: 200 }} placeholder="请选择分类">
                                            <Option value={0}>日本美女</Option>
                                            <Option value={1}>韩国美女</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col
                                xl={4}
                                md={24}
                                sm={24}

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
                            onClick={this.CreateMito}
                        >
                            添加资源
                        </Button>
                    </Col>
                    <Col span={24}>
                        <div style={{ marginBottom: 16 }}>
                            <Button
                                type="primary"
                                onClick={this.DeleteRecord}
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
                            //   dataSource={info.list}
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
