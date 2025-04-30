import React, { useContext, useEffect, useState } from 'react';
import { AppstoreOutlined, HomeOutlined, MailOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { ethers } from "ethers";
import axios from 'axios';
import { updateAccount } from '../../util/api';
import { use } from 'react';


const Header = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    console.log("auth", auth);

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
        })
        navigate("/");
    }

    const items = [
        {
            label: <NavLink to={"/"}>Home</NavLink>,
            key: 'home',
            icon: <HomeOutlined />,
        },

        ...(auth.isAuthenticated ? [{
            label: <NavLink to={"/order"}>Order</NavLink>,
            key: 'user',
            icon: <UsergroupAddOutlined />,
        }] : []),

        {
            label: `Welcome ${auth?.user?.email ?? ""}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                ...(auth.isAuthenticated ? [{
                    label: <button onClick={logout}>Đăng xuất</button>,
                    key: 'logout',
                }] : [{
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login'
                }]),
            ],


        },


    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;