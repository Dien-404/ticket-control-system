import React, { useState, useContext } from "react";
import { Modal, Input, Form, InputNumber } from "antd";
import { RouterContext } from "../../router/index";

export default function EditTrainDialog(props) {
    const { messageShow } = useContext(RouterContext);

    // 解构
    const { origin, destination, originTime, destinationTime, maxPeople } =
        props.trainObjectEdit;
    const [originEdit, setOriginEdit] = useState(origin);
    const [destinationEdit, setDestinationEdit] = useState(destination);
    const [originTimeEdit, setOriginTimeEdit] = useState(originTime);
    const [destinationTimeEdit, setDestinationTimeEdit] =
        useState(destinationTime);
    const [maxPeopleEdit, setMaxPeopleEdit] = useState(maxPeople);
    // 处理对话框关闭
    const closeDialog = () => {
        props.close(false);
    };
    // 处理表单提交
    const handleFormSubmit = () => {
        let newTrain = {
            originEdit,
            destinationEdit,
            originTimeEdit,
            destinationTimeEdit,
            maxPeopleEdit,
        };
        messageShow("修改车次成功");
        closeDialog();
        console.log(newTrain);
    };
    return (
        <Modal
            title="编辑车次"
            okText="确认修改"
            cancelText="取消"
            open={props.open}
            onOk={handleFormSubmit}
            onCancel={closeDialog}
            destroyOnClose
        >
            <Form title="修改车次信息">
                <Form.Item label="始发站">
                    <Input
                        value={originEdit}
                        onChange={(e) => {
                            setOriginEdit(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item label="到达站">
                    <Input
                        value={destinationEdit}
                        onChange={(e) => {
                            setDestinationEdit(e.target.value);
                        }}
                    />
                </Form.Item>
                <div className="flex flex-row">
                    <Form.Item label="发车时间">
                        <Input
                            value={originTimeEdit}
                            onChange={(e) => {
                                setOriginTimeEdit(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="到达时间" style={{ marginLeft: "10px" }}>
                        <Input
                            value={destinationTimeEdit}
                            onChange={(e) => {
                                setDestinationTimeEdit(e.target.value);
                            }}
                        />
                    </Form.Item>
                </div>
                <Form.Item label="车次荷载人数">
                    <InputNumber
                        value={maxPeopleEdit}
                        min={1}
                        max={500}
                        onChange={(value) => {
                            setMaxPeopleEdit(value);
                        }}
                        style={{ marginBottom: "20px" }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
