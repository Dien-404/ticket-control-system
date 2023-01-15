import React, { useState, useContext } from "react";
import { Modal, Input, Form, InputNumber } from "antd";
import { RouterContext } from "../../router/index";

export default function EditTrainDialog(props) {
    const { messageShow } = useContext(RouterContext);
    // 解构
    const {
        trainId,
        oriPosition,
        destPosition,
        oriTime,
        destTime,
        trainNumber,
        maxPeople,
        ticketLeft,
    } = props.trainObjectEdit;
    const [oriP, setOriP] = useState(oriPosition);
    const [destP, setDestP] = useState(destPosition);
    const [oriT, setOriT] = useState(oriTime);
    const [destT, setDestT] = useState(destTime);
    const [trainN, setTrainN] = useState(trainNumber);
    const [maxPeo, setMaxPeo] = useState(maxPeople);
    // 处理对话框关闭
    const closeDialog = () => {
        props.close(false);
    };
    // 处理表单提交
    const handleFormSubmit = () => {
        let newTrain = {
            oriP,
            destP,
            oriT,
            destT,
            maxPeo,
        };
        messageShow("修改车次成功");
        closeDialog();
    };
    return (
        <Modal
            title={`您正在修改列车id ${trainId}`}
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
                        value={oriP}
                        onChange={(e) => {
                            setOriP(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item label="到达站">
                    <Input
                        value={destP}
                        onChange={(e) => {
                            setDestP(e.target.value);
                        }}
                    />
                </Form.Item>
                <div className="flex flex-row">
                    <Form.Item label="发车时间">
                        <Input
                            value={oriT}
                            onChange={(e) => {
                                setOriT(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="到达时间" style={{ marginLeft: "10px" }}>
                        <Input
                            value={destT}
                            onChange={(e) => {
                                setDestT(e.target.value);
                            }}
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-row">
                    <Form.Item label="车次号">
                        <Input
                            value={trainN}
                            onChange={(e) => {
                                setTrainN(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="载客容量" style={{ marginLeft: "10px" }}>
                        <InputNumber
                            value={maxPeo}
                            min={1}
                            max={500}
                            onChange={(value) => {
                                setMaxPeo(value);
                            }}
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
}
