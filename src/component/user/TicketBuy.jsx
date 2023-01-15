import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Popconfirm, Table } from "antd";
import { REQUEST, GETTRAINLIST } from "../../util/request";
import { RouterContext } from "../../router";

export default function TicketBuy() {
    // 全局消息提醒
    const { messageShow } = useContext(RouterContext);
    // 展示数据
    const [dataSource, setDataSource] = useState([
        {
            trainId: 1,
            oriPosition: "广州",
            oriTime: "2023/1/11 8:00",
            destPosition: "武汉",
            trainFrequency: "2023/1/11 10:30",
            trainNumber: "G61092",
            maxPeople: 300,
            ticketLeft: "19",
            passPositon: [],
        },
    ]);
    // 数据库数据最大数
    const [dataSourceTotal, setDataSourceTotal] = useState(undefined);
    // 当前表格页码
    const [currentPage, setCurrentPage] = useState(1);
    // 表格展示最大数
    const [tablePageSize, setTablePageSize] = useState(10);
    // 处理列车请求
    const loadTrainData = async () => {
        const res = await REQUEST.post(GETTRAINLIST, {
            page: currentPage,
            pageSize: tablePageSize,
        });
        console.log(res);
        // if (res.status === 200) {
        //     const [data, total] = res.data;
        //     setDataSource(data);
        //     setDataSourceTotal(total);
        // }
    };
    // 处理表单提交(搜索功能)
    const handleFormSubmit = (values) => {
        // setDataSource([]);
        setDataSourceTotal();
        console.log(values);
    };
    // 处理页码变化(表格页码)
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setTablePageSize(pageSize);
    };
    // 处理购买Button(购买车票)
    const handleBuyTicket = (trainNumber) => {
        messageShow("购买 " + trainNumber + " 车次车票成功", "info");
    };
    useEffect(() => {
        loadTrainData();
    }, []);

    // 渲染表格项
    const columns = [
        {
            title: "始发站",
            dataIndex: "oriPosition",

            align: "center",
        },
        {
            title: "到达站",
            dataIndex: "destPosition",

            align: "center",
        },
        {
            title: "车次号",
            dataIndex: "trainNumber",
            align: "center",
        },
        {
            title: "发车时间",
            dataIndex: "oriTime",
            align: "center",
        },
        {
            title: "剩余车票",
            dataIndex: "ticketLeft",
            align: "center",
        },
        {
            title: "操作",
            align: "center",
            render: (record) => (
                <Popconfirm
                    title={`确定购买 ${record.trainNumber} 车次车票嘛？`}
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => {
                        handleBuyTicket(record.trainNumber);
                    }}
                >
                    <Button type="default">购买车票</Button>
                </Popconfirm>
            ),
        },
    ];
    return (
        <div className="flex flex-col">
            <Form
                onFinish={handleFormSubmit}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                <Form.Item
                    label="始发站"
                    name="oriPosition"
                    style={{ marginRight: "10px" }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="到达站"
                    name="destPosition"
                    style={{ marginRight: "10px" }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="车次号"
                    name="trainNumber"
                    style={{ marginRight: "10px" }}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            </Form>
            <div className="">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="trainId"
                    pagination={{
                        current: currentPage,
                        tablePageSize: tablePageSize,
                        onChange: handlePageChange,
                        total: dataSourceTotal,
                        hideOnSinglePage: true,
                    }}
                ></Table>
            </div>
        </div>
    );
}
