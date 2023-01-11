import React, { lazy, useState, useEffect } from "react";
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from "react-router-dom";
import { message } from "antd";

const App = lazy(() => {
    return import("../page/App");
});
const User = lazy(() => {
    return import("../page/User");
});
const Welcome = lazy(() => {
    return import("../component/user/Welcome");
});
const Admin = lazy(() => {
    return import("../page/Admin");
});

// 全局Context
export const RouterContext = React.createContext(undefined);
// Router组件
export default function Router() {
    // react-router-dom location
    const location = useLocation();
    // react-router-dom navigate
    const navigate = useNavigate();
    // antd messageAPI
    const [messageApi, contextHolder] = message.useMessage();
    // 全局消息提醒
    const messageShow = (text, type) => {
        switch (type) {
            case "info":
                messageApi.info(text);
                break;
            case "warning":
                messageApi.warning(text);
                break;
            case "error":
                messageApi.error(text);
                break;
            default:
                messageApi.info(text);
                break;
        }
    };
    // 已登录用户信息
    const [userIsLogin, setUserIsLogin] = useState(undefined);

    // 监听路由
    useEffect(() => {
        // 当前路由地址
        const path = location.pathname;
        // 当前登录用户
        const user = userIsLogin;
        // token检测
        // const token = undefined;
        // if (!token) {
        //     messageShow("您暂未登录", "error");
        //     navigate("/welcome");
        // }
    }, [location.pathname, userIsLogin]);

    return (
        <RouterContext.Provider
            value={{ messageShow, userIsLogin, setUserIsLogin }}
        >
            {/* 全局提示作用域 */}
            {contextHolder}
            {/* 路由配置 */}
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="welcome" />} />
                    {/* 注册页面 */}
                    <Route path="welcome" element={<Welcome />} />
                    {/* 用户页 */}
                    <Route path="user" element={<User />} />
                    {/* 管理页面 */}
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </RouterContext.Provider>
    );
}
