"use client"

import { AreaChartOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

export default function SideBar(props: any) {
    const { setCurrent } = props

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const profileDropdownItems: MenuProps['items'] = [
        {
            label: 'Dashboard',
            key: 'dashboard',
            icon: <AreaChartOutlined />
        },
        {
            label: 'View Profile',
            key: 'profile',
            icon: <UserOutlined />
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />

        }
    ]

    const onClick: MenuProps['onClick'] = ({ key }) => {
        const isLogout = key === "logout"
        setCurrent(key)
    };
    return (
        <Sider className="rounded-md px-4" width={300} style={{ background: colorBgContainer }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                style={{ borderRight: 0, marginTop: 20 }}
                items={profileDropdownItems}
                onClick={onClick}
            />
        </Sider>

    )
}