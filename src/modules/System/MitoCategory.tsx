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
import System from '../../models/System';
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
    system: System;
}
interface State {
    columns: any;
    visible: boolean;
    currItem: any;
    pagination: any;
    loading: boolean
}
@Form.create()
@inject('system')
@observer
export default class Mito extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false,
            loading: true,
            currItem: {},
            pagination: {
                pageSize: 20,
                current: 1,
                total: 20,
            },
            columns: [
                {
                    title: '分类编号',
                    dataIndex: 'nickname',
                    key: 'nickname',
                },
                {
                    title: '分类名称',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: '操作',
                    dataIndex: 'play',
                    key: 'play',
                    render: (text: string, record: any) => (
                        <span>
                            <a href="#"   onClick={() => this.CreateMito(record)}>编辑</a>
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
        this.getMitoList();
    }
    DeleteRecord = (e: any) => {

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
                    params.ts = this.props.system.navPage.ts;
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
                this.props.system.getMitoPage({
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
        // const info = this.props.MessageMana.MitoList;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Card title="分类列表" bordered={false}
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
                        system={this.props.system}
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
                        添加分类
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Table
                            columns={this.state.columns}
                            rowKey="id"
                            //   dataSource={info.list}
                            dataSource={[{ type: 1, nickname: 1, phone: 1, email: 1, created_at: 11111111111 }]}
                            //   pagination={{
                            //     ...this.state.pagination,
                            //     total: info.total,
                            //     current: info.page,
                            //     showQuickJumper: true,
                            //     hideOnSinglePage:true
                            //   }}
                            onChange={this.handleTableChange}
                        />

                    </Col>
                </div>
            </Card>
        );
    }
}
