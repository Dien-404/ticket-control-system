import React, { useState } from "react";
import Menu from "../component/user/Menu";
import TicketBuy from "../component/user/TicketBuy";
import MyTicket from "../component/user/MyTicket";
export default function User() {
    // 菜单项
    const menuItem = ["购买车票", "我的车票"];
    // 当前菜单项
    const [currentMenuItem, setCurrentMenuItem] = useState(0);
    return (
        <div className="h-full flex flex-row">
            {/* Menu */}
            <div className="h-full w-32 shrink-0 py-5 flex flex-col justify-between border-r border-gray-100 shadow-md">
                <Menu
                    menuItem={menuItem}
                    currentMenuItem={currentMenuItem}
                    setCurrentMenuItem={setCurrentMenuItem}
                />
            </div>
            {/* Content 渲染 */}
            <div className="grow p-5">
                {currentMenuItem === 0 ? <TicketBuy /> : <MyTicket />}
            </div>
        </div>
    );
}
