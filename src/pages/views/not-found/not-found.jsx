import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import './style.less';

export default class NotFound extends Component {
  toHome = () => {
    this.props.history.replace('/dashboard');
  };

  render() {
    return (
      <Row className="not-found">
        <Col span={12} className="left"></Col>
        <Col span={12} className="right">
          <h1>抱歉，</h1>
          <h2>你访问的页面不存在</h2>
          <div>
            <Button type="primary" onClick={this.toHome}>
              回到首页
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}
