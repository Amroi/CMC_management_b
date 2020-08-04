import React, { Component } from 'react';
import { Card, Button, List, Avatar, Badge } from 'antd';

import { readMsg } from '../../redux/actions';
import { connect } from 'react-redux';

class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        };
    }

    getData() {
        this.data = [
            {
                photo:
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2558693067,2868064481&fm=26&gp=0.jpg',
                title: '张小帅',
                desc: '山中何事？松花酿酒，春水煎茶。',
            },
            {
                photo:
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595692303440&di=44dcd7d053dbd6954f5b3e42a76b0375&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F18%2F20181018164757_okcuo.thumb.700_0.jpeg',
                title: '苏大帅',
                desc: '浮名浮利，虚苦劳神。叹隙中驹，石中火，梦中身。',
            },
            {
                photo:
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595692303441&di=f05b1f7421ad0fb5b5ea4e5229cee0b6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117230425_eofqv.thumb.700_0.jpg',
                title: '林很帅',
                desc: '秋日薄暮，用菊花煮竹叶青，人与海棠俱醉。',
            },
            {
                photo:
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1027245443,3552957153&fm=26&gp=0.jpg',
                title: '沈不帅',
                desc: '闲来静处，且将诗酒猖狂，唱一曲归来未晚，歌一调湖海茫茫。',
            },
        ];
    }
    handleReduce = () => {
        this.setState(state => ({
            count: state.count - 1,
        }));
        this.props.readMsg(4);
    };

    UNSAFE_componentWillMount() {
        this.getData();
    }

    render() {
        return (
            <Card
                title="通知中心"
                extra={
                    <Button
                        type="primary"
                        disabled={this.state.count === 1 ? false : true}
                        onClick={this.handleReduce}
                    >
                        全部标记为已读
                    </Button>
                }
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Badge count={this.state.count}>
                                        <Avatar src={item.photo} />
                                    </Badge>
                                }
                                title={<a onClick={e => e.preventDefault()}>{item.title}</a>}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default connect(null, { readMsg })(Notify);
