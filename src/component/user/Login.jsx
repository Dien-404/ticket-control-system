import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { RouterContext } from "../../router/index";

export default function Login(props) {
    const { messageShow, setUserIsLogin } = useContext(RouterContext);
    // 处理注册切换
    const switchRegist = () => {
        props.setIsLogin(false);
    };
    // 处理表单提交
    const handleSubmit = (values) => {
        let flag = true;
        if (flag) {
            messageShow("登录成功", "info");
            // 保存token
            // ...
            // 修改全局Context（setUserIsLogin）
            // setUserIsLogin(values);
            console.log(values);
        } else {
            messageShow("登录失败", "error");
        }
    };
    return (
        <div className="py-10">
            <div className="text-center mb-5 font-mono font-bold text-2xl select-none">
                登录
            </div>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="账号"
                    name="user"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入8-16位的账号密码",
                            pattern: /.{8,16}/,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button type="default" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
                <div className="flex flex-row justify-end">
                    没有账号?去
                    <span
                        className="ml-2 px-1 cursor-pointer underline"
                        onClick={switchRegist}
                    >
                        注册
                    </span>
                </div>
            </Form>
        </div>
    );
}
