import React, { useState, useEffect, useContext } from "react";
import { Table, Popconfirm, Button } from "antd";
import { REQUEST, GETTRAINLIST } from "../../util/request";
import { RouterContext } from "../../router";

export default function MyTicket() {
    // 全局消息提醒
    const { messageShow } = useContext(RouterContext);
    // 数据源
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
    // 处理页码变化(表格页码)
    const handlePageChange = (page, pageSize) => {
        setTablePageSize(pageSize);
        setCurrentPage(page);
    };
    // 处理退票
    const handleDeleteTicket = (trainNumber) => {
        messageShow("退票成功" + trainNumber, "info");
    };
    // 处理获取车票信息
    const loadTrainData = async () => {
        const res = await REQUEST.post(GETTRAINLIST, {
            page: currentPage,
            pageSize: tablePageSize,
        });
        // if(res.status===200){
        //     const [data,total]=res.data;
        //     setDataSource(data);
        //     setDataSourceTotal(total);
        // }
        console.log(res);
    };
    useEffect(() => {
        loadTrainData();
    }, []);

    // 渲染列项
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
            title: "操作",
            align: "center",
            render: (record) => (
                <Popconfirm
                    title={`确定退订 ${record.trainNumber} 车次车票嘛？`}
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() => {
                        handleDeleteTicket(record.trainNumber);
                    }}
                >
                    <Button type="default">退订车票</Button>
                </Popconfirm>
            ),
        },
    ];
    return (
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
    );
}
