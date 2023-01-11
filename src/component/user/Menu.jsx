import React, { useState } from "react";

export default function Menu(props) {
    // 处理退出登录
    const handleLogout = () => {
        console.log("退出登录");
    };
    return (
        <>
            {/* 菜单渲染 */}
            <div>
                {props.menuItem.map((item, index) => (
                    <div
                        key={item + index}
                        className={`p-2 pl-3 select-none cursor-pointer duration-300 border-green-400 hover:border-r-4 ${
                            index === props.currentMenuItem
                                ? "bg-green-400 text-white"
                                : ""
                        }`}
                        onClick={() => {
                            props.setCurrentMenuItem(index);
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {/* 退出登录 */}
            <div
                className="p-2 pl-3 select-none cursor-pointer hover:text-rose-500 duration-300"
                onClick={() => {
                    handleLogout();
                }}
            >
                退出登录
            </div>
        </>
    );
}
