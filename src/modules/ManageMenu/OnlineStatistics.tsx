import React from 'react'
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
    Tag,
    Input,
    Table,
    Card,
    DatePicker,
    Row,
    Col,
    Modal,
    message,
    Statistic
} from 'antd'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import classNames from 'classnames'
import { WrappedFormUtils, FormComponentProps, RcBaseFormProps } from 'antd/lib/form/Form'
import { dateFormater, MoneyFormatter } from '../../utils/utils'
import PreviewImg from '../../components/PreviewImg'
import { inject, observer } from 'mobx-react';
import Menu from '../../models/Menu';
import { values } from 'mobx';
import DataSet from "@antv/data-set"
// import './Menu.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
interface Props extends FormComponentProps {
    form: WrappedFormUtils,
    menu: Menu;
}
interface State {
    loading: boolean
}
@Form.create()
@inject('menu')
@observer
export default class OnlineStatistics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        this.props.menu.getOnlinePage({
            data: {},
            callback: res => {
                if (res.code === 200) {
                    this.setState({
                        loading: false
                    })
                }
            }
        });
    }
    render() {
        const data = [
            {
                month: "Jan",
                city: "Tokyo",
                temperature: 7
            },
            {
                month: "Feb",
                city: "Tokyo",
                temperature: 6.9
            },

            {
                month: "Mar",
                city: "Tokyo",
                temperature: 9.5
            },

            {
                month: "Apr",
                city: "Tokyo",
                temperature: 14.5
            },

            {
                month: "May",
                city: "Tokyo",
                temperature: 18.4
            },

            {
                month: "Jun",
                city: "Tokyo",
                temperature: 21.5
            },

            {
                month: "Jul",
                city: "Tokyo",
                temperature: 25.2
            },

            {
                month: "Aug",
                city: "Tokyo",
                temperature: 26.5
            },

            {
                month: "Sep",
                city: "Tokyo",
                temperature: 23.3
            },

            {
                month: "Oct",
                city: "Tokyo",
                temperature: 18.3
            },

            {
                month: "Nov",
                city: "Tokyo",
                temperature: 13.9
            },

            {
                month: "Dec",
                city: "Tokyo",
                temperature: 9.6
            },

        ];
        const cols = {
            month: {
                range: [0, 1]
            }
        };
        const infoTop = this.props.menu.menuPage
        return (
            <Card title="在线统计" bordered={false}
            //    loading ={this.state.loading}
            >
                <div className="tableList">
                    <Form>
                        <Row
                            gutter={{ md: 8, lg: 24, xl: 48 }}
                            style={{ marginTop: '100px' }}
                        >
                            <Col xl={24} md={24} sm={24}>
                                <Chart height={400} data={data} scale={cols} forceFit>
                                    <Legend />
                                    <Axis name="month" />
                                    <Axis
                                        name="temperature"
                                        label={{
                                            formatter: val => `${val}°C`
                                        }}
                                    />
                                    <Tooltip
                                        crosshairs={{
                                            type: "y"
                                        }}
                                    />
                                    <Geom
                                        type="line"
                                        position="month*temperature"
                                        size={2}
                                        color={"city"}
                                        shape={"smooth"}
                                    />
                                    <Geom
                                        type="point"
                                        position="month*temperature"
                                        size={4}
                                        shape={"circle"}
                                        color={"city"}
                                        style={{
                                            stroke: "#fff",
                                            lineWidth: 1
                                        }}
                                    />
                                </Chart>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>
        );
    }
}
