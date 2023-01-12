import React, { useState } from "react";
import { Table, Form, Input, Button, Popconfirm } from "antd";
import AddTrainDialog from "../component/admin/AddTrainDialog";
import EditTrainDialog from "../component/admin/EditTrainDialog";

export default function Admin() {
    // 数据源
    const [dataSource, setDataSource] = useState([
        {
            origin: "广州",
            originTime: "2023/1/11 8:00",
            destination: "武汉",
            destinationTime: "2023/1/11 10:30",
            trainNumber: "G61092",
            maxPeople: "300",
        },
    ]);
    // 添加车次对话框
    const [isAddTrain, setIsAddTrain] = useState(false);
    // 车次编辑信息
    const [trainObjectEdit, setTrainObjectEdit] = useState({});
    // 是否在编辑车次
    const [isTrainEdit, setIsTrainEdit] = useState(false);
    // 处理查询车次
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    // 处理车次添加
    const handleTrainAdd = () => {
        setIsAddTrain(true);
    };
    // 处理车次删除
    const handleTrainDelete = (trainNumber) => {
        console.log(trainNumber);
    };
    // 处理车次编辑
    const handleTrainEdit = (trainDeatil) => {
        setIsTrainEdit(true);
        setTrainObjectEdit(trainDeatil);
    };
    const columns = [
        { title: "始发站", dataIndex: "origin", key: "origin" },
        { title: "发车时间", dataIndex: "originTime", key: "originTime" },
        { title: "到达站", dataIndex: "destination", key: "destination" },
        {
            title: "到达时间",
            dataIndex: "destinationTime",
            key: "destinationTime",
        },
        { title: "车次号", dataIndex: "trainNumber", key: "trainNumber" },
        { title: "核载人数", dataIndex: "maxPeople", key: "maxPeople" },
        {
            title: "操作",
            render: (record) => (
                <>
                    <Popconfirm
                        title={`确定删除 ${record.trainNumber} 车次嘛？`}
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => {
                            handleTrainDelete(record.trainNumber);
                        }}
                    >
                        <Button type="default">删除</Button>
                    </Popconfirm>
                    <Button
                        type="default"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                            handleTrainEdit(record);
                        }}
                    >
                        编辑
                    </Button>
                </>
            ),
        },
    ];
    return (
        <div className="p-5 flex flex-col">
            {/* 添加车次窗口 */}
            <AddTrainDialog open={isAddTrain} close={setIsAddTrain} />
            {isTrainEdit === true ? (
                <EditTrainDialog
                    open={isTrainEdit}
                    close={setIsTrainEdit}
                    trainObjectEdit={trainObjectEdit}
                />
            ) : null}
            {/* 表单 */}
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
                    <Button
                        type="default"
                        style={{ marginLeft: "10px" }}
                        onClick={handleTrainAdd}
                    >
                        添加车次
                    </Button>
                </Form.Item>
            </Form>
            <div className="">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        hideOnSinglePage: true,
                    }}
                />
            </div>
        </div>
    );
}
