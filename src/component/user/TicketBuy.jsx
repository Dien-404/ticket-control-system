import React, { useState, useContext } from "react";
import { Form, Input, Button, Popconfirm, Table } from "antd";
import { RouterContext } from "../../router";

export default function TicketBuy() {
    // 全局消息提醒
    const { messageShow } = useContext(RouterContext);
    // 展示数据
    const [dataSource, setDataSource] = useState([
        {
            origin: "广州",
            originTime: "2023/1/11 8:00",
            destination: "武汉",
            destinationTime: "2023/1/11 10:30",
            trainNumber: "G61092",
            ticketNumber: "19",
        },
        {
            origin: "广州",
            originTime: "2023/1/12 9:00",
            destination: "东莞",
            destinationTime: "2023/1/12 9:30",
            trainNumber: "G61091",
            ticketNumber: "5",
        },
    ]);
    // 数据库数据最大数
    const [dataSourceTotal, setDataSourceTotal] = useState(undefined);
    // 当前表格页码
    const [currentPage, setCurrentPage] = useState(1);
    // 表格展示最大数
    const [tablePageSize, setTablePageSize] = useState(10);
    // 处理表单提交(搜索功能)
    const handleFormSubmit = (values) => {
        setDataSource([]);
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
    // 渲染表格项
    const columns = [
        {
            title: "起点",
            align: "center",
            render: (record) => (
                <div
                    className="flex flex-col items-center"
                    key={record.origin + record.originTime}
                >
                    <span>{record.origin}</span>
                    <span className="text-xs">{record.originTime}</span>
                </div>
            ),
        },
        {
            title: "目的地",
            align: "center",
            render: (record) => (
                <div
                    className="flex flex-col items-center"
                    key={record.destination + record.destinationTime}
                >
                    <span>{record.destination}</span>
                    <span className="text-xs">{record.destinationTime}</span>
                </div>
            ),
        },
        {
            title: "车次号",
            dataIndex: "trainNumber",
            key: "trainNumber",
            align: "center",
        },
        {
            title: "剩余车票",
            dataIndex: "ticketNumber",
            key: "ticketNumber",
            align: "center",
        },
        {
            title: "操作",
            align: "center",
            render: (record) => (
                <>
                    <Popconfirm
                        title={`确定购买 ${record.trainNumber} 车次车票嘛？`}
                        okText="确定"
                        cancelText="取消"
                        key={record.origin + record.trainNumber}
                        onConfirm={() => {
                            handleBuyTicket(record.trainNumber);
                        }}
                    >
                        <Button type="default">购买车票</Button>
                    </Popconfirm>
                </>
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
                    label="起点"
                    name="origin"
                    style={{ marginRight: "10px" }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="目的地"
                    name="destination"
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
