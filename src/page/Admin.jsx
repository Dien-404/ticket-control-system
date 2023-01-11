import React, { useState } from "react";
import { Table, Form, Input, Button } from "antd";
import AddTrainDialog from "../component/admin/AddTrainDialog";

export default function Admin() {
    // 数据源
    const [dataSource, setDataSource] = useState([]);
    // 添加车次对话框
    const [isAddTrain, setIsAddTrain] = useState(false);
    // 处理查询车次
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    // 处理车次添加
    const handleTrainAdd = () => {
        setIsAddTrain(true);
    };
    return (
        <div className="p-5 flex flex-col">
            {/* 添加车次窗口 */}
            <AddTrainDialog open={isAddTrain} close={setIsAddTrain} />
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
                <Table dataSource={dataSource} />
            </div>
        </div>
    );
}
