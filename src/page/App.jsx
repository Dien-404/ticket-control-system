import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <div className="fixed z-20 flex items-center w-full h-16 px-10 bg-white shadow-md font-bold text-2xl select-none">
                车票管理系统
            </div>
            {/* Content */}
            <div className="mt-16 grow">
                <Outlet />
            </div>
        </div>
    );
}
