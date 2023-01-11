import React, { useRef } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

export default function AddTrainDialog(props) {
    // 表单元素Ref
    const formRef = useRef(null);
    // 关闭对话框
    const closeDialog = () => {
        props.close(false);
    };
    // 确定添加车次
    const handleFormSubmit = () => {
        formRef.current
            .validateFields()
            .then((values) => {
                console.log(values);
            })
            .catch((error) => {
                console.log(error);
            });
        closeDialog();
    };
    return (
        <Modal
            title="添加新车次"
            open={props.open}
            okText="添加"
            cancelText="取消"
            onCancel={closeDialog}
            onOk={handleFormSubmit}
        >
            <Form ref={formRef}>
                <Form.Item label="始发站" name="origin">
                    <Input />
                </Form.Item>
                <Form.Item label="到达站" name="destination">
                    <Input />
                </Form.Item>
                <div className="flex flex-row">
                    <Form.Item label="发车时间" name="originTime">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="到达时间"
                        name="destinationTime"
                        style={{ marginLeft: "10px" }}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item label="车次核载" name="maxPeople">
                    <InputNumber min={1} max={500} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
