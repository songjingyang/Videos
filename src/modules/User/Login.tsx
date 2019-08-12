import React, { KeyboardEvent, ReactElement } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {
  WrappedFormUtils,
  FormComponentProps,
  RcBaseFormProps,
} from 'antd/lib/form/Form';
import { inject, observer } from 'mobx-react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { History } from 'history';
import User from '../../models/User';
import './UserLogin.less';
const FormItem = Form.Item;
interface Props extends FormComponentProps {
  form: WrappedFormUtils;
  history: History;
  user: User;
}
interface State {
  status: boolean;
}
// static create: <TOwnProps>(options?: FormCreateOption<TOwnProps>) => <ComponentDecorator extends Component<any>>(target: ComponentDecorator) => ComponentDecorator
@Form.create()
@inject('user')
@observer
export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: true,
    };
  }
  componentDidMount() {
    localStorage.getItem('user_cloud') ? setTimeout(() => {
      localStorage.removeItem('user_cloud')
      window.location.reload()
    }, 0) : null
  };
  handleSubmit = (e: KeyboardEvent) => {
    localStorage.setItem('user_cloud', JSON.stringify({"id":1,"name":"daycool","nickname":"天凉","phone":"13812345678","email":"1","avatar":"1","status":1,"updated_at":"1554808069003","created_at":"1554808069003","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxfSwiaWF0IjoxNTY0NTQyOTkxfQ.nBMT0TEMUhtQbturGaSv6BpeeysDKlm1JSC5cn-Ic8w"}));
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.user.login({
          data: {
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              this.props.history.push('/menu/home');
            }
          },
        });
      }
    });
  };
  handleChange = () => {
    this.setState({
      status: false,
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem label="手机号">
          {getFieldDecorator('phone', {
            initialValue: '',
            rules: [{
              required: true,
              message: '手机号格式不正确',
              pattern: /^1[34578]\d{9}$/, }],
          })(
            <Input
              size="large"
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="请输入手机号"
              readOnly={this.state.status}
              onFocus={this.handleChange}
            />
          )}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('pass', {
            initialValue: '',
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input.Password
              size="large"
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="请输入密码"
              readOnly={this.state.status}
              onFocus={this.handleChange}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}
