import Article from './article/article';
import Dashboard from './dashboard/dashboard';
import Setting from './setting/setting';
import NotFound from './not-found/not-found';

import React, { Component } from 'react';
import { Layout } from 'antd';

import LeftNav from '../components/left-nav/left-nav';
import HeaderNav from '../components/header/header';
import { Switch, Route, Redirect } from 'umi';
import ArticleEdit from './article/edit';
import menuList from '../menuConfig/menuList';
import Notify from './Notify/notify';
import memoryUtils from '../utils/memoryUtils';

const { Footer, Content } = Layout;

export default class Admin extends Component {
    constructor(props) {
        super(props);

        /* 有这样的一个this.props.history.listen 只要地址栏的hash变化,会被触发
        参数：location代表当前的url地址信息 */
        this.props.history.listen(location => {
            const pathname = location.pathname;

            const matched = menuList.find(item => {
                return item.key === pathname;
            });

            if (matched) {
                window.document.title = matched.title;
            }
        });
    }

    render() {
        const user = memoryUtils.user;
        if (!user || !user.username) {
            return <Redirect to="/login" />;
        }

        return (
            <Layout style={{ minHeight: '100%' }}>
                <HeaderNav />

                <Layout>
                    <LeftNav />

                    <Content style={{ margin: 24, backgroundColor: '#fff', padding: 24 }}>
                        <Switch>
                            <Redirect from="/" to="/login" exact />
                            <Route path="/article" component={Article} exact />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/setting" component={Setting} />
                            <Route path="/article/edit/:id" component={ArticleEdit} />
                            {/* 路由的动态传参 */}
                            <Route path="/notify" component={Notify} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>

                <Footer style={{ textAlign: 'center', color: '#cccccc' }}>
                    推荐使用谷歌浏览器，以获得更好的浏览体验
                </Footer>
            </Layout>
        );
    }
}
