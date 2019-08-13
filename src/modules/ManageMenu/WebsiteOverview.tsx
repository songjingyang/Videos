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
export default class WebsiteOverview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        this.props.menu.getMenuPage({
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
              name: "今日注册",
              "Jan.": 18.9,
              "Feb.": 28.8,
              "Mar.": 39.3,
              "Apr.": 81.4,
              May: 47,
              "Jun.": 20.3,
              "Jul.": 24,
              "Aug.": 35.6
            },
            {
              name: "今日订单",
              "Jan.": 12.4,
              "Feb.": 23.2,
              "Mar.": 34.5,
              "Apr.": 99.7,
              May: 52.6,
              "Jun.": 35.5,
              "Jul.": 37.4,
              "Aug.": 42.4
            }
          ];
          const ds = new DataSet();
          const dv = ds.createView().source(data);
          dv.transform({
            type: "fold",
            fields: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],
            // 展开字段集
            key: "今日注册",
            // key字段
            value: "今日订单" // value字段
          });
        const infoTop = this.props.menu.menuPage
        return (
            <Card title="网站概览" bordered={false}
            //    loading ={this.state.loading}
            >
                <div className="tableList">
                    <Form>
                        <Row
                            gutter={{ md: 8, lg: 24, xl: 48 }}
                            style={{ marginTop: '100px' }}
                        >
                            <Col xl={24} md={24} sm={24}>
                            <Chart height={400} data={dv} forceFit>
                                <Axis name="今日注册" />
                                <Axis name="今日订单" />
                                <Legend />
                                <Tooltip
                                    crosshairs={{
                                    type: "y"
                                    }}
                                />
                                <Geom
                                    type="interval"
                                    position="今日注册*今日订单"
                                    color={"name"}
                                    adjust={[
                                    {
                                        type: "dodge",
                                        marginRatio: 1 / 32
                                    }
                                    ]}
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
