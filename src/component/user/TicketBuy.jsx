import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import TicketTable from "./TicketTable";

export default function TicketBuy() {
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
    // 处理表单提交
    const handleFormSubmit = (values) => {
        setDataSource([]);
        setDataSourceTotal();
        console.log(values);
    };
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
                <TicketTable dataSource={dataSource} total={dataSourceTotal} />
            </div>
        </div>
    );
}
