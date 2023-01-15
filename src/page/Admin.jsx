import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Form, Input, Button, Popconfirm } from "antd";
import { REQUEST, GETTRAINLIST, DELETETRAINBYID } from "../util/request";
import { RouterContext } from "../router/index";
import AddTrainDialog from "../component/admin/AddTrainDialog";
import EditTrainDialog from "../component/admin/EditTrainDialog";

export default function Admin() {
    const navigate = useNavigate();
    const { messageShow, setUserIsLogin } = useContext(RouterContext);
    // 数据源
    const [dataSource, setDataSource] = useState(undefined);
    // 数据库数据最大数
    const [dataSourceTotal, setDataSourceTotal] = useState(undefined);
    // 添加车次对话框
    const [isAddTrain, setIsAddTrain] = useState(false);
    // 是否在编辑车次
    const [isTrainEdit, setIsTrainEdit] = useState(false);
    // 车次编辑信息
    const [trainObjectEdit, setTrainObjectEdit] = useState({});
    // 当前表格页码
    const [currentPage, setCurrentPage] = useState(1);
    // 表格展示最大数
    const [tablePageSize, setTablePageSize] = useState(10);

    // 处理查询车次
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    // 处理车次添加
    const handleTrainAdd = () => {
        setIsAddTrain(true);
    };
    // 处理车次删除
    const handleTrainDelete = (trainId) => {
        REQUEST.delete(DELETETRAINBYID + `/${trainId}`)
            .then((res) => {
                if (res.status === 200) {
                    messageShow("删除该车次成功");
                    loadTrainData();
                }
            })
            .catch((err) => {
                messageShow("删除车次失败", "error");
            });
    };
    // 处理车次编辑
    const handleTrainEdit = (trainDeatil) => {
        setIsTrainEdit(true);
        setTrainObjectEdit(trainDeatil);
    };
    // 处理页码变化(表格页码)
    const handlePageChange = (page, pageSize) => {
        setTablePageSize(pageSize);
        setCurrentPage(page);
    };
    // 处理退出登录
    const handleLogout = () => {
        // 清除token
        localStorage.removeItem("token");
        // 清除全局信息
        setUserIsLogin(undefined);
        // 跳转
        navigate("/");
        // 提示
        messageShow("注销成功");
    };
    // 查询相关列车
    const loadTrainData = () => {
        REQUEST.get(
            GETTRAINLIST + `?page=${currentPage}&pageSize=${tablePageSize}`
        )
            .then((res) => {
                if (res.status === 200) {
                    const [data, total] = res.data;
                    setDataSource(data);
                    setDataSourceTotal(total);
                }
            })
            .catch((err) => {
                messageShow("请求错误", "error");
                console.log(err);
            });
    };
    useEffect(() => {
        loadTrainData();
    }, [currentPage]);

    const columns = [
        { title: "始发站", dataIndex: "oriPosition", align: "center" },
        { title: "到达站", dataIndex: "destPosition", align: "center" },
        { title: "车次号", dataIndex: "trainNumber", align: "center" },
        {
            title: "发车时间",
            dataIndex: "oriTime",
            align: "center",
            render: (record) => <>{new Date(record).toLocaleString()}</>,
        },
        {
            title: "到达时间",
            dataIndex: "destTime",
            align: "center",
            render: (record) => <>{new Date(record).toLocaleString()}</>,
        },
        { title: "载客容量", dataIndex: "maxPeople", align: "center" },
        { title: "剩余车票", dataIndex: "ticketLeft", align: "center" },
        {
            title: "操作",
            align: "center",
            render: (record) => (
                <>
                    <Popconfirm
                        title={`确定删除 ${record.trainNumber} 车次嘛？`}
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => {
                            handleTrainDelete(record.trainId);
                        }}
                    >
                        <Button type="default">删除</Button>
                    </Popconfirm>
                    <Button
                        type="default"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                            handleTrainEdit(record);
                        }}
                    >
                        编辑
                    </Button>
                </>
            ),
        },
    ];
    return (
        <div className="p-5 flex flex-col">
            {/* 添加车次窗口 */}
            <AddTrainDialog open={isAddTrain} close={setIsAddTrain} />
            {isTrainEdit === true ? (
                <EditTrainDialog
                    open={isTrainEdit}
                    close={setIsTrainEdit}
                    trainObjectEdit={trainObjectEdit}
                />
            ) : null}
            {/* 表单 */}
            <div className="flex flex-row justify-between">
                <Form
                    onFinish={handleFormSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    <Form.Item
                        label="始发站"
                        name="origin"
                        style={{ marginRight: "10px" }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="到达站"
                        name="destination"
                        style={{ marginRight: "10px" }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="车次号"
                        name="trainNumber"
                        style={{ marginRight: "10px" }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="submit">
                            查询
                        </Button>
                        <Button
                            type="default"
                            style={{ marginLeft: "10px" }}
                            onClick={handleTrainAdd}
                        >
                            添加车次
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="default" onClick={handleLogout}>
                    退出登录
                </Button>
            </div>

            <div className="">
                <Table
                    dataSource={dataSource}
                    rowKey="trainId"
                    columns={columns}
                    pagination={{
                        current: currentPage,
                        tablePageSize: tablePageSize,
                        total: dataSourceTotal,
                        onChange: handlePageChange,
                        hideOnSinglePage: true,
                    }}
                />
            </div>
        </div>
    );
}
