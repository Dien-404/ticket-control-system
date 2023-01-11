import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { RouterContext } from "../../router/index";

export default function Regist(props) {
    const { messageShow } = useContext(RouterContext);
    // 处理登录切换
    const switchLogin = () => {
        props.setIsLogin(true);
    };
    // 处理表单提交
    const handleSubmit = (values) => {
        const { user, password, secondPWD } = values;
        // 检查输入的密码是否正确
        if (password !== secondPWD) {
            messageShow("两次输入的密码不相同", "error");
        } else {
            let newUser = {
                user,
                password,
            };
            console.log(newUser);
            // 发送请求注册用户
            // let flag = true;
            // if (flag) {
            //     messageShow("注册成功，正在为您跳转登录页面", "info");
            //     // 1500ms后跳转
            //     setTimeout(() => {
            //         switchLogin();
            //     }, 1500);
            // } else {
            //     messageShow("注册失败", "error");
            // }
        }
    };
    return (
        <div className="py-10">
            <div className="text-center mb-5 font-mono font-bold text-2xl select-none">
                注册
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
                    label="确认密码"
                    name="secondPWD"
                    rules={[
                        {
                            required: true,
                            message: "请再次输入8-16位的账号密码",
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
                        注册
                    </Button>
                </Form.Item>
                <div className="flex flex-row justify-end">
                    已有账号?去
                    <span
                        className="ml-2 px-1 cursor-pointer underline"
                        onClick={switchLogin}
                    >
                        登录
                    </span>
                </div>
            </Form>
        </div>
    );
}
