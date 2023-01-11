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
            destination: "武汉",
            trainNumber: "G61092",
            ticketNumber: "19",
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
            dataIndex: "origin",
            key: "origin",
            render: (record) => (
                <div className="flex flex-col items-center">
                    <span>{record}</span>
                    <span className="text-xs">发车时间</span>
                </div>
            ),
        },
        {
            title: "目的地",
            dataIndex: "destination",
            key: "destination",
            render: (record) => (
                <div className="flex flex-col items-center">
                    <span>{record}</span>
                    <span className="text-xs">抵达时间</span>
                </div>
            ),
        },
        { title: "车次号", dataIndex: "trainNumber", key: "trainNumber" },
        { title: "剩余车票", dataIndex: "ticketNumber", key: "ticketNumber" },
        {
            title: "操作",
            dataIndex: "trainNumber",
            key: "index",
            render: (record) => (
                <>
                    <Popconfirm
                        title={`确定购买 ${record} 车次车票嘛？`}
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => {
                            handleBuyTicket(record);
                        }}
                    >
                        <Button type="default">购买{record}</Button>
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
