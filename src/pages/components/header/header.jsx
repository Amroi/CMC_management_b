import React, { Component } from 'react';
import { Menu, Layout, Row, Col, Avatar, Dropdown, Badge, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import storageUtils from '../../utils/storageUtils';

const { Header } = Layout;

class HeaderNav extends Component {
    logout = () => {
        this.props.history.replace('/login');
        storageUtils.removeUser();
    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Badge dot>
                        <Button
                            type="text"
                            onClick={() => this.props.history.push('/notify')}
                        >
                            通知中心
                        </Button>
                    </Badge>
                </Menu.Item>
                <Menu.Item>
                    <Button
                        type="text"
                        onClick={() => this.props.history.push('/setting')}
                    >
                        个人设置
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button type="text" onClick={this.logout}>
                        退出
                    </Button>
                </Menu.Item>
            </Menu>
        );

        return (
            <Header>
                <Row>
                    <Col span={8}>
                        <Menu theme="dark" mode="horizontal">
                            <Menu.Item
                                key="1"
                                style={{ fontSize: 20, color: '#fff' }}
                            >
                                CMC管理系统
                            </Menu.Item>
                        </Menu>
                    </Col>

                    <Col span={3} offset={13}>
                        <Dropdown overlay={menu}>
                            <Badge count={this.props.reduceCount}>
                                <Avatar
                                    style={{ marginBottom: 10 }}
                                    size="large"
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <a
                                    onClick={e => e.preventDefault()}
                                    style={{ color: '#fff', paddingLeft: 5 }}
                                >
                                    你好，大帅逼
                                </a>
                            </Badge>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default connect(
    state => ({ reduceCount: state }),
    {},
)(withRouter(HeaderNav));
