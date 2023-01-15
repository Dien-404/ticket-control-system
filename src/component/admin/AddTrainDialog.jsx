import React, { useRef, useContext } from "react";
import { Modal, Form, Input, InputNumber, DatePicker } from "antd";
import { RouterContext } from "../../router/index";

export default function AddTrainDialog(props) {
    const { messageShow } = useContext(RouterContext);
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
                // 此处发送异步请求
                // 判断是否成功
                messageShow("添加车次成功", "info");
                closeDialog();
                console.log(values);
            })
            .catch((error) => {
                error.errorFields.map((item) => {
                    messageShow(item.errors[0], "error");
                });
            });
    };
    return (
        <Modal
            title="添加新车次"
            open={props.open}
            okText="添加"
            cancelText="取消"
            onCancel={closeDialog}
            onOk={handleFormSubmit}
            destroyOnClose
        >
            <Form ref={formRef}>
                <Form.Item
                    label="始发站"
                    name="oriPosition"
                    rules={[{ required: true, message: "始发站不能为空" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="到达站"
                    name="destPosition"
                    rules={[{ required: true, message: "到达站不能为空" }]}
                >
                    <Input />
                </Form.Item>
                <div className="flex flex-row">
                    <Form.Item
                        label="发车时间"
                        name="oriTime"
                        rules={[
                            { required: true, message: "发车时间不能为空" },
                        ]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item
                        label="到达时间"
                        name="destTime"
                        style={{ marginLeft: "10px" }}
                        rules={[
                            { required: true, message: "到达时间不能为空" },
                        ]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                </div>
                <div className="flex flex-row">
                    <Form.Item
                        label="车次号"
                        name="trainNumber"
                        rules={[{ required: true, message: "车次号不能为空" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="载客容量"
                        name="maxPeople"
                        style={{ marginLeft: "10px" }}
                        rules={[
                            { required: true, message: "载客容量不能为空" },
                        ]}
                    >
                        <InputNumber min={1} max={500} />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
}
