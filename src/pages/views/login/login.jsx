import React, { Component } from 'react';
import { Card, Form, Button, Input, message } from 'antd';
import './login.less';
import { getLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

export default class Login extends Component {
  formRef = React.createRef();

  submitHander = values => {
    getLogin(values).then(res => {
      //  console.log('res', res); // {status: "0", data: {…}}

      const { username, password } = res.data;
      if (username === values.username && password === values.password) {
        message.success('登录成功');

        memoryUtils.user = values;
        storageUtils.saveUser(values);

        this.props.history.replace('/article');
      } else {
        message.error('用户名或密码错误');
      }
    });
  };

  render() {
    return (
      <div className="login">
        <Card
          className="login-card"
          title="用户登录"
          style={{ width: 400 }}
          extra={
            <Button
              type="link"
              onClick={() => this.formRef.current.resetFields()}
            >
              重置
            </Button>
          }
        >
          <Form ref={this.formRef} onFinish={this.submitHander}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
