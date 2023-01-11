import React, { useState, useContext } from "react";
import { Table, Popconfirm, Button } from "antd";
import { RouterContext } from "../../router";

export default function MyTicket() {
    // 全局消息提醒
    const { messageShow } = useContext(RouterContext);
    // 数据源
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
    // 处理页码变化(表格页码)
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setTablePageSize(pageSize);
    };
    const handleDeleteTicket = (trainNumber) => {
        messageShow("退票成功" + trainNumber, "info");
    };
    // 渲染列项
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
            title: "操作",
            align: "center",
            render: (record) => (
                <>
                    <Popconfirm
                        title={`确定退订 ${record.trainNumber} 车次车票嘛？`}
                        okText="确定"
                        cancelText="取消"
                        key={record.origin + record.trainNumber}
                        onConfirm={() => {
                            handleDeleteTicket(record.trainNumber);
                        }}
                    >
                        <Button type="default">退订车票</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
    return (
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
    );
}
