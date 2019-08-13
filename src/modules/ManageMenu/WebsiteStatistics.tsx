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
export default class WebsiteStatistics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        this.props.menu.getWebSitePage({
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
              name: "总计",
              "视频": 5621,
              "资源": 5621,
              "会员": 151895,
              "订单": 2863,
              "评论": 8989,
            },
            {
              name: "今日",
              "视频": 0,
              "资源": 0,
              "会员": 0,
              "订单": 0,
              "评论": 0,
            }
          ];
          const ds = new DataSet();
          const dv = ds.createView().source(data);
          dv.transform({
            type: "fold",
            fields: ["视频", "资源", "会员", "订单", "评论"],
            // 展开字段集
            key: "总计",
            // key字段
            value: "今日" // value字段
          });
        const infoTop = this.props.menu.menuPage
        return (
            <Card title="网站统计" bordered={false}
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
                                <Axis name="总计" />
                                <Axis name="今日" />
                                <Legend />
                                <Tooltip
                                    crosshairs={{
                                    type: "y"
                                    }}
                                />
                                <Geom
                                    type="interval"
                                    position="总计*今日"
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
