import React, { useRef, useContext } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
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
                console.log(values);
                messageShow("添加车次成功", "info");
                closeDialog();
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
                    name="origin"
                    rules={[{ required: true, message: "始发站不能为空" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="到达站"
                    name="destination"
                    rules={[{ required: true, message: "到达站不能为空" }]}
                >
                    <Input />
                </Form.Item>
                <div className="flex flex-row">
                    <Form.Item
                        label="发车时间"
                        name="originTime"
                        rules={[
                            { required: true, message: "发车时间不能为空" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="到达时间"
                        name="destinationTime"
                        style={{ marginLeft: "10px" }}
                        rules={[
                            { required: true, message: "到达时间不能为空" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item
                    label="车次核载人数"
                    name="maxPeople"
                    rules={[
                        { required: true, message: "车次核载人数不能为空" },
                    ]}
                >
                    <InputNumber min={1} max={500} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
