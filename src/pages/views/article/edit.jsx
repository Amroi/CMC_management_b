import React, { Component } from 'react';
import { Card, Form, Button, Input, Row, Col } from 'antd';
import memoryUtils from '../../utils/memoryUtils';

const { Item } = Form;

class ArticleEdit extends Component {
    handleSubmit = values => {
        console.log('values', values);
    };

    componentWillUnmount() {
        memoryUtils.article = {};
    }

    render() {
        const formLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <Row>
                <Col span={12} offset={6}>
                    {/* offset可以将列向右偏移 */}
                    <Card
                        title="文章编辑"
                        extra={
                            <Button
                                type="link"
                                onClick={() => this.props.history.goBack()}
                            >
                                返回列表
                            </Button>
                        }
                    >
                        <Form
                            {...formLayout}
                            onFinish={this.handleSubmit}
                            initialValues={memoryUtils.article}
                        >
                            <Item
                                hasFeedback
                                name="id"
                                label="序号"
                                rules={[
                                    { required: true, message: '请输入序号' },
                                ]}
                            >
                                <Input placeholder="序号" allowClear />
                            </Item>
                            <Item
                                hasFeedback
                                name="title"
                                label="标题"
                                rules={[
                                    { required: true, message: '请输入标题' },
                                ]}
                            >
                                <Input placeholder="标题" allowClear />
                            </Item>
                            <Item
                                hasFeedback
                                name="visit_count"
                                label="阅读数"
                                rules={[
                                    { required: true, message: '请输入阅读数' },
                                ]}
                            >
                                <Input placeholder="阅读数" allowClear />
                            </Item>
                            <Item
                                hasFeedback
                                name="create_at"
                                label="发布日期"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入发布日期',
                                    },
                                ]}
                            >
                                <Input placeholder="发布日期" allowClear />
                            </Item>
                            <Item
                                hasFeedback
                                name="author"
                                label="作者"
                                rules={[
                                    { required: true, message: '请输入作者' },
                                ]}
                            >
                                <Input placeholder="作者" allowClear />
                            </Item>
                            <Button type="primary" htmlType="submit" block>
                                提交
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ArticleEdit;
