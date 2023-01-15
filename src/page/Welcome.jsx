import React, { useState } from "react";
import Login from "../component/welcome/Login";
import Regist from "../component/welcome/Regist";

export default function Welcome() {
    // 是否展示登录组件
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div
            className="h-full flex justify-end"
            style={{
                background:
                    "linear-gradient(107deg,#8bdeda,#43add0,#998ee0,#e17dc2,#ef9393)",
            }}
        >
            <div className="w-96 h-fit p-5 m-20 bg-white/80 backdrop-blur-2xl shadow rounded-md">
                {isLogin === true ? (
                    <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                ) : (
                    <Regist isLogin={isLogin} setIsLogin={setIsLogin} />
                )}
            </div>
        </div>
    );
}
