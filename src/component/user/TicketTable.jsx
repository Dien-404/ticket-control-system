import React, { useState } from "react";
import { Table, Button } from "antd";

export default function TicketTable(props) {
    // const [tableType, setTableType] = useState("search");
    // table 展示 columns
    const columns = [
        { title: "起点", dataIndex: "origin", key: "origin" },
        { title: "目的地", dataIndex: "destination", key: "destination" },
        { title: "车次号", dataIndex: "trainNumber", key: "trainNumber" },
        { title: "剩余车票", dataIndex: "ticketNumber", key: "ticketNumber" },
        {
            title: "操作",
            dataIndex: "trainNumber",
            key: "trainNumber",
            render: (record) => (
                <>
                    <Button type="default">购买{record}</Button>
                </>
            ),
        },
    ];
    // 当前表格页码
    const [currentPage, setCurrentPage] = useState(1);
    // 表格展示最大数
    const [tablePageSize, setTablePageSize] = useState(10);
    // 处理页码变化
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setTablePageSize(pageSize);
    };
    return (
        <Table
            dataSource={props.dataSource}
            columns={columns}
            pagination={{
                current: currentPage,
                tablePageSize: tablePageSize,
                onChange: handlePageChange,
                total: props.total,
                hideOnSinglePage: true,
            }}
        ></Table>
    );
}
