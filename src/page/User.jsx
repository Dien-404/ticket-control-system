import React from "react";
import Menu from "../component/user/Menu";
import TicketBuy from "../component/user/TicketBuy";
export default function User() {
    return (
        <div className="h-full flex flex-row">
            {/* Menu */}
            <div className="h-full w-32 shrink-0 py-5 flex flex-col justify-between border-r border-gray-100 shadow-md">
                <Menu />
            </div>
            {/* Content 渲染 */}
            <div className="grow p-5">
                <TicketBuy />
            </div>
        </div>
    );
}
