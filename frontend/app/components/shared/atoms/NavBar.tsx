"use client"

import { LogoWordComponent } from '@/app/components/shared/atoms';
import { AreaChartOutlined, DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Flex, Layout, message, theme } from 'antd';
import { useState } from "react";

const { Header } = Layout;

export default function NavBar() {
    const [current, setCurrent] = useState('dashboard');

    const {
        token: { colorBgContainer, colorPrimary },
    } = theme.useToken();

    const onClick: MenuProps['onClick'] = ({ key }) => {
        const isLogout = key === "logout"
        setCurrent(key)

        if (isLogout) {
            message.error(`Click on item ${key}`);
        } else {
            message.info(`Click on item ${key}`);
        }
    };

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

    return (
        <Header
            className="flex items-center justify-between"
            style={{ backgroundColor: colorBgContainer }}
        >
            <LogoWordComponent />
            <Dropdown menu={{ items: profileDropdownItems, onClick }}>
                <Flex className="gap-2">
                    <Avatar style={{ verticalAlign: 'middle', backgroundColor: colorPrimary, color: "white" }
                    } size="large">
                        A
                    </Avatar>
                    < DownOutlined />
                </Flex>
            </Dropdown>
        </Header>

    )
}