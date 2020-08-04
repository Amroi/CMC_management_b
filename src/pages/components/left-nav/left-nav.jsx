import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import './style.less';
import menuList from '../../menuConfig/menuList';
import { Link, withRouter } from 'umi';

const { Sider } = Layout;

@withRouter
class LeftNav extends Component {
  render() {
    const path = this.props.location.pathname;

    return (
      <Sider>
        <div className="left-nav">
          <Menu theme="light" mode="inline" selectedKeys={[path]}>
            {menuList.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  {<item.icon />}
                  {item.title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>
    );
  }
}

export default LeftNav;
