import React, { useContext, useState } from 'react';
import { HomeOutlined, OrderedListOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const { Header } = Layout;

const CustomHeader = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const [current, setCurrent] = useState('home');


    const logout = () => {
        localStorage.clear("access_token");
        setAuth({
            isAuthenticated: false,
            user: {
                email: "",
                name: "",
                address: "",
                role: ""
            }
        });
        navigate("/");
    };

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const menuItems = [
        {
            label: <NavLink to={"/"}>Trang Chủ</NavLink>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(auth.isAuthenticated ? [{
            label: <NavLink to={"/order"}>Lịch sử mua hàng</NavLink>,
            key: 'order',
            // icon: <UsergroupAddOutlined />,
            icon: <OrderedListOutlined />,
        }] : []),
        {
            label: `Welcome ${auth.user.email || ""}`,
            key: 'user',
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated ? [{
                    label: <Button type="text" onClick={logout}>Đăng xuất</Button>,
                    key: 'logout',
                }] : [{
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login',
                }])
            ]
        }
    ];

    return (
        <>
            <Header
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 1000,
                    backgroundColor: '#f0f5ff',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    padding: '0 20px'
                }}
            >
                <div className="logo" style={{ fontWeight: 'bold', fontSize: 18, marginRight: '2rem' }}>
                    <Link to="/" style={{ color: '#1890ff' }}>MyShop</Link>
                </div>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={menuItems}
                    style={{ flex: 1, minWidth: 0, backgroundColor: 'transparent' }}
                />
            </Header>

            {/* Thêm khoảng trắng bên dưới header để tránh đè nội dung */}
            <div style={{ height: 64 }}></div>
        </>
    );
};

export default CustomHeader;
