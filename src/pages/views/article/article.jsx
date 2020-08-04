import React, { Component } from 'react';
import { Card, Table, Button, Tag, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getTopics } from '../../api';
import ExportJsonExcel from 'js-export-excel';
import memoryUtils from '../../utils/memoryUtils';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            columns: [],
            total: 35, // 最好与每页条数成倍数关系,不然请求的总条数会有bug
            loading: false,
            page: 1, // 页码
            pageSize: 5, // 每页条数,和页码先定义好,而且接口参数也应该为这个,保持同步
        };
    }

    // 映射表头
    mapFieldToChinese = {
        id: '序号',
        title: '标题',
        visit_count: '阅读数',
        create_at: '发布日期',
        author: '作者',
    };

    // 初始化table
    getAticleTopics = (page, limit) => {
        this.setState({ loading: true });
        // 返回的是Promise对象
        getTopics(page, limit)
            .then(res => {
                console.log('返回的内容', res);

                // 表格数据处理(过滤)
                const resData = res.data;
                const rs = resData.reduce((pre, item) => {
                    const tmp = {
                        id: item.id,
                        title: item.title,
                        visit_count: item.visit_count,
                        create_at: item.create_at,
                        author: item.author.loginname,
                    };
                    pre.push(tmp);
                    return pre;
                }, []);
                console.log('rs', rs); // rs新建的对象,只取出数据中需要的属性和其对象

                // 表头处理
                const firstRes = rs[0];
                const columns = Object.keys(firstRes).map(item => {
                    if (item === 'visit_count') {
                        return {
                            title: this.mapFieldToChinese[item],
                            dataIndex: item,
                            render: (text, record) => (
                                <Tag color={text > 3000 ? 'red' : 'green'}>
                                    {record.visit_count}
                                </Tag>
                            ),
                        };
                    } else {
                        return {
                            title: this.mapFieldToChinese[item],
                            dataIndex: item,
                            align: 'center',
                        };
                    }
                });

                // 添加一栏,增加和删除
                columns.push({
                    title: '操作',
                    dataIndex: 'action',
                    align: 'center',
                    width: 120,
                    render: (_, record) => (
                        <div>
                            <Button
                                type="link"
                                size="small"
                                onClick={() => this.editHandler(record)}
                            >
                                修改
                            </Button>
                            <Button
                                type="link"
                                danger
                                size="small"
                                onClick={() => this.delHandler(record)}
                            >
                                删除
                            </Button>
                        </div>
                    ),
                });

                this.setState({ dataSource: rs, columns, loading: false });
            })
            .catch(err => {
                console.log('err', err);
            });
    };

    // 编辑
    editHandler = record => {
        memoryUtils.article = record; // 储存到内存模块
        this.props.history.push('/article/edit/' + record.id);
    };

    // 删除
    delHandler = record => {
        Modal.confirm({
            title: `确定要删除 <${record.title}> 吗？`,
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                console.log('删除了');
                // 此处应该是删除的接口请求，这里省略...
            },
        });
    };

    // 点击table下面的页码
    changeHandler = (page, pagesize) => {
        this.setState({ page, pagesize });

        this.getAticleTopics(page, pagesize);
    };

    /* 导出到Excel
    Excel中的配置必须从无到自己设置,试了直接等于状态中的dataSource,columns无法识别 */
    handleToXlsx = () => {
        const { dataSource } = this.state || {}; // 提供的数据
        const xlsx = {}; // 整个文件对象
        const dataTable = []; // 文件里的数据

        if (dataSource) {
            // 遍历每条数据
            for (let i in dataSource) {
                let obj = {
                    序号: dataSource[i].id, // '列名': 数据
                    标题: dataSource[i].title,
                    发布日期: dataSource[i].create_at,
                    作者: dataSource[i].author,
                };
                dataTable.push(obj); // 将需要(甄选后)的准备数据塞进文件数据
            }
        }

        xlsx.fileName = '大帅逼的文章列表'; //文件名
        xlsx.datas = [
            {
                sheetData: dataTable,
                sheetName: 'sheet',
                sheetFilter: ['序号', '作者', '标题', '发布日期'],
                sheetHeader: ['序号', '作者', '标题', '发布日期'],
            },
        ]; // 文件里的配置

        const toExcel = new ExportJsonExcel(xlsx);
        toExcel.saveExcel();
    };

    componentDidMount() {
        const { page, pageSize } = this.state;

        this.getAticleTopics(page, pageSize);
    }

    render() {
        const {
            dataSource,
            columns,
            total,
            loading,
            page,
            pageSize,
        } = this.state;
        return (
            <Card
                title="文章列表"
                extra={
                    <Button type="primary" onClick={this.handleToXlsx}>
                        导出到Excel
                    </Button>
                }
            >
                <Table
                    rowKey={record => record.id}
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    pagination={{
                        current: page,
                        total: total,
                        pageSize: pageSize,
                        onChange: this.changeHandler,
                    }}
                />
            </Card>
        );
    }
}
